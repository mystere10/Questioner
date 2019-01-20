/* eslint-disable max-len */
/* eslint-disable no-shadow */
import Joi from 'joi';
import Question from '../model/Questions';
import validate from '../helpers/validations';
import db from '../db/connect';
import queries from '../db/sqlQueries';

// Creating a question cotroller
const Questions = {
  // Uvoting controller
  upvote(req, res) {
    const questionId = req.params.id;
    const question = db(queries.getOneQuestion, [questionId]);
    question.then((response) => {
      if (response.length === 0) {
        res.status(404).send({ message: 'No question found with the specified id' });
      } else {
        res.status(200).send(response[0]);
        const upvote = db(queries.upvote, [questionId]);
        upvote.then(response => res.status(201).json({
          status: '201',
          message: 'Upvoted',
          question: response,
        })).catch((error) => {
          res.status(500).send({ message: 'an error has occured', error });
        });
      }
    });
  },

  // Downvoting controller
  downvote(req, res) {
    const questionId = req.params.id;
    const question = db(queries.getOneQuestion, [questionId]);
    question.then((response) => {
      if (response.length === 0) {
        res.status(404).send({ message: 'No question found with the specified id' });
      } else {
        res.status(200).send(response[0]);
        const downvote = db(queries.downvote, [questionId]);
        downvote.then(response => res.status(201).json({
          status: '201',
          message: 'Downvoted',
          question: response[0],
        })).catch((error) => {
          res.status(500).send({ message: 'an error has occured', error });
        });
      }
    });
  },

  questionForMeetups(req, res) {
    const status = 'ACTIVE';
    const { meetupId } = req.params;
    const findMeetup = db(queries.getOneMeetup, [meetupId, status]);
    findMeetup.then((response) => {
      if (response.length === 0) {
        res.status(404).send({ status: '404', message: 'No meetup found with the specified id' });
      } else {
        const questionForMeetups = db(queries.questionMeetup, [meetupId]);
        questionForMeetups.then((response) => {
          if (response.length === 0) {
            res.status(404).send({ status: '404', message: 'No questions found for the specified meetuo id' });
          } else {
            res.status(200).json({
              status: '200',
              message: 'List of question for this particular meetup',
              questions: response,
            });
          }
        });
      }
    }).catch((error) => {
      res.status(500).send({ message: 'An error occured', error });
    });
  },
};

export default Questions;
