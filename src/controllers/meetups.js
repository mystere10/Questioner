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
    const oneMeetup = db(queries.getOneMeetup, [meetupId]);
    if (!oneMeetup) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    oneMeetup.then((response) => {
      res.status(200).send(response[0]);
    }).catch((error) => {
      res.status(403).send({ message: 'An error has occured', error });
    });
  },

  getAllMeetup(req, res) {
    const meetup = db(queries.getMeetup);
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

// //   // deleteOneMeetup(req, res) {
// //   //   const meetup = MeetupModel.getOneMeetup(req.params.id);
// //   //   if (!meetup) {
// //   //     return res.status(404).json({
// //   //       message: 'No meetup found',
// //   //     });
// //   //   }
// //   //   const meet = MeetupModel.deleteMeetup(req.params.id);
// //   //   return res.status(200).json({
// //   //     message: 'Meetup deleted',
// //   //     meetup: meet,
// //   //   });
// //   // },

// //   // respondToMeetup(req, res) {
// //   //   const meetup = MeetupModel.getOneMeetup(req.params.id);
// //   //   if (!meetup) {
// //   //     return res.status(404).json({
// //   //       message: 'No meetup with the specified id',
// //   //     });
// //   //   }
// //   //   const response = MeetupModel.RSVP(req.params.id, req.body);
// //   //   return res.status(201).json({
// //   //     message: 'Response sent',
// //   //     response,
// //   //   });
// //   // },

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
