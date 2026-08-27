import { Response, NextFunction } from 'express';
import { feeService } from './fee.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class FeeController {
  async listCategories(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await feeService.listCategories();
      sendResponse(res, 200, categories, 'Fee categories fetched');
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = await feeService.createCategory(req.body);
      sendCreated(res, category, 'Fee category created');
    } catch (error) {
      next(error);
    }
  }

  async listStructures(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { academicYearId, classId } = req.query;
      const structures = await feeService.listStructures(academicYearId as string, classId as string);
      sendResponse(res, 200, structures, 'Fee structures fetched');
    } catch (error) {
      next(error);
    }
  }

  async createStructure(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const structure = await feeService.createStructure(req.body);
      sendCreated(res, structure, 'Fee structure created');
    } catch (error) {
      next(error);
    }
  }

  async listInvoices(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId, classId, status, page, limit } = req.query;
      const targetStudentId = (studentId as string) || (req.user?.role === 'Student' ? req.user.entityId : undefined);
      const result = await feeService.listInvoices({
        studentId: targetStudentId,
        classId: classId as string,
        status: status as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      sendResponse(res, 200, result.invoices, 'Invoices fetched', result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getInvoiceById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await feeService.getInvoiceById(req.params.id);
      sendResponse(res, 200, result, 'Invoice details fetched');
    } catch (error) {
      next(error);
    }
  }

  async createInvoice(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const invoice = await feeService.createInvoice(req.body);
      sendCreated(res, invoice, 'Invoice generated successfully');
    } catch (error) {
      next(error);
    }
  }

  async recordPayment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await feeService.recordPayment({
        ...req.body,
        collectedBy: req.user!.userId,
      });
      sendResponse(res, 200, result, 'Payment recorded and receipt generated');
    } catch (error) {
      next(error);
    }
  }

  async getAccountantStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await feeService.getAccountantDashboardStats();
      sendResponse(res, 200, stats, 'Accountant metrics fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const feeController = new FeeController();

