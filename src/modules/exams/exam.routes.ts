import { Router } from 'express';
import { examController } from './exam.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', examController.list);
router.get('/:id', examController.getById);
router.post('/', requireRoles('SuperAdmin', 'Admin', 'Principal'), examController.create);
router.post('/:id/schedule', requireRoles('SuperAdmin', 'Admin', 'Principal'), examController.addSchedule);
router.put('/:id/status', requireRoles('SuperAdmin', 'Admin', 'Principal'), examController.updateStatus);

export default router;

