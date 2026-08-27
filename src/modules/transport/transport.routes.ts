import { Router } from 'express';
import { transportController } from './transport.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/vehicles', transportController.listVehicles);
router.post('/vehicles', requireRoles('SuperAdmin', 'Admin'), transportController.createVehicle);

router.get('/routes', transportController.listRoutes);
router.post('/routes', requireRoles('SuperAdmin', 'Admin'), transportController.createRoute);

router.post('/assign/:studentId', requireRoles('SuperAdmin', 'Admin'), transportController.assignStudent);
router.get('/assignments', transportController.listAssignments);

export default router;

