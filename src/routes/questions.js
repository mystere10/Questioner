import express from 'express';
import auth from '../helpers/auth';
import controllers from '../controllers/questions';

const router = express.Router();

// Routes for questions
router.patch('/:id/upvote', auth.verifyUser, controllers.upvote);
router.patch('/:id/downvote', auth.verifyUser, controllers.downvote);
router.get('/:meetupId', auth.verifyUser, controllers.questionForMeetups);

export default router;
