import { Router } from 'express';
import { academicsController } from './academics.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

// Years
router.get('/years', academicsController.listAcademicYears.bind(academicsController));
router.post('/years', requireRoles('SuperAdmin', 'Admin'), academicsController.createAcademicYear.bind(academicsController));
router.put('/years/:id/set-current', requireRoles('SuperAdmin', 'Admin'), academicsController.setCurrentAcademicYear.bind(academicsController));

// Classes
router.get('/classes', academicsController.listClasses.bind(academicsController));
router.post('/classes', requireRoles('SuperAdmin', 'Admin'), academicsController.createClass.bind(academicsController));
router.put('/classes/:id', requireRoles('SuperAdmin', 'Admin'), academicsController.updateClass.bind(academicsController));
router.delete('/classes/:id', requireRoles('SuperAdmin', 'Admin'), academicsController.deleteClass.bind(academicsController));

// Sections
router.get('/sections', academicsController.listSections.bind(academicsController));
router.post('/sections', requireRoles('SuperAdmin', 'Admin'), academicsController.createSection.bind(academicsController));
router.put('/sections/:id', requireRoles('SuperAdmin', 'Admin'), academicsController.updateSection.bind(academicsController));
router.delete('/sections/:id', requireRoles('SuperAdmin', 'Admin'), academicsController.deleteSection.bind(academicsController));

// Subjects
router.get('/subjects', academicsController.listSubjects.bind(academicsController));
router.post('/subjects', requireRoles('SuperAdmin', 'Admin'), academicsController.createSubject.bind(academicsController));
router.put('/subjects/:id', requireRoles('SuperAdmin', 'Admin'), academicsController.updateSubject.bind(academicsController));
router.delete('/subjects/:id', requireRoles('SuperAdmin', 'Admin'), academicsController.deleteSubject.bind(academicsController));

export default router;
