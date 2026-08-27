import { Router } from 'express';
import { schoolController } from './school.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';
import { upload } from '../../common/utils/storage.js';

const router = Router();

// Public routes for landing/home/contact page info
router.get('/public', schoolController.getPublicProfile);
router.get('/public-home', schoolController.getPublicProfile);
router.post('/inquiry', schoolController.submitInquiry);

// Protected routes
router.use(authenticate);
router.get('/', schoolController.getPublicProfile);
router.put('/', requireRoles('SuperAdmin', 'Admin'), schoolController.updateProfile);
router.patch('/toggle', requireRoles('SuperAdmin', 'Admin'), schoolController.toggleSection);
router.post('/upload-media', requireRoles('SuperAdmin', 'Admin'), upload.single('file'), schoolController.uploadMedia);

// Inquiry Admin Management
router.get('/inquiries/list', requireRoles('SuperAdmin', 'Admin', 'Principal'), schoolController.listInquiries);
router.patch('/inquiries/:id/status', requireRoles('SuperAdmin', 'Admin', 'Principal'), schoolController.updateInquiryStatus);

export default router;
