import Question from '../model/Questions';
import Joi from 'joi';
import validate from '../helpers/validations';
import db from '../db/connect';
import queries from '../db/sqlQueries';

const Questions = {
  createQuestion(req, res) {
    const {
      createdBy, meetup, title, body, votes
    } = req.body;

    const {error, value} = Joi.validate({
      createdBy, meetup, title, body, votes
    }, validate.questionSchema);

    if(error){
      res.status(400).json({error: error.details[0].message});
    } else {
      const question = new Question(createdBy, meetup, title, body, votes);
      const query = db(queries.createQuestion, [question.createdBy, question.meetup, question.title, question.body, question.votes]);
      query.then((response) => {
        const {
            createdBy, meetup, title, body, votes
        } = response[0];
        res.status(201).json({
          message: 'Question posted',
          response: {
            createdBy, meetup, title, body, votes
          },
        });
      }).catch((error) => {
        res.status(403).send({ message: 'Question not created' });
        console.log(error);
      });
    }
  },

  // upvote(req, res) {
  //   const question = questionModel.findQuestion(req.params.id);
  //   if (!question) {
  //     return res.status(404).json({
  //       message: 'No question with the specified id',
  //     });
  //   }

  //   const like = questionModel.upvoteQ(req.params.id, req.body);
  //   return res.status(200).json({
  //     message: 'Successful',
  //     question: like,
  //   });
  // },

  // downvote(req, res) {
  //   const question = questionModel.findQuestion(req.params.id);
  //   if (!question) {
  //     return res.status(404).json({
  //       message: 'No question with the specified id',
  //     });
  //   }

  //   const unlike = questionModel.downvoteQ(req.params.id, req.body);
  //   return res.status(200).json({
  //     message: 'Successful',
  //     question: unlike,
  //   });
  // },
};

export default Questions;
