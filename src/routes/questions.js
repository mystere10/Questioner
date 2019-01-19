import express from 'express';

import controllers from '../controllers/questions';

const router = express.Router();

router.post('/', controllers.createQuestion);
router.patch('/:id/upvote', controllers.upvote);
router.patch('/:id/downvote', controllers.downvote);
<<<<<<< HEAD
router.get('/:meetupid', controllers.allQuestions);
=======
>>>>>>> challenge-3

export default router;
