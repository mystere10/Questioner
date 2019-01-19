import express from 'express';

import controllers from '../controllers/meetups';

const router = express.Router();

router.post('/', controllers.createMeetup);
router.get('/:id', controllers.getOneMeetup);
router.get('/', controllers.getAllMeetup);
router.delete('/:id', controllers.deleteOneMeetup);
router.post('/:id/rsvps', controllers.respondToMeetup);
<<<<<<< HEAD
router.get('/upcoming/meetups', controllers.upcoming);
router.post('/:id/questions', controllers.askQuestion);
=======
router.get('/meetups/upcoming', controllers.upcoming);
>>>>>>> challenge-3

export default router;
