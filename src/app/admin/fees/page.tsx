'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Printer,
  CheckCircle2,
  Search,
  Plus,
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

const fallbackInvoices = [
  {
    _id: 'inv_01',
    invoiceNumber: 'INV-2026-1001',
    studentName: 'Aarav Sharma',
    className: 'Class 10 (Section A)',
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
    studentName: 'Ananya Gupta',
    className: 'Class 10 (Section A)',
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
    studentName: 'Rohan Sharma',
    className: 'Class 12 (Section PCM)',
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
    studentName: 'Divyanshu Singh',
    className: 'Class 10 (Section A)',
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
    studentName: 'Priya Singh',
    className: 'Class 11 (Section PCB)',
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
    studentName: 'Harsh Mishra',
    className: 'Class 9 (Section A)',
    admissionNo: 'SGM-2026-0901',
    title: 'Quarter 2 Tuition & IT Lab Fee',
    totalAmount: 5200,
    paidAmount: 0,
    balanceAmount: 5200,
    status: 'unpaid',
  },
];

export default function FeesAdminPage() {
  const [invoices, setInvoices] = useState<any[]>(fallbackInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);
  const { toast } = useToast();

  const filtered = invoices.filter(
    (inv) =>
      inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.admissionNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Accountant']}>
      <div className="space-y-6 pt-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <CreditCard className="w-5 h-5 text-blue-600" /> Fees, Invoicing &amp; Collection POS
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage term installments, collect counter payments, and generate official stamped fee receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Fee Register.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Register
            </Button>
          </div>
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

        {/* Mobile Scroll Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 sm:hidden px-1">
          <span>👉 Swipe table sideways to view balance &amp; receipts</span>
        </div>

        {/* Invoices Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-extrabold tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3.5">Invoice No</th>
                    <th className="px-4 py-3.5">Student Name</th>
                    <th className="px-4 py-3.5">Fee Particulars</th>
                    <th className="px-4 py-3.5 text-right">Total Billed</th>
                    <th className="px-4 py-3.5 text-right">Amount Paid</th>
                    <th className="px-4 py-3.5 text-right">Balance Due</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Fee Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((inv) => (
                    <tr key={inv._id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {inv.invoiceNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{inv.studentName}</div>
                        <div className="text-[10px] text-slate-400">{inv.className}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{inv.title}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                        ₹ {inv.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                        ₹ {inv.paidAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold whitespace-nowrap">
                        {inv.balanceAmount > 0 ? (
                          <span className="text-rose-600">₹ {inv.balanceAmount.toLocaleString()}</span>
                        ) : (
                          <span className="text-emerald-600 font-black">₹ 0 (Cleared)</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                            inv.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : inv.status === 'partial'
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-rose-100 text-rose-800 border-rose-200'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Printer className="w-3.5 h-3.5 text-slate-600" />}
                          onClick={() => setActiveReceipt(inv)}
                        >
                          Print Voucher
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Official Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border-2 border-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                OFFICIAL PAYMENT VOUCHER
              </span>
              <button onClick={() => setActiveReceipt(null)} className="text-slate-400 hover:text-slate-600 p-1">
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
                  <p className="font-mono font-bold text-slate-900">{activeReceipt.invoiceNumber}</p>
                </div>
                <div>
                  <span className="text-slate-400">Payment Date:</span>
                  <p className="font-bold text-slate-900">Today, 2026</p>
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
                  <p className="text-[10px] text-slate-400 font-mono">Status: {activeReceipt.status.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-emerald-700 text-base">
                    ₹ {activeReceipt.totalAmount.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-bold">● Recorded in POS</span>
                </div>
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
              <Button type="button" variant="outline" onClick={() => setActiveReceipt(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
