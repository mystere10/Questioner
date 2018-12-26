import express from 'express';

import controllers from '../controllers/meetups';

const router = express.Router();

router.post('/', controllers.createMeetup);

export default router;