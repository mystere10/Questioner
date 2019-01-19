import express from 'express';

import controllers from '../controllers/users';

const router = express.Router();

router.post('/auth/register', controllers.register);
router.post('/auth/login', controllers.login);

export default router;
