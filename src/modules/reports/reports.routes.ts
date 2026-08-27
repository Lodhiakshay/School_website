import { Router } from 'express';
import { reportsController } from './reports.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/students', requireRoles('SuperAdmin', 'Admin', 'Principal'), reportsController.getStudentReport);
router.get('/fees', requireRoles('SuperAdmin', 'Admin', 'Accountant'), reportsController.getFeeReport);
router.get('/attendance', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), reportsController.getAttendanceReport);
router.get('/exams', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), reportsController.getExamReport);

export default router;

