import express from 'express';

import controllers from '../controllers/users';

const router = express.Router();

router.post('/', controllers.register);
router.get('/', controllers.getUsers);


export default router;
