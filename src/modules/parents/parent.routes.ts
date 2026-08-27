import { Router } from 'express';
import { parentController } from './parent.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/my-children', requireRoles('Parent'), parentController.getMyChildren);
router.get('/', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), parentController.list);
router.get('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal'), parentController.getById);

export default router;

