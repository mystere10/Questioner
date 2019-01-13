import express from 'express';

import controllers from '../controllers/questions';

const router = express.Router();

router.post('/', controllers.createQuestion);
// router.patch('/:id', controllers.upvote);
router.patch('/downvote/:id', controllers.downvote);

export default router;
