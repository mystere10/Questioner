import express from 'express';

import controllers from '../controllers/users';

const router = express.Router();

// Routes for users
router.post('/signup', controllers.register);
router.post('/login', controllers.login);

export default router;
