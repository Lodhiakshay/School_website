'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

export default function StudentFeesPage() {
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const { toast } = useToast();

  const feeLedger = [
    {
      receiptNo: 'REC-2026-1001-Q1',
      term: 'Quarter 1 Tuition & Annual Development (Apr - Jun)',
      amount: '₹ 6,500',
      paidDate: '10 Apr 2026',
      mode: 'UPI / NetBanking',
      status: 'Paid',
      txnId: 'UPI-2026-9812401',
    },
    {
      receiptNo: 'REC-2026-1001-Q2',
      term: 'Quarter 2 Tuition & Science Lab Fee (Jul - Sep)',
      amount: '₹ 5,800',
      paidDate: '08 Jul 2026',
      mode: 'Counter Cash POS',
      status: 'Paid',
      txnId: 'POS-CASH-8910',
    },
    {
      receiptNo: 'REC-2026-1001-Q3',
      term: 'Quarter 3 Tuition & Examination Fee (Oct - Dec)',
      amount: '₹ 6,200',
      paidDate: 'Due 10 Oct 2026',
      mode: 'Pending Online Pay',
      status: 'Upcoming',
      txnId: '—',
    },
  ];

  const handlePrintReceipt = () => {
    window.print();
    toast.success('Generated printable Official Fee Receipt PDF.', 'Receipt Ready');
  };

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin', 'Parent']}>
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
          <Badge size="md" variant="success" className="font-extrabold text-xs">
            Term 1 &amp; 2 Cleared
          </Badge>
        </div>

        {/* Transactions Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" /> Academic Session 2026-27 Installment History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3.5">Receipt Voucher</th>
                    <th className="p-3.5">Term Description</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Payment Date / Mode</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Receipt Voucher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {feeLedger.map((f) => (
                    <tr key={f.receiptNo} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-blue-600">{f.receiptNo}</td>
                      <td className="p-3.5 font-bold text-slate-900">{f.term}</td>
                      <td className="p-3.5 font-mono font-black text-slate-900 text-sm">{f.amount}</td>
                      <td className="p-3.5">
                        <div>{f.paidDate}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{f.mode}</div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                            f.status === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border-amber-200'
                          }`}
                        >
                          {f.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
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
                          <span className="text-[11px] text-slate-400 italic">Payable via POS</span>
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border-2 border-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                OFFICIAL PAYMENT VOUCHER
              </span>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Receipt Body */}
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
                  <p className="font-mono font-bold text-slate-900">{selectedReceipt.receiptNo}</p>
                </div>
                <div>
                  <span className="text-slate-400">Date Paid:</span>
                  <p className="font-bold text-slate-900">{selectedReceipt.paidDate}</p>
                </div>
                <div>
                  <span className="text-slate-400">Student:</span>
                  <p className="font-bold text-slate-900">Aarav Sharma (Class 10-A)</p>
                </div>
                <div>
                  <span className="text-slate-400">Admission ID:</span>
                  <p className="font-mono font-bold text-slate-900">SGM-2026-1001</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">{selectedReceipt.term}</span>
                  <p className="text-[10px] text-slate-400 font-mono">Txn: {selectedReceipt.txnId}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-emerald-700 text-base">
                    {selectedReceipt.amount}
                  </span>
                  <span className="block text-[10px] text-emerald-600 font-bold">● Cleared</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200">
                <span>Computer Generated Official Voucher</span>
                <span className="font-bold text-slate-700">Accounts Desk / Cashier Seal</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold"
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
