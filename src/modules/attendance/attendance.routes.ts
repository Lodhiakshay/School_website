import { Router } from 'express';
import { attendanceController } from './attendance.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/batch', requireRoles('SuperAdmin', 'Admin', 'Teacher'), attendanceController.markBatch.bind(attendanceController));
router.get('/class-sheet', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), attendanceController.getClassSheet.bind(attendanceController));
router.get('/student/:studentId/summary', attendanceController.getStudentSummary.bind(attendanceController));
router.get('/today', requireRoles('SuperAdmin', 'Admin', 'Principal'), attendanceController.getTodayStats.bind(attendanceController));

export default router;
