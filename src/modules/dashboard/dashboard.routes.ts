import { Router } from 'express';
import { dashboardController } from './dashboard.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/admin', requireRoles('SuperAdmin', 'Admin'), dashboardController.getAdminStats);
router.get('/principal', requireRoles('SuperAdmin', 'Admin', 'Principal'), dashboardController.getPrincipalStats);
router.get('/teacher', requireRoles('Teacher'), dashboardController.getTeacherDashboard);

export default router;

