import express from 'express';

import controllers from '../controllers/questions';

const router = express.Router();

// Routes for questions
router.patch('/:id/upvote', controllers.upvote);
router.patch('/:id/downvote', controllers.downvote);
router.get('/:meetupId', controllers.questionForMeetups);

export default router;
