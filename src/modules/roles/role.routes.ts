import { Router } from 'express';
import { roleController } from './role.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/permissions', requireRoles('SuperAdmin', 'Admin'), roleController.listPermissions);
router.get('/', requireRoles('SuperAdmin', 'Admin', 'Principal'), roleController.listRoles);
router.get('/:id', requireRoles('SuperAdmin', 'Admin'), roleController.getRoleById);
router.post('/', requireRoles('SuperAdmin', 'Admin'), roleController.createRole);
router.put('/:id', requireRoles('SuperAdmin', 'Admin'), roleController.updateRole);
router.delete('/:id', requireRoles('SuperAdmin'), roleController.deleteRole);

export default router;

