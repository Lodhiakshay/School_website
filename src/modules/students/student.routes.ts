import { Router } from 'express';
import { studentController } from './student.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', studentController.list);
router.get('/:id', studentController.getById);
router.post('/', requireRoles('SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff'), studentController.create);
router.put('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff'), studentController.update);
router.delete('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff'), studentController.delete);
router.post('/:id/promote', requireRoles('SuperAdmin', 'Admin', 'Principal'), studentController.promote);
router.post('/:id/documents', requireRoles('SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff'), studentController.uploadDoc);

export default router;

