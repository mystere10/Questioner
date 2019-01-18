import express from 'express';

import controllers from '../controllers/questions';

const router = express.Router();

router.post('/', controllers.createQuestion);
router.patch('/:id/upvote', controllers.upvote);
router.patch('/:id/downvote', controllers.downvote);
router.get('/:meetupid', controllers.allQuestions);

export default router;
