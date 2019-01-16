import Joi from 'joi';
import questionModel from '../model/Questions';
import validations from '../helpers/validations';

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
        message: 'Thank you for posting your question',
        question,
      });
    }
  },

  upvote(req, res) {
    const question = questionModel.findQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({
        message: 'No question with the specified id',
      });
    }

    const like = questionModel.upvoteQ(req.params.id, req.body);
    return res.status(200).json({
      message: 'Successful',
      question: like,
    });
  },

  downvote(req, res) {
    const question = questionModel.findQuestion(req.params.id);
    if (!question) {
      return res.status(404).json({
        message: 'No question with the specified id',
      });
    }

    const unlike = questionModel.downvoteQ(req.params.id, req.body);
    return res.status(200).json({
      message: 'Successful',
      question: unlike,
    });
  },
};

export default Question;
