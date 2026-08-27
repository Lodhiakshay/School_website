import { Router } from 'express';
import { resultsController } from './results.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.post('/marks/batch', requireRoles('SuperAdmin', 'Admin', 'Teacher'), resultsController.saveMarks);
router.get('/marks/sheet', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), resultsController.getSubjectMarks);
router.post('/publish', requireRoles('SuperAdmin', 'Admin', 'Principal'), resultsController.publishResults);
router.get('/report-card/:examId/:studentId', resultsController.getReportCard);
router.get('/', resultsController.listResults);

export default router;

