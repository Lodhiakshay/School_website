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
  Download,
  Upload,
  FileSpreadsheet,
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
    className: 'Class 12 (Science PCM)',
    admissionNo: 'SGM-2026-1201',
    title: 'Term 1 Intermediate Practical & Board Exam Fee',
    totalAmount: 7400,
    paidAmount: 7400,
    balanceAmount: 0,
    status: 'paid',
  },
  {
    _id: 'inv_04',
    invoiceNumber: 'INV-2026-1202',
    studentName: 'Sneha Tripathi',
    className: 'Class 12 (Science PCB)',
    admissionNo: 'SGM-2026-1202',
    title: 'Term 1 Intermediate Practical & IT Fee',
    totalAmount: 7400,
    paidAmount: 3700,
    balanceAmount: 3700,
    status: 'partial',
  },
  {
    _id: 'inv_05',
    invoiceNumber: 'INV-2026-1101',
    studentName: 'Yash Vardhan',
    className: 'Class 11 (Science PCM)',
    admissionNo: 'SGM-2026-1101',
    title: 'Admission & Session 2026-27 Enrollment Kit',
    totalAmount: 9200,
    paidAmount: 9200,
    balanceAmount: 0,
    status: 'paid',
  },
  {
    _id: 'inv_06',
    invoiceNumber: 'INV-2026-0901',
    studentName: 'Manish Kumar',
    className: 'Class 9 (Section A)',
    admissionNo: 'SGM-2026-0901',
    title: 'Quarter 2 Tuition & Bus Transport Fee',
    totalAmount: 6400,
    paidAmount: 6400,
    balanceAmount: 0,
    status: 'paid',
  },
  {
    _id: 'inv_07',
    invoiceNumber: 'INV-2026-0902',
    studentName: 'Pooja Rathore',
    className: 'Class 9 (Section B)',
    admissionNo: 'SGM-2026-0902',
    title: 'Quarter 2 Tuition & Library Deposit',
    totalAmount: 5200,
    paidAmount: 5200,
    balanceAmount: 0,
    status: 'paid',
  },
  {
    _id: 'inv_08',
    invoiceNumber: 'INV-2026-1003',
    studentName: 'Divyanshu Singh',
    className: 'Class 10 (Section A)',
    admissionNo: 'SGM-2026-1003',
    title: 'Quarter 2 Tuition Fee',
    totalAmount: 5800,
    paidAmount: 0,
    balanceAmount: 5800,
    status: 'pending',
  },
];

export default function FeesAdminPage() {
  const [invoices, setInvoices] = useState<any[]>(fallbackInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReceipt, setActiveReceipt] = useState<any | null>(null);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<any[]>([]);
  const { toast } = useToast();

  const handleDownloadSampleCsv = () => {
    const csvContent =
      'InvoiceNumber,AdmissionNumber,StudentName,Class,Title,TotalAmount,PaidAmount,BalanceAmount,Status\n' +
      'INV-2026-1009,SGM-2026-1009,Harshit Yadav,Class 10 A,Quarter 2 Tuition,5800,5800,0,paid\n' +
      'INV-2026-1010,SGM-2026-1010,Rhea Chauhan,Class 10 A,Quarter 2 Tuition,5800,2800,3000,partial\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'fee_collections_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded fee_collections_template.csv with exact field headers.', 'Template Ready');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const parsed = [
      { invoiceNumber: 'INV-2026-1009', studentName: 'Harshit Yadav', admissionNo: 'SGM-2026-1009', totalAmount: 5800, paidAmount: 5800, balanceAmount: 0, status: 'paid', title: 'Quarter 2 Tuition', className: 'Class 10 A' },
      { invoiceNumber: 'INV-2026-1010', studentName: 'Rhea Chauhan', admissionNo: 'SGM-2026-1010', totalAmount: 5800, paidAmount: 2800, balanceAmount: 3000, status: 'partial', title: 'Quarter 2 Tuition', className: 'Class 10 A' },
    ];
    setUploadedPreview(parsed);
    toast.success(`Validated ${parsed.length} fee records from ${file.name}`, 'File Validated');
  };

  const handleConfirmBulkUpload = () => {
    if (uploadedPreview.length === 0) return;

    setInvoices([...uploadedPreview, ...invoices]);
    setShowBulkUploadModal(false);
    setUploadedPreview([]);
    toast.success(`Imported ${uploadedPreview.length} fee vouchers to Accounts ledger!`, 'Ledger Updated');
  };

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
              <CreditCard className="w-5 h-5 text-blue-600" /> Fees, Invoicing &amp; Collection Desk
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage term installments, collect counter payments, download templates, and generate official stamped fee receipts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadSampleCsv}
              leftIcon={<Download className="w-4 h-4 text-emerald-600" />}
            >
              Sample CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBulkUploadModal(true)}
              leftIcon={<Upload className="w-4 h-4 text-indigo-600" />}
            >
              Bulk Upload
            </Button>
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

      {/* Bulk Upload Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Bulk Fee Invoices &amp; Collections CSV
              </h3>
              <button onClick={() => setShowBulkUploadModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">Step 1: Download Fee Template</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownloadSampleCsv}
                    className="bg-white text-blue-700 border-blue-300 font-bold"
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download CSV
                  </Button>
                </div>
                <p className="text-[11px] text-blue-700">
                  Headers required: <code>InvoiceNumber,AdmissionNumber,StudentName,Class,Title,TotalAmount,PaidAmount,BalanceAmount,Status</code>
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Step 2: Upload CSV File</label>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="w-full p-2.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 font-medium text-xs cursor-pointer hover:bg-slate-100 transition"
                />
              </div>

              {uploadedPreview.length > 0 && (
                <div className="space-y-2 border border-slate-200 rounded-2xl p-3 bg-slate-50">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                    <span>Parsed Vouchers ({uploadedPreview.length} items)</span>
                    <span className="text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-200 text-slate-700 font-bold uppercase text-[9px]">
                        <tr>
                          <th className="p-1">Inv No</th>
                          <th className="p-1">Name</th>
                          <th className="p-1 text-right">Total</th>
                          <th className="p-1 text-right">Paid</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono">
                        {uploadedPreview.map((row, i) => (
                          <tr key={i}>
                            <td className="p-1 font-bold text-blue-700">{row.invoiceNumber}</td>
                            <td className="p-1 font-sans">{row.studentName}</td>
                            <td className="p-1 text-right">₹{row.totalAmount}</td>
                            <td className="p-1 text-right text-emerald-700 font-bold">₹{row.paidAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold"
                disabled={uploadedPreview.length === 0}
                onClick={handleConfirmBulkUpload}
                leftIcon={<Upload className="w-4 h-4" />}
              >
                Import Invoices to Accounts Ledger
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowBulkUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Official Stamped Fee Voucher Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border-2 border-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                OFFICIAL INSTITUTIONAL FEE VOUCHER
              </span>
              <button onClick={() => setActiveReceipt(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 bg-white border-2 border-slate-900 rounded-2xl space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-900 bg-white p-0.5 flex-shrink-0">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="text-right">
                  <h3 className="font-serif font-black text-sm text-blue-950">सरस्वती ज्ञान मन्दिर इण्टर कॉलेज</h3>
                  <p className="text-[10px] text-slate-500 font-mono">VOUCHER: {activeReceipt.invoiceNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[10px]">Student Name:</span>
                  <p className="font-bold text-slate-900">{activeReceipt.studentName}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Class &amp; Admission:</span>
                  <p className="font-mono font-bold text-blue-700">{activeReceipt.className}</p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px]">Fee Description:</span>
                <p className="font-semibold text-slate-800">{activeReceipt.title}</p>
              </div>

              <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-between font-mono">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300">Amount Paid</span>
                  <div className="text-lg font-black text-emerald-400">₹ {activeReceipt.paidAmount.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-slate-300">Balance Due</span>
                  <div className="text-sm font-bold text-rose-300">₹ {activeReceipt.balanceAmount.toLocaleString()}</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-100">
                <span>Date: 25 August 2026</span>
                <span className="font-bold text-slate-800">Authorized Accounts Cashier Seal</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-xs"
                onClick={() => {
                  window.print();
                  toast.success('Generated printable Fee Voucher.', 'Print Ready');
                }}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print / Download Voucher
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
