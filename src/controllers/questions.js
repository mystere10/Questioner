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
    const userid = req.userId;
    const vote = 1;
    const { error } = Joi.validate({
      questionId,
    }, validate.questionParams);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const countingupvotes = db(queries.countingupVotes);
      const question = db(queries.getOneQuestion, [questionId]);
      question.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ message: 'No question found with the specified id' });
        } else {
          const checkvoteduser = db(queries.checkifvoted, [userid, questionId]);
          checkvoteduser.then((response) => {
            if (response.length === 0) {
              const upvote = db(queries.upvote, [userid, questionId, vote]);
              upvote.then((response) => {
                if (response) {
                  countingupvotes.then((countResponse) => {
                    if (countResponse !== 0) {
                      res.status(200).json({
                        question: countResponse[0],
                      });
                    } else {
                      question.then((response) => {
                        res.status(200).json({
                          question: response[0],
                        });
                      });
                    }
                  });
                }
              }).catch((error) => {
                res.status(500).send({ message: 'an error has occured', error });
              });
            } else if (response.length !== 0) {
              const deletevote = db(queries.deletevoteduser, [userid, questionId]);
              deletevote.then((response) => {
                if (response) {
                  countingupvotes.then((countResponse) => {
                    res.status(200).json({
                      question: countResponse[0],
                    });
                  });
                }
              });
            }
          });
        }
      });
    }
  },

  // Downvoting controller
  downvote(req, res) {
    const questionId = req.params.id;
    const userid = req.userId;
    const vote = 1;
    const { error } = Joi.validate({
      questionId,
    }, validate.questionParams);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const countingdownvotes = db(queries.countingdownVotes);
      const question = db(queries.getOneQuestion, [questionId]);
      question.then((response) => {
        if (response.length === 0) {
          res.status(404).send({ message: 'No question found with the specified id' });
        } else {
          const checkvoteduser = db(queries.checkifvoted, [userid, questionId]);
          checkvoteduser.then((response) => {
            if (response.length === 0) {
              const upvote = db(queries.downvote, [userid, questionId, vote]);
              upvote.then((response) => {
                if (response) {
                  countingdownvotes.then((countResponse) => {
                    if (countResponse.length !== 0) {
                      res.status(200).json({
                        question: countResponse[0],
                      });
                    } else {
                      question.then((response) => {
                        res.status(200).json({
                          question: response[0],
                        });
                      });
                    }
                  });
                }
              }).catch((error) => {
                res.status(500).send({ message: 'an error has occured', error });
              });
            } else if (response.length !== 0) {
              const deletevote = db(queries.deletevoteduser, [userid, questionId]);
              deletevote.then((response) => {
                if (response) {
                  countingdownvotes.then((countResponse) => {
                    res.status(200).json({
                      question: countResponse[0],
                    });
                  });
                }
              });
            }
          });
        }
      });
    }
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

  commentForQuestions(req, res) {
    const questionId = req.params.id;
    const {
      comment,
    } = req.body;
    const { error } = Joi.validate({
      questionId, comment,
    }, validate.commentSchema);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
    }
    const userid = req.userId;
    const findQuestion = db(queries.getOneQuestion, [questionId]);
    findQuestion.then((response) => {
      if (response.length === 0 || response === 'undefined') {
        res.status(404).json({
          status: '404',
          message: 'No question found',
        });
      } else {
        const postComment = db(queries.postComment, [userid, questionId, comment]);
        postComment.then((response) => {
          if (response) {
            res.status(201).json({
              status: '201',
              message: 'Comment posted',
              comment: response[0],
            });
          }
        }).catch((error) => {
          res.status(500).send(error);
        });
      }
    }).catch((error) => {
      res.status(500).send(error);
    });
  },
};

export default Questions;
