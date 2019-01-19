/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
import Joi from 'joi';
import queries from '../db/sqlQueries';
import db from '../db/connect';
import Meetup from '../model/Meetup';
import validation from '../helpers/validations';


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
          location, images, topic, happeningOn, tags,
        } = response[0];
        res.status(201).json({
          message: 'Meetup successully created',
          response: {
            location, images, topic, happeningOn, tags,
          },
        });
      }).catch((error) => {
        res.status(403).send({ message: 'Meetup not created', error });
      });
    }
  },

  getOneMeetup(req, res) {
    const meetupId = req.params.id;
    const status = 'ACTIVE';
    const oneMeetup = db(queries.getOneMeetup, [meetupId, status]);
    oneMeetup.then((response) => {
      if (response.length === 0 || response.length === 'undefined') {
        res.status(404).send({ message: 'No meetup with the specified id' });
      }
      oneMeetup.then((response) => {
        res.status(200).send(response[0]);
      }).catch((error) => {
        res.status(403).send({ message: 'An error has occured', error });
      });
    });
  },

  getAllMeetup(req, res) {
    const status = 'ACTIVE';
    const meetup = db(queries.getMeetup, [status]);
    if (meetup.length === 0) {
      return res.status(404).json({
        message: 'No meetup fund',
      });
    }
    meetup.then((response) => {
      res.status(200).send(response);
    }).catch((error) => {
      res.status(403).send({ message: 'An error occured' });
      console.log(error);
    });
  },

  deleteOneMeetup(req, res) {
    const meetupId = req.params.id;
    const status = 'NOT ACTIVE';
    const findMeetup = db(queries.getOneMeetup, [meetupId]);
    findMeetup.then((response) => {
      if (response.length === 0 || response.length === 'undefined') {
        res.status(404).send({ message: 'No meetup with the specified id' });
      }
      const deleteMeetup = db(queries.deletemeetup, [status, meetupId]);
      deleteMeetup.then((response) => {
        if (response) {
          res.status(200).send({ message: 'Meetup deleted' });
        } else {
          res.status(400).send({ message: 'Meetup not deleted' });
        }
      }).catch((error) => {
        res.status(403).send({ message: 'An error has occured' });
        console.log(error);
      });
    });
  },

  respondToMeetup(req, res) {
    const meetupId = req.params.id;
    const meetupStatus = 'ACTIVE';
    const {
      user, status,
    } = req.body;

    const rvspSchema = Joi.object().keys({
      user: Joi.number().integer()
        .required(),
      status: Joi.string().alphanum().min(2).max(5)
        .required(),
    });
    const { error, value} = Joi.validate({ user, status }, rvspSchema);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    }
    const findMeetup = db(queries.getOneMeetup, [meetupId, meetupStatus]);
    findMeetup.then((response) => {
      if (response.length === 0 || response === 'undefined') {
        res.status(404).send({ message: 'Meetup not found' });
      }
    });

    const findUser = db(queries.getOneUser, [user]);
    findUser.then((response) => {
      if (response.length === 0 || response === 'undefined') {
        res.status(404).send({ message: 'User not found' });
      } else {
        const rsvp = db(queries.rsvp, [meetupId, user, status]);
        rsvp.then((response) => {
          res.status(201).json({
            message: 'Question submitted',
          });
        }).catch((error) => {
          console.log(error);
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  },

  upcoming(req, res) {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dateString = date + '-' + (month + 1) + '-' + year;

    const upcomingMeetups = db(queries.upcoming, [dateString]);
    if (!upcomingMeetups.length || upcomingMeetups === []) {
      return res.status(404).json({
        message: 'No upcoming meetup found',
      });
    }
    upcomingMeetups.then((response) => {
      res.status(200).send(response);
    }).catch((error) => {
      res.status(403).send({ message: 'An error has occured' });
      console.log(error);
    });
  },
};

export default Meetups;
