import { Router } from 'express';
import { certificateController } from './certificate.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', certificateController.list);
router.post('/generate', requireRoles('SuperAdmin', 'Admin', 'Principal'), certificateController.generate);
router.get('/:id', certificateController.getById);

export default router;

