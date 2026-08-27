'use client';

import React, { useState, useEffect } from 'react';
import {
  Receipt,
  CheckCircle2,
  Download,
  Printer,
  Sparkles,
  CreditCard,
  Building2,
  Calendar,
  X,
  QrCode,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';
import { downloadElementAsPdf, printIsolatedDocument } from '../../../lib/pdf-download';

const fallbackFeeLedger = [
  {
    receiptNo: 'REC-2026-1001-Q1',
    term: 'Quarter 1 Tuition & Annual Development (Apr - Jun)',
    amount: '₹ 6,500',
    paidDate: '10 Apr 2026',
    mode: 'UPI / NetBanking',
    status: 'Paid',
    txnId: 'UPI-2026-9812401',
    breakdown: [
      { label: 'Tuition Fee (Quarter 1)', amount: '₹ 4,500' },
      { label: 'Annual Development & IT Charge', amount: '₹ 1,200' },
      { label: 'Composite Science Lab Apparatus', amount: '₹ 800' },
    ],
  },
  {
    receiptNo: 'REC-2026-1001-Q2',
    term: 'Quarter 2 Tuition & Science Lab Fee (Jul - Sep)',
    amount: '₹ 5,800',
    paidDate: '08 Jul 2026',
    mode: 'Counter Cash POS',
    status: 'Paid',
    txnId: 'POS-CASH-8910',
    breakdown: [
      { label: 'Tuition Fee (Quarter 2)', amount: '₹ 4,500' },
      { label: 'Quarterly Examination & Stationery', amount: '₹ 700' },
      { label: 'Library & Reading Room Maintenance', amount: '₹ 600' },
    ],
  },
  {
    receiptNo: 'REC-2026-1001-Q3',
    term: 'Quarter 3 Tuition & Examination Fee (Oct - Dec)',
    amount: '₹ 6,200',
    paidDate: 'Due 10 Oct 2026',
    mode: 'Pending Online Pay',
    status: 'Upcoming',
    txnId: '—',
    breakdown: [
      { label: 'Tuition Fee (Quarter 3)', amount: '₹ 4,500' },
      { label: 'Pre-Board Examination Assessment Fee', amount: '₹ 1,100' },
      { label: 'Winter Activity & Sports Meet', amount: '₹ 600' },
    ],
  },
];

export default function StudentFeesPage() {
  const [feeLedger, setFeeLedger] = useState<any[]>(fallbackFeeLedger);
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function loadStudentInvoices() {
      try {
        const res = await apiClient.get('/fees/invoices?limit=10');
        if (res.data?.data?.length) {
          const mapped = res.data.data.map((inv: any) => ({
            receiptNo: `REC-${inv.invoiceNumber.replace('INV-', '')}`,
            term: inv.title,
            amount: `₹ ${inv.totalAmount.toLocaleString()}`,
            paidDate: inv.status === 'paid' ? 'Paid (Cleared)' : `Due ${new Date(inv.dueDate).toLocaleDateString()}`,
            mode: inv.paidAmount > 0 ? 'Verified Electronic POS' : 'Pending Online Pay',
            status: inv.status === 'paid' ? 'Paid' : 'Upcoming',
            txnId: inv.invoiceNumber,
            breakdown: inv.items?.map((item: any) => ({
              label: item.categoryName,
              amount: `₹ ${item.finalAmount.toLocaleString()}`,
            })) || [],
          }));
          setFeeLedger(mapped);
        }
      } catch (err) {
        // Fallback gracefully
      }
    }
    loadStudentInvoices();
  }, []);

  const handleDownloadReceiptPdf = async () => {
    if (!selectedReceipt) return;
    setIsDownloading(true);
    toast.success(`Exporting high-resolution PDF for ${selectedReceipt.receiptNo}...`, 'Preparing Download');
    try {
      const fileName = `Fee_Receipt_${selectedReceipt.receiptNo}_Aarav_Sharma.pdf`;
      const ok = await downloadElementAsPdf('student-fee-receipt-inner', fileName);
      if (ok) {
        toast.success(`Downloaded ${fileName} successfully!`, 'Receipt Download Ready');
      } else {
        printIsolatedDocument('student-fee-receipt-inner');
      }
    } catch {
      printIsolatedDocument('student-fee-receipt-inner');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrintReceipt = () => {
    printIsolatedDocument('student-fee-receipt-inner');
    toast.success('Sent printable Fee Voucher to printer.', 'Print Isolated');
  };

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin', 'Parent', 'Admin', 'Principal', 'Accountant']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Receipt className="w-5 h-5 text-blue-600" /> Fee Vouchers &amp; Transaction Receipts
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Official institutional fee ledger, term installment receipts, and verified payment vouchers.
            </p>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 font-bold"
            onClick={() => {
              setSelectedReceipt(feeLedger[0]);
            }}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Latest Stamped Receipt
          </Button>
        </div>

        {/* Current Settlement Banner */}
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                Current Term Settlement Status
              </span>
              <h3 className="text-base font-black text-emerald-950 font-serif">
                ₹ 0 Outstanding Overdue Dues
              </h3>
              <p className="text-xs text-emerald-700">
                Aarav Sharma (Class 10-A) &bull; Admission No: SGM-2026-1001
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">All Cleared to Date</Badge>
          </div>
        </div>

        {/* Fee Ledger History Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" /> Academic Session 2026-27 Installment History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Receipt / Voucher</th>
                    <th className="py-3 px-4">Term &amp; Components</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment Date &amp; Mode</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Official Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {feeLedger.map((f, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-900">{f.receiptNo}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{f.term}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Ref ID: {f.txnId}</span>
                      </td>
                      <td className="py-3.5 px-4 font-black font-mono text-slate-900">{f.amount}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-bold block">{f.paidDate}</span>
                        <span className="text-[10px] text-slate-500">{f.mode}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        {f.status === 'Paid' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Paid &bull; Cleared
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                            <Calendar className="w-3 h-3" /> Upcoming Due
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {f.status === 'Paid' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedReceipt(f)}
                            leftIcon={<Printer className="w-3.5 h-3.5 text-slate-600" />}
                          >
                            View Receipt
                          </Button>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">Payable via POS / Online</span>
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

      {/* Official Stamped Fee Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-3.5 sm:p-6 shadow-2xl space-y-3 sm:space-y-4 animate-in zoom-in-95 duration-200 border-2 border-slate-900 my-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 sm:pb-3">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#002060] font-mono">
                OFFICIAL SGM RECEIPT VOUCHER
              </span>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Receipt Body */}
            <div id="student-fee-receipt-inner" className="printable-document p-3.5 sm:p-6 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4 text-xs">
              <div className="text-center space-y-1 border-b border-slate-200 pb-2.5 sm:pb-3">
                <h2 className="font-serif font-black text-sm sm:text-base text-slate-900">
                  सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
                </h2>
                <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium">
                  SHAMSABAD, FARRUKHABAD (UP) &bull; Affiliation Code: UP-FBD-2026-SGM-089
                </p>
                <div className="inline-block bg-[#002060] text-white text-[9px] sm:text-[10px] font-black uppercase px-2.5 sm:px-3.5 py-0.5 rounded-full mt-1">
                  OFFICIAL FEE RECEIPT VOUCHER
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[8px] sm:text-[9px] uppercase font-bold">Voucher / Receipt No:</span>
                  <p className="font-mono font-black text-blue-900 truncate">{selectedReceipt.receiptNo}</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[8px] sm:text-[9px] uppercase font-bold">Date Paid:</span>
                  <p className="font-bold text-slate-900 truncate">{selectedReceipt.paidDate}</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[8px] sm:text-[9px] uppercase font-bold">Scholar Name:</span>
                  <p className="font-bold text-slate-900 truncate">Aarav Sharma (Class 10-A)</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[8px] sm:text-[9px] uppercase font-bold">Admission ID:</span>
                  <p className="font-mono font-bold text-slate-900 truncate">SGM-2026-1001</p>
                </div>
              </div>

              {/* Itemized Fee Breakdown */}
              <div className="bg-white rounded-xl border border-slate-200 p-2.5 sm:p-3 space-y-1.5 sm:space-y-2">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-slate-500 block border-b border-slate-100 pb-1">
                  Itemized Fee Components
                </span>
                {(selectedReceipt.breakdown || [
                  { label: selectedReceipt.term, amount: selectedReceipt.amount },
                ]).map((b: any, bIdx: number) => (
                  <div key={bIdx} className="flex items-center justify-between text-[10px] sm:text-[11px]">
                    <span className="text-slate-700 font-medium truncate pr-2">{b.label}</span>
                    <span className="font-mono font-bold text-slate-900 flex-shrink-0">{b.amount}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-black text-xs">
                  <span className="text-slate-900">Total Net Amount Cleared:</span>
                  <span className="font-mono text-emerald-700 text-xs sm:text-sm">{selectedReceipt.amount}</span>
                </div>
              </div>

              {/* Official Digital Stamps & Signatures */}
              <div className="pt-2.5 sm:pt-3 flex items-end justify-between text-[9px] sm:text-[10px] border-t border-slate-200 gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <img
                    src="/images/stamps/principal-round-seal.png"
                    alt="Round Seal Muhar"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain opacity-90"
                  />
                  <div>
                    <span className="font-bold text-slate-700 block text-[10px] sm:text-xs">Institutional Seal</span>
                    <span className="text-slate-400 text-[8px] sm:text-[9px]">Shamsabad Farrukhabad</span>
                  </div>
                </div>

                <div className="text-right space-y-0.5 sm:space-y-1">
                  <img
                    src="/images/stamps/principal-signature.png"
                    alt="Accounts Officer Signature"
                    className="h-7 sm:h-8 max-w-[80px] sm:max-w-[100px] object-contain ml-auto filter contrast-125"
                  />
                  <span className="font-bold text-slate-700 block text-[10px] sm:text-xs">Accounts In-charge</span>
                  <span className="text-[7px] sm:text-[8px] text-slate-400 block font-mono truncate">TXN: {selectedReceipt.txnId}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2 pt-1.5 sm:pt-2">
              <Button
                type="button"
                className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold text-xs shadow-md"
                onClick={handleDownloadReceiptPdf}
                disabled={isDownloading}
                leftIcon={isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              >
                {isDownloading ? 'Exporting PDF...' : 'Download PDF Voucher'}
              </Button>
              <Button
                type="button"
                className="w-full sm:w-auto bg-[#002060] hover:bg-blue-900 font-bold text-xs"
                onClick={handlePrintReceipt}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print
              </Button>
              <Button type="button" variant="outline" onClick={() => setSelectedReceipt(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
