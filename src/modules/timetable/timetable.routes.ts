import { Router } from 'express';
import { timetableController } from './timetable.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/section/:sectionId', timetableController.getSectionTimetable);
router.get('/teacher/:teacherId', timetableController.getTeacherTimetable);
router.post('/slot', requireRoles('SuperAdmin', 'Admin', 'Principal'), timetableController.saveSlot);
router.delete('/slot/:id', requireRoles('SuperAdmin', 'Admin', 'Principal'), timetableController.deleteSlot);

export default router;

