import { Router } from 'express';
import { auditController } from './audit.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);
router.get('/', requireRoles('SuperAdmin', 'Admin'), auditController.list);

export default router;

