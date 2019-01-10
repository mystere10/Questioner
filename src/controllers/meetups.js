import uuid from 'uuid/v1';
import queries from '../db/sqlQueries';
import db from '../db/connect';
import Meetup from '../model/Meetup';
import validation from '../helpers/validations';
import Joi from 'joi';


const Meetups = {
  createMeetup(req, res) {
    const {
      location, images, topic, happeningOn, tags
    } = req.body;

    const {error, value} = Joi.validate({
      location, images, topic, happeningOn, tags
    },validation.meetupSchema);

    if(error){
      res.status(400).json({error: error.details[0].message});
    } else {
      const meetup = new Meetup(location, images, topic, happeningOn, tags);
      const query = db(queries.createMeetup, [meetup.location, meetup.images, meetup.topic, meetup.happeningOn, meetup.tags]);
      query.then((response) => {
        const {
          location, images, topic, happeningOn, tags
        } = response[0];
        res.status(201).json({
          message: 'Meetup successully created',
          response: {
            location, images, topic, happeningOn, tags
          },
        });
      }).catch((error) => {
        res.status(403).send({ message: 'Meetup not created' });
      });
    }
  }

// //   // getOneMeetup(req, res) {
// //   //   const oneMeetup = MeetupModel.getOneMeetup(req.params.id);
// //   //   if (!oneMeetup) {
// //   //     return res.status(404).json({
// //   //       message: 'Meetup not found',
// //   //     });
// //   //   }
// //   //   return res.status(200).json({
// //   //     meetup: oneMeetup,
// //   //   });
// //   // },

// //   // getAllMeetup(req, res) {
// //   //   const meetup = MeetupModel.getAll();
// //   //   if (meetup.length === 0) {
// //   //     return res.status(404).json({
// //   //       message: 'No meetup fund',
// //   //     });
// //   //   }
// //   //   return res.status(200).json({
// //   //     message: 'Meetups successfully returned',
// //   //     meetups: meetup,
// //   //   });
// //   // },

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

// //   // upcoming(req, res) {
// //   //   const upcoming = MeetupModel.upcomingMeetups();
// //   //   if (upcoming.length === 0 || upcoming === 'undefined') {
// //   //     return res.status(404).json({
// //   //       message: 'No upcoming meetup found',
// //   //     });
// //   //   }
// //   //   return res.status(200).json({
// //   //     message: 'list of upcomming meetups',
// //   //     meetups: upcoming,
// //   //   });
// //   // },
};


export default Meetups;
