import { Router } from 'express';
import { noticeController } from './notice.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

// Public notices for homepage ticker and public visitors
router.get('/public', noticeController.listPublic);

router.use(authenticate);

// Protected Notices
router.get('/', noticeController.list);
router.post('/', requireRoles('SuperAdmin', 'Admin', 'Principal', 'Teacher'), noticeController.create);
router.delete('/:id', requireRoles('SuperAdmin', 'Admin', 'Principal'), noticeController.delete);

// Notifications
router.get('/notifications', noticeController.getNotifications);
router.put('/notifications/:id/read', noticeController.markAsRead);
router.put('/notifications/read-all', noticeController.markAllRead);

export default router;

