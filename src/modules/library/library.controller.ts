import { Response, NextFunction } from 'express';
import { libraryService } from './library.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class LibraryController {
  async listBooks(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category, search, page, limit } = req.query;
      const result = await libraryService.listBooks({
        category: category as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      sendResponse(res, 200, result.books, 'Books fetched', result.meta);
    } catch (error) {
      next(error);
    }
  }

  async createBook(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const book = await libraryService.createBook(req.body);
      sendCreated(res, book, 'Book added to library');
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await libraryService.updateBook(req.params.id, req.body);
      sendResponse(res, 200, updated, 'Book details updated');
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await libraryService.deleteBook(req.params.id);
      sendResponse(res, 200, result, 'Book deleted');
    } catch (error) {
      next(error);
    }
  }

  async issueBook(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const transaction = await libraryService.issueBook({
        ...req.body,
        issuedBy: req.user!.userId,
      });
      sendCreated(res, transaction, 'Book issued successfully');
    } catch (error) {
      next(error);
    }
  }

  async returnBook(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const transaction = await libraryService.returnBook(req.params.transactionId, req.body);
      sendResponse(res, 200, transaction, 'Book returned successfully');
    } catch (error) {
      next(error);
    }
  }

  async listTransactions(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, borrowerId } = req.query;
      const txs = await libraryService.listTransactions({
        status: status as string,
        borrowerId: (borrowerId as string) || (req.user?.role === 'Student' ? req.user.entityId : undefined),
      });
      sendResponse(res, 200, txs, 'Library transactions fetched');
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await libraryService.getLibraryStats();
      sendResponse(res, 200, stats, 'Library statistics fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const libraryController = new LibraryController();

