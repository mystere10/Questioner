import express from 'express';

import controllers from '../controllers/meetups';

const router = express.Router();

// Routes for meetups
router.get('/upcoming', controllers.upcoming);
router.post('/', controllers.createMeetup);
router.get('/:id', controllers.getOneMeetup);
router.get('/', controllers.getAllMeetup);
router.delete('/:id', controllers.deleteOneMeetup);
router.post('/:id/rsvps', controllers.respondToMeetup);
router.post('/:id/questions', controllers.askQuestion);
export default router;
