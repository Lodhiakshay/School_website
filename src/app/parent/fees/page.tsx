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
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

export default function ParentFeesPage() {
  const [selectedChild, setSelectedChild] = useState<'aarav' | 'ananya'>('aarav');
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
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

  const handlePrintReceipt = () => {
    window.print();
    toast.success(`Generated printable Official Fee Receipt for ${currentChildName}.`, 'Receipt Ready');
  };

  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
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
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" /> Transaction Ledger for {currentChildName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Receipt No</th>
                    <th className="py-3 px-4">Term &amp; Scope</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Date Paid</th>
                    <th className="py-3 px-4">Mode</th>
                    <th className="py-3 px-4 text-right">Official Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {currentLedger.map((f, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-900">{f.receiptNo}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{f.term}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Ref ID: {f.txnId}</span>
                      </td>
                      <td className="py-3.5 px-4 font-black font-mono text-slate-900">{f.amount}</td>
                      <td className="py-3.5 px-4">{f.paidDate}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono text-[10px]">
                          {f.mode}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedReceipt(f)}
                          leftIcon={<Printer className="w-3.5 h-3.5 text-slate-600" />}
                        >
                          View Receipt
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

      {/* Official Stamped Fee Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border-2 border-slate-900 my-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> OFFICIAL INSTITUTIONAL PAYMENT VOUCHER
              </span>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Receipt Body */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs">
              <div className="text-center space-y-1 border-b border-slate-200 pb-3">
                <h2 className="font-serif font-black text-base text-slate-900">
                  सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
                </h2>
                <p className="text-[10px] text-slate-600 font-medium">
                  SHAMSABAD, FARRUKHABAD (UP) &bull; Affiliation Code: UP-FBD-2026-SGM-089
                </p>
                <div className="inline-block bg-[#002060] text-white text-[10px] font-black uppercase px-3.5 py-0.5 rounded-full mt-1">
                  OFFICIAL FEE RECEIPT VOUCHER
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Voucher / Receipt No:</span>
                  <p className="font-mono font-black text-blue-900">{selectedReceipt.receiptNo}</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Date Paid:</span>
                  <p className="font-bold text-slate-900">{selectedReceipt.paidDate}</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Scholar Name:</span>
                  <p className="font-bold text-slate-900">{selectedReceipt.studentName}</p>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Admission ID:</span>
                  <p className="font-mono font-bold text-slate-900">{selectedReceipt.admissionNo || 'SGM-2026-1001'}</p>
                </div>
              </div>

              {/* Itemized Fee Breakdown */}
              <div className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-500 block border-b border-slate-100 pb-1">
                  Itemized Fee Components
                </span>
                {(selectedReceipt.breakdown || [
                  { label: selectedReceipt.term, amount: selectedReceipt.amount },
                ]).map((b: any, bIdx: number) => (
                  <div key={bIdx} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-700 font-medium">{b.label}</span>
                    <span className="font-mono font-bold text-slate-900">{b.amount}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-black text-xs">
                  <span className="text-slate-900">Total Net Amount Cleared:</span>
                  <span className="font-mono text-emerald-700 text-sm">{selectedReceipt.amount}</span>
                </div>
              </div>

              {/* Official Digital Stamps & Signatures */}
              <div className="pt-3 flex items-end justify-between text-[10px] border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <img
                    src="/images/stamps/principal-round-seal.png"
                    alt="Round Seal Muhar"
                    className="w-12 h-12 object-contain opacity-90"
                  />
                  <div>
                    <span className="font-bold text-slate-700 block">Institutional Seal</span>
                    <span className="text-slate-400 text-[9px]">Shamsabad Farrukhabad</span>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <img
                    src="/images/stamps/principal-signature.png"
                    alt="Accounts Officer Signature"
                    className="h-8 max-w-[100px] object-contain ml-auto filter contrast-125"
                  />
                  <span className="font-bold text-slate-700 block">Accounts In-charge</span>
                  <span className="text-[8px] text-slate-400 block font-mono">TXN: {selectedReceipt.txnId}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                className="w-full bg-[#002060] hover:bg-blue-900 font-bold"
                onClick={handlePrintReceipt}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print / Save PDF Receipt
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
