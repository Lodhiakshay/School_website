import mongoose from 'mongoose';
import { FeeCategoryModel } from './models/fee-category.model.js';
import { FeeStructureModel } from './models/fee-structure.model.js';
import { FeeInvoiceModel } from './models/fee-invoice.model.js';
import { FeePaymentModel } from './models/fee-payment.model.js';
import { StudentModel } from '../students/models/student.model.js';
import { AcademicYearModel } from '../academics/models/academic-year.model.js';
import { SchoolModel } from '../school/models/school.model.js';
import { NotFoundError, BadRequestError } from '../../common/errors/app-error.js';

export class FeeService {
  // Categories
  async listCategories() {
    return FeeCategoryModel.find().sort({ name: 1 });
  }

  async createCategory(data: any) {
    const category = new FeeCategoryModel(data);
    await category.save();
    return category;
  }

  // Structures
  async listStructures(academicYearId?: string, classId?: string) {
    const filter: any = {};
    if (academicYearId) filter.academicYearId = academicYearId;
    if (classId) filter.classId = classId;

    return FeeStructureModel.find(filter)
      .populate('feeCategoryId')
      .populate('classId', 'name code')
      .populate('academicYearId', 'name');
  }

  async createStructure(data: any) {
    let academicYearId = data.academicYearId;
    if (!academicYearId) {
      const activeYear = await AcademicYearModel.findOne({ isCurrent: true });
      if (!activeYear) throw new BadRequestError('Active academic year not found');
      academicYearId = activeYear._id;
    }

    const structure = new FeeStructureModel({ ...data, academicYearId });
    await structure.save();
    return structure.populate('feeCategoryId classId');
  }

  // Invoices
  async listInvoices(query: {
    studentId?: string;
    classId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, Math.max(1, query.limit || 20));
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.studentId) filter.studentId = query.studentId;
    if (query.classId) filter.classId = query.classId;
    if (query.status) filter.status = query.status;

    const [invoices, total] = await Promise.all([
      FeeInvoiceModel.find(filter)
        .populate('studentId', 'firstName lastName admissionNumber currentRollNumber')
        .populate('classId', 'name code')
        .populate('sectionId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      FeeInvoiceModel.countDocuments(filter),
    ]);

    return {
      invoices,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getInvoiceById(id: string) {
    const invoice = await FeeInvoiceModel.findById(id)
      .populate('studentId')
      .populate('classId')
      .populate('sectionId');
    if (!invoice) throw new NotFoundError('Invoice not found');

    const payments = await FeePaymentModel.find({ invoiceId: id })
      .populate('collectedBy', 'name email')
      .sort({ paymentDate: -1 });

    const school = await SchoolModel.findOne();

    return { invoice, payments, school };
  }

  async createInvoice(data: any) {
    const count = await FeeInvoiceModel.countDocuments();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    let subtotal = 0;
    let totalDiscount = 0;

    const items = data.items.map((item: any) => {
      const amount = Number(item.amount || 0);
      const discount = Number(item.discount || 0);
      const finalAmount = Math.max(0, amount - discount);
      subtotal += amount;
      totalDiscount += discount;
      return {
        feeCategoryId: item.feeCategoryId,
        categoryName: item.categoryName,
        amount,
        discount,
        finalAmount,
      };
    });

    const totalAmount = subtotal - totalDiscount;

    let academicYearId = data.academicYearId;
    if (!academicYearId) {
      const activeYear = await AcademicYearModel.findOne({ isCurrent: true });
      academicYearId = activeYear?._id;
    }

    const invoice = new FeeInvoiceModel({
      ...data,
      invoiceNumber,
      academicYearId,
      items,
      subtotal,
      totalDiscount,
      totalAmount,
      paidAmount: 0,
      balanceAmount: totalAmount,
      status: 'unpaid',
    });

    await invoice.save();
    return invoice.populate('studentId classId sectionId');
  }

  // Payments / POS Collection
  async recordPayment(data: {
    invoiceId: string;
    amount: number;
    paymentMethod: 'cash' | 'online_upi' | 'net_banking' | 'cheque' | 'dd';
    transactionReference?: string;
    notes?: string;
    collectedBy: string;
  }) {
    const invoice = await FeeInvoiceModel.findById(data.invoiceId);
    if (!invoice) throw new NotFoundError('Invoice not found');

    if (invoice.balanceAmount <= 0) {
      throw new BadRequestError('This invoice is already fully paid');
    }

    const payAmount = Math.min(Number(data.amount), invoice.balanceAmount);
    const count = await FeePaymentModel.countDocuments();
    const receiptNumber = `REC-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const payment = new FeePaymentModel({
      receiptNumber,
      invoiceId: invoice._id,
      studentId: invoice.studentId,
      amount: payAmount,
      paymentMethod: data.paymentMethod,
      transactionReference: data.transactionReference || '',
      notes: data.notes || '',
      collectedBy: data.collectedBy,
      paymentDate: new Date(),
      status: 'success',
    });

    await payment.save();

    // Update Invoice balances and status
    invoice.paidAmount += payAmount;
    invoice.balanceAmount = Math.max(0, invoice.totalAmount - invoice.paidAmount);
    if (invoice.balanceAmount === 0) {
      invoice.status = 'paid';
    } else {
      invoice.status = 'partially_paid';
    }
    await invoice.save();

    return {
      payment,
      invoice,
      receiptNumber,
    };
  }

  async getAccountantDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayPayments, allInvoices, recentPayments] = await Promise.all([
      FeePaymentModel.find({ paymentDate: { $gte: today }, status: 'success' }).lean(),
      FeeInvoiceModel.find({ status: { $ne: 'cancelled' } }).lean(),
      FeePaymentModel.find({ status: 'success' })
        .populate('studentId', 'firstName lastName admissionNumber')
        .populate('collectedBy', 'name')
        .sort({ paymentDate: -1 })
        .limit(10)
        .lean(),
    ]);

    const todayCollection = todayPayments.reduce((acc, p) => acc + p.amount, 0);
    const totalBilled = allInvoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
    const totalCollected = allInvoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
    const totalOutstanding = allInvoices.reduce((acc, inv) => acc + inv.balanceAmount, 0);
    const overdueCount = allInvoices.filter((inv) => inv.status === 'overdue' || (new Date(inv.dueDate) < new Date() && inv.balanceAmount > 0)).length;

    return {
      todayCollection,
      totalBilled,
      totalCollected,
      totalOutstanding,
      overdueInvoicesCount: overdueCount,
      recentPayments,
    };
  }
}

export const feeService = new FeeService();

