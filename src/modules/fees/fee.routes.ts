import { Router } from 'express';
import { feeController } from './fee.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

// Categories
router.get('/categories', feeController.listCategories);
router.post('/categories', requireRoles('SuperAdmin', 'Admin', 'Accountant'), feeController.createCategory);

// Structures
router.get('/structures', feeController.listStructures);
router.post('/structures', requireRoles('SuperAdmin', 'Admin', 'Accountant'), feeController.createStructure);

// Invoices & Billing
router.get('/invoices', feeController.listInvoices);
router.get('/invoices/:id', feeController.getInvoiceById);
router.post('/invoices', requireRoles('SuperAdmin', 'Admin', 'Accountant'), feeController.createInvoice);

// Payments & POS
router.post('/payments/collect', requireRoles('SuperAdmin', 'Admin', 'Accountant'), feeController.recordPayment);
router.get('/accountant/stats', requireRoles('SuperAdmin', 'Admin', 'Accountant'), feeController.getAccountantStats);

export default router;

