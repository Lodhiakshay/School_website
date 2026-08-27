import { Router } from 'express';
import { galleryController } from './gallery.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

// Public routes for website visitors
router.get('/public', galleryController.listPublic);
router.get('/public/categories', galleryController.getStats);
router.get('/', galleryController.listPublic);

// Protected routes for Admin / Staff
router.use(authenticate);

router.get('/admin/list', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), galleryController.listAdmin);
router.get('/admin/stats', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), galleryController.getStats);
router.get('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), galleryController.getById);
router.post('/', requireRoles('SuperAdmin', 'Admin', 'Principal'), galleryController.create);
router.put('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal'), galleryController.update);
router.patch('/:id/toggle', requireRoles('SuperAdmin', 'Admin', 'Principal'), galleryController.toggleActive);
router.delete('/:id', requireRoles('SuperAdmin', 'Admin'), galleryController.delete);

export default router;

