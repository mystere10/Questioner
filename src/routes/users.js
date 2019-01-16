import express from 'express';

import controllers from '../controllers/users';

const router = express.Router();

<<<<<<< HEAD
router.post('/signup', controllers.register);
router.post('/login', controllers.login);

=======
router.post('/auth/register', controllers.register);
router.post('/auth/login', controllers.login);


>>>>>>> ft-login-163038644
export default router;
