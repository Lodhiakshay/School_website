import { Router } from 'express';
import { documentController } from './document.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

// Public routes for website visitors & parents
router.get('/public', documentController.listPublic);
router.get('/public/categories', documentController.getStats);
router.post('/:id/download-track', documentController.trackDownload);

// Protected routes for staff/admin
router.use(authenticate);

router.get('/', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher', 'Accountant'), documentController.listAdmin);
router.get('/stats', requireRoles('SuperAdmin', 'Admin', 'Principal'), documentController.getStats);
router.get('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal'), documentController.getById);
router.post('/', requireRoles('SuperAdmin', 'Admin', 'Principal'), documentController.create);
router.put('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal'), documentController.update);
router.patch('/:id/toggle-active', requireRoles('SuperAdmin', 'Admin', 'Principal'), documentController.toggleActive);
router.patch('/:id/toggle-public', requireRoles('SuperAdmin', 'Admin', 'Principal'), documentController.togglePublic);
router.delete('/:id', requireRoles('SuperAdmin', 'Admin'), documentController.delete);

export default router;
