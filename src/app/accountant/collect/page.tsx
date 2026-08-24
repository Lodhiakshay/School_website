'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Printer,
  CheckCircle2,
  Search,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackInvoices = [
  {
    _id: 'inv_01',
    invoiceNumber: 'INV-2026-1001',
    studentName: 'Aarav Sharma (Class 10-A)',
    admissionNo: 'SGM-2026-1001',
    title: 'Quarter 2 Tuition & Science Lab Fee (Jul - Sep)',
    totalAmount: 5800,
    paidAmount: 5800,
    balanceAmount: 0,
    status: 'paid',
  },
  {
    _id: 'inv_02',
    invoiceNumber: 'INV-2026-1002',
    studentName: 'Ananya Gupta (Class 10-A)',
    admissionNo: 'SGM-2026-1002',
    title: 'Quarter 2 Tuition & Annual Charges',
    totalAmount: 5800,
    paidAmount: 2800,
    balanceAmount: 3000,
    status: 'partial',
  },
  {
    _id: 'inv_03',
    invoiceNumber: 'INV-2026-1201',
    studentName: 'Rohan Verma (Class 12-A - Science PCM)',
    admissionNo: 'SGM-2026-1201',
    title: 'Quarter 2 Tuition & Board Practical Lab Charges',
    totalAmount: 6800,
    paidAmount: 0,
    balanceAmount: 6800,
    status: 'unpaid',
  },
  {
    _id: 'inv_04',
    invoiceNumber: 'INV-2026-1003',
    studentName: 'Divyanshu Singh (Class 10-B)',
    admissionNo: 'SGM-2026-1003',
    title: 'Quarter 2 Tuition & School Bus Route 1 Fee',
    totalAmount: 7200,
    paidAmount: 7200,
    balanceAmount: 0,
    status: 'paid',
  },
  {
    _id: 'inv_05',
    invoiceNumber: 'INV-2026-1102',
    studentName: 'Priya Singh (Class 11-B - PCB)',
    admissionNo: 'SGM-2026-1102',
    title: 'Quarter 2 Tuition & Bio Lab Kit',
    totalAmount: 6400,
    paidAmount: 3400,
    balanceAmount: 3000,
    status: 'partial',
  },
  {
    _id: 'inv_06',
    invoiceNumber: 'INV-2026-0901',
    studentName: 'Harsh Mishra (Class 9-A)',
    admissionNo: 'SGM-2026-0901',
    title: 'Quarter 2 Tuition & IT Lab Fee',
    totalAmount: 5200,
    paidAmount: 0,
    balanceAmount: 5200,
    status: 'unpaid',
  },
];

export default function AccountantCollectPage() {
  const [invoices, setInvoices] = useState<any[]>(fallbackInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInvoice, setActiveInvoice] = useState<any | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);
  const { toast } = useToast();

  const [payForm, setPayForm] = useState({
    amount: 3000,
    paymentMethod: 'cash',
    transactionReference: '',
    notes: '',
  });

  const handleCollect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInvoice) return;

    const collectedAmt = Number(payForm.amount) || activeInvoice.balanceAmount;
    const newPaid = activeInvoice.paidAmount + collectedAmt;
    const newBal = Math.max(0, activeInvoice.totalAmount - newPaid);

    const updated = invoices.map((inv) =>
      inv._id === activeInvoice._id
        ? {
            ...inv,
            paidAmount: newPaid,
            balanceAmount: newBal,
            status: newBal === 0 ? 'paid' : 'partial',
          }
        : inv
    );

    setInvoices(updated);
    setShowPayModal(false);

    const receipt = {
      receiptNumber: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today, Just Now',
      studentName: activeInvoice.studentName,
      admissionNo: activeInvoice.admissionNo,
      title: activeInvoice.title,
      amountPaid: collectedAmt,
      paymentMethod: payForm.paymentMethod,
      refNo: payForm.transactionReference || 'POS-COUNTER-CASH',
      balanceRemaining: newBal,
    };

    setActiveReceipt(receipt);
    setShowReceiptModal(true);
    toast.success(
      `Collected ₹ ${collectedAmt} from ${activeInvoice.studentName}. Receipt generated!`,
      'Payment Recorded'
    );
  };

  const filtered = invoices.filter(
    (inv) =>
      inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout allowedRoles={['Accountant', 'SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <CreditCard className="w-5 h-5 text-blue-600" /> Counter Fee POS &amp; Cash Desk
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Bursar: Shri Manoj Mishra &bull; Collect counter cash, record online UPI references, and print official fee vouchers.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.print();
              toast.success('Generated printable Daily Cash Collection ledger.', 'Print Ready');
            }}
            leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
          >
            Print POS Register
          </Button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student, invoice no, or admission ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Invoices Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Invoice No</th>
                    <th className="p-3.5">Student &amp; Class</th>
                    <th className="p-3.5">Term Description</th>
                    <th className="p-3.5 text-right">Billed (₹)</th>
                    <th className="p-3.5 text-right">Paid (₹)</th>
                    <th className="p-3.5 text-right">Balance Due</th>
                    <th className="p-3.5 text-right">POS Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((inv) => (
                    <tr key={inv._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-mono font-bold text-blue-600">{inv.invoiceNumber}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{inv.studentName}</div>
                        <div className="text-[10px] font-mono text-slate-400">{inv.admissionNo}</div>
                      </td>
                      <td className="p-3.5 text-slate-600">{inv.title}</td>
                      <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                        ₹ {inv.totalAmount.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                        ₹ {inv.paidAmount.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold">
                        {inv.balanceAmount > 0 ? (
                          <span className="text-rose-600">₹ {inv.balanceAmount.toLocaleString()}</span>
                        ) : (
                          <span className="text-emerald-600 font-black">₹ 0 (Cleared)</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        {inv.balanceAmount > 0 ? (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs"
                            onClick={() => {
                              setActiveInvoice(inv);
                              setPayForm({
                                amount: inv.balanceAmount,
                                paymentMethod: 'cash',
                                transactionReference: '',
                                notes: '',
                              });
                              setShowPayModal(true);
                            }}
                            leftIcon={<CreditCard className="w-3.5 h-3.5" />}
                          >
                            Collect POS
                          </Button>
                        ) : (
                          <span className="text-emerald-700 font-bold text-xs flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* POS Collect Modal */}
      {showPayModal && activeInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" /> Collect Fee POS: {activeInvoice.invoiceNumber}
              </h3>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCollect} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold">Student:</span>
                <p className="font-bold text-slate-900 text-sm">{activeInvoice.studentName}</p>
                <div className="flex justify-between text-[11px] pt-1">
                  <span>Balance Outstanding:</span>
                  <span className="font-mono font-bold text-rose-600">₹ {activeInvoice.balanceAmount}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Amount to Collect (₹) *</label>
                <input
                  type="number"
                  required
                  max={activeInvoice.balanceAmount}
                  value={payForm.amount}
                  onChange={(e) => setPayForm({ ...payForm, amount: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                <select
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={payForm.paymentMethod}
                  onChange={(e) => setPayForm({ ...payForm, paymentMethod: e.target.value })}
                >
                  <option value="cash">Counter Cash</option>
                  <option value="online_upi">Online UPI (GPay / PhonePe / Paytm)</option>
                  <option value="net_banking">Bank NEFT / RTGS</option>
                  <option value="cheque">Bank Cheque</option>
                </select>
              </div>

              <Input
                label="Transaction / UTR Reference (Optional)"
                placeholder="e.g. UPI-98124021"
                value={payForm.transactionReference}
                onChange={(e) => setPayForm({ ...payForm, transactionReference: e.target.value })}
              />

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold">
                  Confirm Payment
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowPayModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      {showReceiptModal && activeReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border-2 border-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                OFFICIAL PAYMENT VOUCHER
              </span>
              <button onClick={() => setShowReceiptModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs">
              <div className="text-center space-y-1 border-b border-slate-200 pb-3">
                <h2 className="font-serif font-black text-base text-slate-900">
                  सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
                </h2>
                <p className="text-[11px] text-slate-600 font-medium">
                  SHAMSABAD, FARRUKHABAD (UP) &bull; Affiliation: UP-FBD-2026-SGM-089
                </p>
                <div className="inline-block bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                  FEE COLLECTION RECEIPT
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400">Receipt No:</span>
                  <p className="font-mono font-bold text-slate-900">{activeReceipt.receiptNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400">Payment Date:</span>
                  <p className="font-bold text-slate-900">{activeReceipt.date}</p>
                </div>
                <div>
                  <span className="text-slate-400">Student Name:</span>
                  <p className="font-bold text-slate-900">{activeReceipt.studentName}</p>
                </div>
                <div>
                  <span className="text-slate-400">Admission No:</span>
                  <p className="font-mono font-bold text-slate-900">{activeReceipt.admissionNo}</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">{activeReceipt.title}</span>
                  <p className="text-[10px] text-slate-400 font-mono">Ref: {activeReceipt.refNo}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-emerald-700 text-base">
                    ₹ {activeReceipt.amountPaid.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-bold">● Recorded in POS</span>
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-bold text-slate-700 pt-1">
                <span>Remaining Balance Due:</span>
                <span className="font-mono">₹ {activeReceipt.balanceRemaining.toLocaleString()}</span>
              </div>

              <div className="pt-4 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200">
                <span>Computer Generated Official Receipt</span>
                <span className="font-bold text-slate-700">Accounts Desk / Cashier Seal</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold"
                onClick={() => {
                  window.print();
                  toast.success('Generated printable Stamped Receipt.', 'Print Ready');
                }}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print / Save PDF Receipt
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowReceiptModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
