import express from 'express';

import controllers from '../controllers/meetups';

const router = express.Router();

router.post('/', controllers.createMeetup);
router.get('/:id', controllers.getOneMeetup);
router.get('/', controllers.getAllMeetup);
router.delete('/:id', controllers.deleteOneMeetup);

export default router;