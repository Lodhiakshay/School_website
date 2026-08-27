import { Router } from 'express';
import { userController } from './user.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles, requirePermissions } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', requireRoles('SuperAdmin', 'Admin', 'Principal'), userController.list);
router.get('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal'), userController.getById);
router.post('/', requireRoles('SuperAdmin', 'Admin'), userController.create);
router.put('/:id', requireRoles('SuperAdmin', 'Admin'), userController.update);
router.delete('/:id', requireRoles('SuperAdmin', 'Admin'), userController.remove);
router.post('/:id/reset-password', requireRoles('SuperAdmin', 'Admin'), userController.resetPassword);

export default router;

