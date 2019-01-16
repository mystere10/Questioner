/* eslint-disable consistent-return */
import Joi from 'joi';
import MeetupModel from '../model/Meetup';
import validations from '../helpers/validations';

const Meetups = {
  createMeetup(req, res) {
    const {
      location, images, topic, happeningOn, tags,
    } = req.body;

    const { error } = Joi.validate({
      location, images, topic, happeningOn, tags,
    }, validations.meetupSchema);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const meetup = MeetupModel.createMeetup(req.body);
      return res.status(201).json({
        data: meetup,
      });
    }
  },

  getOneMeetup(req, res) {
    const oneMeetup = MeetupModel.getOneMeetup(req.params.id);
    if (!oneMeetup) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    return res.status(200).json({
      meetup: oneMeetup,
    });
  },

  getAllMeetup(req, res) {
    const meetup = MeetupModel.getAll();
    if (meetup.length === 0) {
      return res.status(404).json({
        message: 'No meetup fund',
      });
    }
    return res.status(200).json({
      message: 'Meetups successfully returned',
      meetups: meetup,
    });
  },

  deleteOneMeetup(req, res) {
    const meetup = MeetupModel.getOneMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        message: 'No meetup found',
      });
    }
    const meet = MeetupModel.deleteMeetup(req.params.id);
    return res.status(200).json({
      message: 'Meetup deleted',
      meetup: meet,
    });
  },

  respondToMeetup(req, res) {
    const meetup = MeetupModel.getOneMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        message: 'No meetup with the specified id',
      });
    }
    const response = MeetupModel.RSVP(req.params.id, req.body);
    res.status(201).json({
      message: 'Response sent',
      response,
    });
  },

  upcoming(req, res) {
    const upcoming = MeetupModel.upcomingMeetups();
    if (upcoming.length === 0 || upcoming === 'undefined') {
      return res.status(404).json({
        message: 'No upcoming meetup found',
      });
    }
    return res.status(200).json({
      message: 'list of upcomming meetups',
      meetups: upcoming,
    });
  },
};

export default Meetups;
