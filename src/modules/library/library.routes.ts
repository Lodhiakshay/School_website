import { Router } from 'express';
import { libraryController } from './library.controller.js';
import { authenticate } from '../../common/middlewares/auth.middleware.js';
import { requireRoles } from '../../common/middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

// Catalog
router.get('/books', libraryController.listBooks);
router.post('/books', requireRoles('SuperAdmin', 'Admin', 'Librarian'), libraryController.createBook);
router.put('/books/:id', requireRoles('SuperAdmin', 'Admin', 'Librarian'), libraryController.updateBook);
router.delete('/books/:id', requireRoles('SuperAdmin', 'Admin', 'Librarian'), libraryController.deleteBook);

// Transactions & Circulation
router.get('/transactions', libraryController.listTransactions);
router.post('/issue', requireRoles('SuperAdmin', 'Admin', 'Librarian'), libraryController.issueBook);
router.post('/return/:transactionId', requireRoles('SuperAdmin', 'Admin', 'Librarian'), libraryController.returnBook);
router.get('/stats', requireRoles('SuperAdmin', 'Admin', 'Librarian'), libraryController.getStats);

export default router;

