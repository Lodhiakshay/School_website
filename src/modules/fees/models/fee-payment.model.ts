import mongoose, { Schema, Document } from 'mongoose';

export interface IFeePayment extends Document {
  receiptNumber: string; // e.g. "REC-2026-0001"
  invoiceId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  amount: number;
  paymentMethod: 'cash' | 'online_upi' | 'net_banking' | 'cheque' | 'dd';
  transactionReference?: string;
  collectedBy: mongoose.Types.ObjectId; // Accountant or Admin User
  paymentDate: Date;
  receiptPdfUrl?: string;
  notes?: string;
  status: 'success' | 'pending' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

const FeePaymentSchema = new Schema<IFeePayment>(
  {
    receiptNumber: { type: String, required: true, unique: true, uppercase: true, index: true },
    invoiceId: { type: Schema.Types.ObjectId, ref: 'FeeInvoice', required: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cash', 'online_upi', 'net_banking', 'cheque', 'dd'],
      default: 'cash',
    },
    transactionReference: { type: String, default: '' },
    collectedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentDate: { type: Date, default: Date.now },
    receiptPdfUrl: { type: String, default: '' },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['success', 'pending', 'failed', 'refunded'],
      default: 'success',
      index: true,
    },
  },
  { timestamps: true }
);

export const FeePaymentModel = mongoose.model<IFeePayment>('FeePayment', FeePaymentSchema);

