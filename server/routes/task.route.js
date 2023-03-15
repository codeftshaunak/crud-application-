import express from 'express';

import { createTask, getAllTask, getTaskInfoById  } from '../controllers/task.controller';

const router = express.Router();

router.route('/').get(getAllTask);
router.route('/').get(createTask);
router.route('/:id').get(getTaskInfoById);

export default router;
