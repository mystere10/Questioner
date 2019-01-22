import express from 'express';
import auth from '../helpers/auth';
import controllers from '../controllers/meetups';

const router = express.Router();

// Routes for meetups
router.get('/upcoming', auth.verifyUser, controllers.upcoming);
router.post('/', auth.verifyAdmin, controllers.createMeetup);
router.get('/:id', auth.verifyAdmin, controllers.getOneMeetup);
router.get('/', auth.verifyAdmin, controllers.getAllMeetup);
router.delete('/:id', auth.verifyAdmin, controllers.deleteOneMeetup);
router.post('/:id/rsvps', auth.verifyUser, controllers.respondToMeetup);
router.post('/:id/questions', auth.verifyUser, controllers.askQuestion);

export default router;
