<<<<<<< HEAD
import Joi from 'joi';
import MeetupModel from '../model/Meetup';
import validations from '../helpers/validations';
import questionModel from '../model/Questions';
import userModel from '../model/User';
=======
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
import Joi from 'joi';
import queries from '../db/sqlQueries';
import db from '../db/connect';
import Meetup from '../model/Meetup';
import validation from '../helpers/validations';
>>>>>>> challenge-3

const Meetups = {
  createMeetup(req, res) {
    const {
<<<<<<< HEAD
      location, topic, images, tags, happeningOn,
    } = req.body;

    const { error } = Joi.validate({
      location, topic, images, tags, happeningOn,
    }, validations.meetupSchema);

    if (new Date(happeningOn) < new Date()) {
      return res.status(400).json({
        status: '400',
        message: 'Please chose a valid date',
      });
    }
=======
      location, images, topic, happeningOn, tags,
    } = req.body;

    const { error } = Joi.validate({
      location, images, topic, happeningOn, tags,
    }, validation.meetupSchema);
>>>>>>> challenge-3

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
<<<<<<< HEAD
      const meetup = MeetupModel.createMeetup(req.body);
      return res.status(201).json({
        status: '201',
        message: 'Meetup successfully created',
        meetup,
=======
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
>>>>>>> challenge-3
      });
    }
  },

  getOneMeetup(req, res) {
<<<<<<< HEAD
    const oneMeetup = MeetupModel.getOneMeetup(req.params.id);
    if (!oneMeetup) {
      return res.status(404).json({
        status: '404',
        message: 'Meetup not found',
      });
    }
    return res.status(200).json({
      status: '200',
      message: 'One meetup found',
      meetup: oneMeetup,
=======
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
>>>>>>> challenge-3
    });
  },

  getAllMeetup(req, res) {
<<<<<<< HEAD
    const meetup = MeetupModel.getAll();
    if (meetup.length === 0) {
      return res.status(404).json({
        status: '404',
        message: 'No meetup fund',
      });
    }
    return res.status(200).json({
      status: '200',
      message: 'List of meetups',
      meetups: meetup,
=======
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
>>>>>>> challenge-3
    });
  },

  deleteOneMeetup(req, res) {
<<<<<<< HEAD
    const meetup = MeetupModel.getOneMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        status: '404',
        message: 'No meetup found',
      });
    }
    const meetupdel = MeetupModel.deleteMeetup(req.params.id);
    return res.status(200).json({
      status: '200',
      message: 'Meetup successfully deleted',
      meetup: meetupdel,

=======
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
>>>>>>> challenge-3
    });
  },

  respondToMeetup(req, res) {
<<<<<<< HEAD
    const meetup = MeetupModel.getOneMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        status: '404',
        message: 'No meetup with the specified id',
      });
    }
    const {
      status, user,
    } = req.body;

    const findUser = userModel.getOneUser(user);
    if (!findUser) {
      return res.status(404).json({
        status: '404',
        message: 'User not found',
      });
    }

    if (status !== 'yes' && status !== 'no' && status !== 'maybe') {
      return res.status(400).json({
        status: '400',
        message: 'Invalid input',
      });
    }

    const response = MeetupModel.RSVP(req.params.id, req.body);
    return res.status(201).json({
      status: '201',
      message: 'Response sent',
      response,
=======
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
>>>>>>> challenge-3
    });
  },

  upcoming(req, res) {
<<<<<<< HEAD
    const upcoming = MeetupModel.upcomingMeetups();
    if (upcoming.length === 0 || upcoming === 'undefined') {
      return res.status(404).json({
        status: '404',
        message: 'No upcoming meetup found',
      });
    }
    return res.status(200).json({
      status: '200',
      message: 'list of upcomming meetups',
      meetups: upcoming,
    });
  },

  askQuestion(req, res) {
    const meetup = MeetupModel.getOneMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        status: '404',
        message: 'Meetup not found with the specified id',
      });
    }
    const {
      createdBy, title, body,
    } = req.body;

    const { error } = Joi.validate({
      createdBy, title, body,
    }, validations.questionSchema);

    const findUser = userModel.getOneUser(createdBy);
    if (!findUser) {
      return res.status(404).json({
        status: '404',
        message: 'No user with the specified id',
      });
    }

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const question = questionModel.createQ(req.params.id, req.body);
      return res.status(201).json({
        status: '201',
        message: 'Thank you for posting your question',
        question,
      });
    }
  },
};

=======
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


>>>>>>> challenge-3
export default Meetups;
