import mongoose, { Schema, Document } from 'mongoose';

export interface ILibraryTransaction extends Document {
  bookId: mongoose.Types.ObjectId;
  borrowerType: 'Student' | 'Teacher' | 'Staff';
  borrowerId: mongoose.Types.ObjectId;
  issuedDate: Date;
  dueDate: Date;
  returnDate?: Date;
  fineAmount: number;
  fineStatus: 'none' | 'unpaid' | 'paid' | 'waived';
  status: 'issued' | 'returned' | 'overdue' | 'lost';
  issuedBy: mongoose.Types.ObjectId;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LibraryTransactionSchema = new Schema<ILibraryTransaction>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true, index: true },
    borrowerType: { type: String, enum: ['Student', 'Teacher', 'Staff'], required: true },
    borrowerId: { type: Schema.Types.ObjectId, required: true, refPath: 'borrowerType', index: true },
    issuedDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    fineAmount: { type: Number, default: 0 },
    fineStatus: { type: String, enum: ['none', 'unpaid', 'paid', 'waived'], default: 'none' },
    status: {
      type: String,
      enum: ['issued', 'returned', 'overdue', 'lost'],
      default: 'issued',
      index: true,
    },
    issuedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    remarks: { type: String, default: '' },
  },
  { timestamps: true }
);

export const LibraryTransactionModel = mongoose.model<ILibraryTransaction>(
  'LibraryTransaction',
  LibraryTransactionSchema
);

