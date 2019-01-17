import Joi from 'joi';
import MeetupModel from '../model/Meetup';
import validations from '../helpers/validations';
import questionModel from '../model/Questions';
import userModel from '../model/User';

const Meetups = {
  createMeetup(req, res) {
    const {
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

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const meetup = MeetupModel.createMeetup(req.body);
      return res.status(201).json({
        status: '201',
        message: 'Meetup successfully created',
        meetup,
      });
    }
  },

  getOneMeetup(req, res) {
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
    });
  },

  getAllMeetup(req, res) {
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
    });
  },

  deleteOneMeetup(req, res) {
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

    });
  },

  respondToMeetup(req, res) {
    const meetup = MeetupModel.getOneMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        status: '404',
        message: 'No meetup with the specified id',
      });
    }
    const {
      status,
    } = req.body;

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
    });
  },

  upcoming(req, res) {
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
      const question = questionModel.createQ(req.body);
      return res.status(201).json({
        status: '201',
        message: 'Thank you for posting your question',
        question,
      });
    }
  },
};

export default Meetups;
