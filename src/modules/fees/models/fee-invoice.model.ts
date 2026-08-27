import mongoose, { Schema, Document } from 'mongoose';

export interface IFeeInvoiceItem {
  feeCategoryId: mongoose.Types.ObjectId;
  categoryName: string;
  amount: number;
  discount: number;
  finalAmount: number;
}

export interface IFeeInvoice extends Document {
  invoiceNumber: string; // e.g. "INV-2026-0001"
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  academicYearId: mongoose.Types.ObjectId;
  title: string; // e.g. "Q1 Fee Invoice (Apr - Jun)"
  items: IFeeInvoiceItem[];
  subtotal: number;
  totalDiscount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  dueDate: Date;
  status: 'unpaid' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeeInvoiceSchema = new Schema<IFeeInvoice>(
  {
    invoiceNumber: { type: String, required: true, unique: true, uppercase: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    title: { type: String, required: true, trim: true },
    items: [
      {
        feeCategoryId: { type: Schema.Types.ObjectId, ref: 'FeeCategory' },
        categoryName: { type: String, required: true },
        amount: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        finalAmount: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    totalDiscount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    balanceAmount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['unpaid', 'partially_paid', 'paid', 'overdue', 'cancelled'],
      default: 'unpaid',
      index: true,
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const FeeInvoiceModel = mongoose.model<IFeeInvoice>('FeeInvoice', FeeInvoiceSchema);

