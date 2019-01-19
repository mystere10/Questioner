import Joi from 'joi';
import questionModel from '../model/Questions';
import validations from '../helpers/validations';
import usersModel from '../model/User';

const Question = {
  createQuestion(req, res) {
    const {
      createdBy, meetup, title, body, votes,
    } = req.body;

    const { error } = Joi.validate({
      createdBy, meetup, title, body, votes,
    }, validations.questionSchema);

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

  upvote(req, res) {
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
    });
  },

  downvote(req, res) {
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
