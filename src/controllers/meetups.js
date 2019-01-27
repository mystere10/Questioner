/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import queries from '../db/sqlQueries';
import db from '../db/connect';
import Meetup from '../model/Meetup';
import Question from '../model/Questions';
import validation from '../helpers/validations';

// Creating a meetup controller
const Meetups = {
  createMeetup(req, res) {
    const {
      location, images, topic, happeningOn, tags,
    } = req.body;

    const { error } = Joi.validate({
      location, images, topic, happeningOn, tags,
    }, validation.meetupSchema);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const meetup = new Meetup(location, images, topic, happeningOn, tags);
      const query = db(queries.createMeetup, [meetup.location, meetup.images, meetup.topic, meetup.happeningOn, meetup.tags]);
      query.then((response) => {
        const {
          id, location, images, topic, happeningon, tags,
        } = response[0];
        res.status(201).json({
          status: '201',
          message: 'Meetup successully created',
          response: {
            id, location, images, topic, happeningon, tags,
          },
        });
      }).catch((error) => {
        res.status(500).send({ message: 'Meetup not created', error });
      });
    }
  },

  // Fetching from the database one meetup
  getOneMeetup(req, res) {
    const meetupId = req.params.id;
    const status = 'ACTIVE';
    const oneMeetup = db(queries.getOneMeetup, [meetupId, status]);
    oneMeetup.then((response) => {
      if (response.length === 0 || response.length === 'undefined') {
        res.status(404).send({ status: '404', message: 'No meetup found with the specified id' });
      } else {
        res.status(200).json({
          status: '200',
          message: 'Meetup created',
          meetup: response[0],
        });
      }
    }).catch((error) => {
      res.status(500).send({ message: 'An error has occured', error });
    });
  },

  // Fetching all meetups from the database
  getAllMeetup(req, res) {
    const status = 'ACTIVE';
    const meetup = db(queries.getMeetup, [status]);
    meetup.then((response) => {
      if (response.length === 0) {
        res.status(404).json({
          status: '404',
          message: 'No meetup found',
        });
      } else {
        res.status(200).json({
          status: '200',
          message: 'List of meetups',
          meetup: response,
        });
      }
    }).catch((error) => {
      res.status(500).send({ message: 'An error occured', error });
    });
  },

  // Deleting a meetup
  deleteOneMeetup(req, res) {
    const meetupId = req.params.id;
    const statusDel = 'NOT ACTIVE';
    const status = 'ACTIVE';
    const findMeetup = db(queries.getOneMeetup, [meetupId, status]);
    findMeetup.then((response) => {
      if (response.length === 0 || response.length === 'undefined') {
        res.status(404).send({ status: '404', message: 'No meetup with the specified id' });
      } else {
        const deleteMeetup = db(queries.deletemeetup, [statusDel, meetupId]);
        deleteMeetup.then((response) => {
          if (response) {
            res.status(200).send({ message: 'Meetup successfully deleted' });
          } else {
            res.status(400).send({ message: 'Meetup not deleted' });
          }
        }).catch((error) => {
          res.status(500).send({ message: 'An error has occured', error });
        });
      }
    }).catch((error) => {
      res.status(500).send({ message: 'An error has occured', error });
    });
  },

  // Respond to a meetup
  respondToMeetup(req, res) {
    const meetupId = req.params.id;
    const meetupStatus = 'ACTIVE';
    const userid = req.userId;
    const {
      status,
    } = req.body;

    const rvspSchema = Joi.object().keys({
      status: Joi.string().alphanum().min(2).max(5)
        .required(),
    });
    const { error } = Joi.validate({ status }, rvspSchema);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    }
    const findMeetup = db(queries.getOneMeetup, [meetupId, meetupStatus]);
    findMeetup.then((response) => {
      if (response.length === 0 || response === 'undefined') {
        res.status(404).send({ status: '404', message: 'Meetup not found with the specified id' });
      } else {
        const findUser = db(queries.getOneUser, [userid]);
        findUser.then((response) => {
          if (response.length === 0 || response === 'undefined') {
            res.status(404).send({ status: '404', message: 'User not found' });
          } else {
            const rsvp = db(queries.rsvp, [meetupId, userid, status]);
            rsvp.then((response) => {
              res.status(201).json({
                message: 'Question submitted',
                question: response[0],
              });
            }).catch((error) => {
              console.log(error);
            });
          }
        }).catch((error) => {
          res.status(500).send({ message: 'An error has occured', error });
        });
      }
    }).catch((error) => {
      res.status(500).send({ message: 'An error has occured', error });
    });
  },

  // Geting upcoming meetup
  upcoming(req, res) {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dateString2 = `${year}-${month + 1}-${date}`;

    const meetupStatus = 'ACTIVE';
    const upcomingMeetups = db(queries.upcoming, [dateString2, meetupStatus]);
    upcomingMeetups.then((response) => {
      if (response.length === 0) {
        res.status(404).send({ status: '404', message: 'Not found' });
      } else {
        res.status(200).json({
          status: '200',
          message: 'List of upcoming meetup',
          upcoming: response,
        });
      }
    }).catch((error) => {
      res.status(500).send({ message: 'An error has occured', error });
    });
  },

  askQuestion(req, res) {
    const meetup = req.params.id;
    const status = 'ACTIVE';
    const createdBy = req.userId;
    const {
      title, body,
    } = req.body;
    const { error } = Joi.validate({
      createdBy, title, body,
    }, validation.questionSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const findMeetup = db(queries.getOneMeetup, [meetup, status]);
      findMeetup.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ status: '404', message: 'No meetup with the specified id' });
        } else {
          const findUser = db(queries.getOneUser, [createdBy]);
          findUser.then((response) => {
            if (response.length === 0) {
              res.status(404).send({ status: '404', message: 'No user found with the specified id' });
            } else {
              const question = new Question(createdBy, meetup, title, body);
              const query = db(queries.createQuestion, [question.createdBy, question.meetup, question.title, question.body]);
              query.then((response) => {
                const {
                  createdBy, meetup, title, body,
                } = response[0];
                return res.status(201).json({
                  status: '201',
                  message: 'Question posted',
                  response: {
                    createdBy, meetup, title, body,
                  },
                });
              }).catch((error) => {
                res.status(500).send({ message: 'an error has occured', error });
              });
            }
          }).catch((error) => {
            res.status(500).send({ message: 'An error occured', error });
          });
        }
      }).catch((error) => {
        res.status(500).send({ error });
      });
    }
  },
};


export default Meetups;
