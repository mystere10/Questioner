import express from 'express';

import controllers from '../controllers/users';

const router = express.Router();

<<<<<<< HEAD
router.post('/', controllers.register);
router.get('/', controllers.getUsers);
=======
router.post('/signup', controllers.register);
router.post('/login', controllers.login);
>>>>>>> challenge-3


export default router;
