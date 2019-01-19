/* eslint-disable max-len */
/* eslint-disable no-shadow */
import Joi from 'joi';
import Question from '../model/Questions';
import validate from '../helpers/validations';
import db from '../db/connect';
import queries from '../db/sqlQueries';

const Questions = {
  createQuestion(req, res) {
    const {
      createdBy, meetup, title, body, votes,
    } = req.body;

    const { error } = Joi.validate({
      createdBy, meetup, title, body, votes,
    }, validate.questionSchema);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const question = new Question(createdBy, meetup, title, body, votes);
      const query = db(queries.createQuestion, [question.createdBy, question.meetup, question.title, question.body, question.votes]);
      query.then((response) => {
        const {
          createdBy, meetup, title, body, votes,
        } = response[0];
        res.status(201).json({
          message: 'Question posted',
          response: {
            createdBy, meetup, title, body, votes,
          },
        });
      }).catch((error) => {
        res.status(403).send({ message: 'Question not created' });
        console.log(error);
      });
    }
  },

  upvote(req, res) {
    const questionId = req.params.id;
    const question = db(queries.getOneQuestion, [questionId]);
    question.then((response) => {
      if (response.length === 0) {
        res.status(404).send({ message: 'No question found with the specified id' });
      } else {
        res.status(200).send(response[0]);
        const upvote = db(queries.upvote, [questionId]);
        upvote.then((response) => {
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  },

  downvote(req, res) {
    const questionId = req.params.id;
    const question = db(queries.getOneQuestion, [questionId]);
    question.then((response) => {
      if (response.length === 0) {
        res.status(404).send({ message: 'No question found with the specified id' });
      } else {
        res.status(200).send(response[0]);
        const downvote = db(queries.downvote, [questionId]);
        downvote.then((response) => {
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  },
};

export default Questions;
