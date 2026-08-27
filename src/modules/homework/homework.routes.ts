import { Router } from 'express';
import { homeworkController } from './homework.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', homeworkController.list);
router.get('/:id', homeworkController.getById);
router.post('/', requireRoles('SuperAdmin', 'Admin', 'Teacher'), homeworkController.create);
router.post('/:id/submit', requireRoles('Student'), homeworkController.submit);
router.put('/submission/:submissionId/grade', requireRoles('SuperAdmin', 'Admin', 'Teacher'), homeworkController.grade);

export default router;

