import express from 'express';

import controllers from '../controllers/questions';

const router = express.Router();

router.post('/', controllers.createQuestion);

export default router;