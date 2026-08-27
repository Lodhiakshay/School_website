import { Router } from 'express';
import { authController } from './auth.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';

const router = Router();

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/change-password', authenticate, authController.changePassword);
router.get('/me', authenticate, authController.getMe);
router.post('/logout', authenticate, authController.logout);

export default router;

