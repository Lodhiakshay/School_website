import { BookModel } from './models/book.model.js';
import { LibraryTransactionModel } from './models/library-transaction.model.js';
import { NotFoundError, BadRequestError } from '../../common/errors/app-error.js';

export class LibraryService {
  async listBooks(query: { category?: string; search?: string; page?: number; limit?: number }) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, Math.max(1, query.limit || 20));
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.category) filter.category = query.category;
    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      filter.$or = [
        { title: searchRegex },
        { author: searchRegex },
        { isbn: searchRegex },
        { category: searchRegex },
      ];
    }

    const [books, total] = await Promise.all([
      BookModel.find(filter).sort({ title: 1 }).skip(skip).limit(limit).lean(),
      BookModel.countDocuments(filter),
    ]);

    return {
      books,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async createBook(data: any) {
    const book = new BookModel({
      ...data,
      availableCopies: data.totalCopies,
    });
    await book.save();
    return book;
  }

  async updateBook(id: string, data: any) {
    const book = await BookModel.findByIdAndUpdate(id, data, { new: true });
    if (!book) throw new NotFoundError('Book not found');
    return book;
  }

  async deleteBook(id: string) {
    await BookModel.findByIdAndDelete(id);
    return { message: 'Book deleted' };
  }

  async issueBook(data: {
    bookId: string;
    borrowerType: 'Student' | 'Teacher' | 'Staff';
    borrowerId: string;
    dueDate: Date;
    issuedBy: string;
  }) {
    const book = await BookModel.findById(data.bookId);
    if (!book) throw new NotFoundError('Book not found');
    if (book.availableCopies <= 0) {
      throw new BadRequestError('No available copies left for this book');
    }

    const transaction = new LibraryTransactionModel({
      bookId: data.bookId,
      borrowerType: data.borrowerType,
      borrowerId: data.borrowerId,
      dueDate: data.dueDate,
      issuedBy: data.issuedBy,
      status: 'issued',
    });

    await transaction.save();

    // Decrement available copies
    book.availableCopies -= 1;
    await book.save();

    return transaction.populate('bookId');
  }

  async returnBook(transactionId: string, data: { remarks?: string; fineAmount?: number }) {
    const transaction = await LibraryTransactionModel.findById(transactionId);
    if (!transaction) throw new NotFoundError('Transaction record not found');
    if (transaction.status === 'returned') {
      throw new BadRequestError('Book is already returned');
    }

    const book = await BookModel.findById(transaction.bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    transaction.returnDate = new Date();
    transaction.status = 'returned';
    transaction.remarks = data.remarks || '';
    if (data.fineAmount && data.fineAmount > 0) {
      transaction.fineAmount = data.fineAmount;
      transaction.fineStatus = 'unpaid';
    }

    await transaction.save();
    return transaction;
  }

  async listTransactions(query: { status?: string; borrowerId?: string }) {
    const filter: any = {};
    if (query.status) filter.status = query.status;
    if (query.borrowerId) filter.borrowerId = query.borrowerId;

    return LibraryTransactionModel.find(filter)
      .populate('bookId', 'title author isbn')
      .populate('issuedBy', 'name')
      .sort({ issuedDate: -1 });
  }

  async getLibraryStats() {
    const [totalBooks, issuedTransactions, overdueTransactions] = await Promise.all([
      BookModel.find().lean(),
      LibraryTransactionModel.find({ status: 'issued' }).lean(),
      LibraryTransactionModel.find({
        status: 'issued',
        dueDate: { $lt: new Date() },
      }).lean(),
    ]);

    const totalCopies = totalBooks.reduce((acc, b) => acc + b.totalCopies, 0);
    const availableCopies = totalBooks.reduce((acc, b) => acc + b.availableCopies, 0);

    return {
      uniqueTitles: totalBooks.length,
      totalCopies,
      availableCopies,
      currentlyIssued: issuedTransactions.length,
      overdueCount: overdueTransactions.length,
    };
  }
}

export const libraryService = new LibraryService();

