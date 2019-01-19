<<<<<<< HEAD
import Joi from 'joi';
import questionModel from '../model/Questions';
import validations from '../helpers/validations';
import usersModel from '../model/User';

const Question = {
=======
/* eslint-disable max-len */
/* eslint-disable no-shadow */
import Joi from 'joi';
import Question from '../model/Questions';
import validate from '../helpers/validations';
import db from '../db/connect';
import queries from '../db/sqlQueries';

const Questions = {
>>>>>>> challenge-3
  createQuestion(req, res) {
    const {
      createdBy, meetup, title, body, votes,
    } = req.body;

    const { error } = Joi.validate({
      createdBy, meetup, title, body, votes,
<<<<<<< HEAD
    }, validations.questionSchema);
=======
    }, validate.questionSchema);
>>>>>>> challenge-3

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
<<<<<<< HEAD
      const question = questionModel.createQ(req.body);
      return res.status(201).json({
        status: '201',
        message: 'Thank you for posting your question',
        question,
=======
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
>>>>>>> challenge-3
      });
    }
  },

  upvote(req, res) {
<<<<<<< HEAD
    const question = questionModel.findQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: '404',
        message: 'No question with the specified id',
      });
    }
    const { user } = req.body;
    const findUser = usersModel.getOneUser(user);
    if (!findUser) {
      return res.status(404).json({
        status: '404',
        meessage: 'No user found with the specified id',
      });
    }
    const like = questionModel.upvoteQ(req.params.id, req.body, req.body.user);
    return res.status(200).json({
      status: '200',
      message: 'Successful',
      question: like,
=======
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
>>>>>>> challenge-3
    });
  },

  downvote(req, res) {
<<<<<<< HEAD
    const question = questionModel.findQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: '404',
        message: 'No question with the specified id',
      });
    }
    const { user } = req.body;
    const findUser = usersModel.getOneUser(user);
    if (!findUser) {
      return res.status(404).json({
        status: '404',
        meessage: 'No user found with the specified id',
      });
    }
    const unlike = questionModel.downvoteQ(req.params.id, req.body, req.body.user);
    return res.status(200).json({
      status: '200',
      message: 'Successful',
      question: unlike,
    });
  },

  allQuestions(req, res) {
    const allquestions = questionModel.getAllQuestions(req.params.meetupid);
    if (!allquestions) {
      res.status(404).json({
        status: '404',
        message: 'Questions not found',
      });
    } else {
      res.status(200).json({
        status: '200',
        questions: allquestions,
      });
    }
  },

};

export default Question;
=======
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
>>>>>>> challenge-3
