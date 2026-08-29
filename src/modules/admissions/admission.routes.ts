import { Router } from 'express';
import { admissionController } from './admission.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

// Public routes for website visitors & applicants
router.post('/apply', admissionController.submitPublic);
router.post('/public/apply', admissionController.submitPublic);
router.get('/track/:identifier', admissionController.trackStatus);
router.get('/track', admissionController.trackStatus);

// Protected routes for staff/admin
router.use(authenticate);

router.get('/stats', requireRoles('SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff', 'Accountant'), admissionController.getStats);
router.get('/', requireRoles('SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff', 'Accountant'), admissionController.list);
router.get('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff', 'Accountant'), admissionController.getById);
router.put('/:id/status', requireRoles('SuperAdmin', 'Admin', 'AdmissionStaff', 'Principal'), admissionController.updateStatus);
router.post('/:id/admit', requireRoles('SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff'), admissionController.convertToStudent);
router.delete('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal'), admissionController.deleteApplication);

export default router;


