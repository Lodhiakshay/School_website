'use client';

import React, { useState } from 'react';
import {
  Receipt,
  CheckCircle2,
  Printer,
  CreditCard,
  Building2,
  Sparkles,
  X,
  ShieldCheck,
  Calendar,
  Download,
  Loader2,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { downloadElementAsPdf, printIsolatedDocument } from '../../../lib/pdf-download';
import { ClientPortal } from '../../../components/ui/client-portal';

export default function ParentFeesPage() {
  const [selectedChild, setSelectedChild] = useState<'aarav' | 'ananya'>('aarav');
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const aaravLedger = [
    {
      receiptNo: 'REC-2026-1001-Q1',
      studentName: 'Aarav Sharma (Class 10-A)',
      admissionNo: 'SGM-2026-1001',
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
      studentName: 'Aarav Sharma (Class 10-A)',
      admissionNo: 'SGM-2026-1001',
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
  ];

  const ananyaLedger = [
    {
      receiptNo: 'REC-2026-0704-Q1',
      studentName: 'Ananya Sharma (Class 7-B)',
      admissionNo: 'SGM-2026-0704',
      term: 'Quarter 1 Tuition & Activity Fee (Apr - Jun)',
      amount: '₹ 4,800',
      paidDate: '10 Apr 2026',
      mode: 'UPI / NetBanking',
      status: 'Paid',
      txnId: 'UPI-2026-7891234',
      breakdown: [
        { label: 'Tuition Fee (Quarter 1)', amount: '₹ 3,800' },
        { label: 'Audio-Visual Activity & Arts', amount: '₹ 600' },
        { label: 'Smart Classroom Infrastructure', amount: '₹ 400' },
      ],
    },
    {
      receiptNo: 'REC-2026-0704-Q2',
      studentName: 'Ananya Sharma (Class 7-B)',
      admissionNo: 'SGM-2026-0704',
      term: 'Quarter 2 Tuition & Library Fee (Jul - Sep)',
      amount: '₹ 4,500',
      paidDate: '08 Jul 2026',
      mode: 'Counter Cash POS',
      status: 'Paid',
      txnId: 'POS-CASH-9124',
      breakdown: [
        { label: 'Tuition Fee (Quarter 2)', amount: '₹ 3,800' },
        { label: 'Library & Periodic Evaluation', amount: '₹ 400' },
        { label: 'Junior Science Lab Kit', amount: '₹ 300' },
      ],
    },
  ];

  const currentLedger = selectedChild === 'aarav' ? aaravLedger : ananyaLedger;
  const currentChildName = selectedChild === 'aarav' ? 'Aarav Sharma' : 'Ananya Sharma';

  const handleDownloadReceiptPdf = async () => {
    if (!selectedReceipt) return;
    setIsDownloading(true);
    toast.success(`Exporting high-resolution PDF for ${selectedReceipt.receiptNo}...`, 'Preparing Download');
    try {
      const fileName = `Fee_Receipt_${selectedReceipt.receiptNo}_${(selectedReceipt.studentName || currentChildName).replace(/\s+/g, '_')}.pdf`;
      const ok = await downloadElementAsPdf('parent-fee-receipt-inner', fileName);
      if (ok) {
        toast.success(`Downloaded ${fileName} successfully!`, 'Receipt Download Ready');
      } else {
        printIsolatedDocument('parent-fee-receipt-inner');
      }
    } catch {
      printIsolatedDocument('parent-fee-receipt-inner');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrintReceipt = () => {
    printIsolatedDocument('parent-fee-receipt-inner');
    toast.success(`Sent printable Fee Voucher for ${currentChildName} to printer.`, 'Print Isolated');
  };

  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin', 'Admin', 'Principal', 'Accountant']}>
      <div className="space-y-6">
        {/* Header Ribbon & Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Receipt className="w-5 h-5 text-blue-600" /> Child Fee Accounts &amp; Receipts
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review term installment clearances, verify bank transaction IDs, and print official fee vouchers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedChild('aarav')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedChild === 'aarav' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Aarav (Class 10)
              </button>
              <button
                type="button"
                onClick={() => setSelectedChild('ananya')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedChild === 'ananya' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Ananya (Class 7)
              </button>
            </div>

            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setSelectedReceipt(currentLedger[0])}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Latest Stamped Receipt
            </Button>
          </div>
        </div>

        {/* Current Child Dues Clearance Banner */}
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                Clearance Status &bull; {currentChildName}
              </span>
              <h3 className="text-base font-black text-emerald-950 font-serif">
                ₹ 0 Outstanding Dues for Q1 &amp; Q2
              </h3>
              <p className="text-xs text-emerald-700">
                All term receipts stamped &bull; Next installment (Q3) payable by 10 Oct 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">Cleared</Badge>
          </div>
        </div>

        {/* Ledger Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-black text-slate-900 font-serif">
                Fee Receipts &amp; Payment Ledger ({currentChildName})
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Click "Download PDF Voucher" or "View Voucher" to export official stamped receipts.
              </p>
            </div>
            <Badge variant="outline" className="text-xs bg-white text-emerald-700 font-bold">
              Account Status: Clear
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Receipt #</th>
                    <th className="p-3.5">Fee Installment</th>
                    <th className="p-3.5">Date Paid</th>
                    <th className="p-3.5">Mode</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Official Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {currentLedger.map((tx: any) => (
                    <tr key={tx.receiptNo} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-blue-700">{tx.receiptNo}</td>
                      <td className="p-3.5 font-bold text-slate-900">{tx.term}</td>
                      <td className="p-3.5 text-slate-600">{tx.paidDate}</td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px]">
                          {tx.mode}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-black text-slate-900">{tx.amount}</td>
                      <td className="p-3.5">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 font-bold text-xs"
                          onClick={() => setSelectedReceipt(tx)}
                          leftIcon={<Printer className="w-3.5 h-3.5" />}
                        >
                          View Voucher
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
      {selectedReceipt && (
        <ClientPortal>
          <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto w-full h-full min-h-screen">
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
              <div id="parent-fee-receipt-inner" className="printable-document p-3.5 sm:p-6 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4 text-xs">
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
                    <p className="font-bold text-slate-900 truncate">{selectedReceipt.studentName}</p>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[8px] sm:text-[9px] uppercase font-bold">Admission ID:</span>
                    <p className="font-mono font-bold text-slate-900 truncate">{selectedReceipt.admissionNo}</p>
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
        </ClientPortal>
      )}
    </PortalLayout>
  );
}
