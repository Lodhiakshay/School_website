import { Router } from 'express';
import { teacherController } from './teacher.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', teacherController.list.bind(teacherController));
router.get('/:id', teacherController.getById.bind(teacherController));
router.post('/', requireRoles('SuperAdmin', 'Admin'), teacherController.create.bind(teacherController));
router.put('/:id', requireRoles('SuperAdmin', 'Admin'), teacherController.update.bind(teacherController));
router.delete('/:id', requireRoles('SuperAdmin', 'Admin'), teacherController.delete.bind(teacherController));

export default router;
