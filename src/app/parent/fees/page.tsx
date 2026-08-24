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
      term: 'Quarter 1 Tuition & Annual Development (Apr - Jun)',
      amount: '₹ 6,500',
      paidDate: '10 Apr 2026',
      mode: 'UPI / NetBanking',
      status: 'Paid',
      txnId: 'UPI-2026-9812401',
    },
    {
      receiptNo: 'REC-2026-1001-Q2',
      studentName: 'Aarav Sharma (Class 10-A)',
      term: 'Quarter 2 Tuition & Science Lab Fee (Jul - Sep)',
      amount: '₹ 5,800',
      paidDate: '08 Jul 2026',
      mode: 'Counter Cash POS',
      status: 'Paid',
      txnId: 'POS-CASH-8910',
    },
  ];

  const ananyaLedger = [
    {
      receiptNo: 'REC-2026-0704-Q1',
      studentName: 'Ananya Sharma (Class 7-B)',
      term: 'Quarter 1 Tuition & Activity Fee (Apr - Jun)',
      amount: '₹ 4,800',
      paidDate: '10 Apr 2026',
      mode: 'UPI / NetBanking',
      status: 'Paid',
      txnId: 'UPI-2026-7891234',
    },
    {
      receiptNo: 'REC-2026-0704-Q2',
      studentName: 'Ananya Sharma (Class 7-B)',
      term: 'Quarter 2 Tuition & Library Fee (Jul - Sep)',
      amount: '₹ 4,500',
      paidDate: '08 Jul 2026',
      mode: 'Counter Cash POS',
      status: 'Paid',
      txnId: 'POS-CASH-9124',
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
              Latest Receipt
            </Button>
          </div>
        </div>

        {/* Current Settlement Banner */}
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                Fee Status &bull; {currentChildName}
              </span>
              <h3 className="text-base font-black text-emerald-950 font-serif">
                ₹ 0 Outstanding Dues
              </h3>
              <p className="text-xs text-emerald-700">
                All term 1 and term 2 installments cleared and verified by Accounts Desk.
              </p>
            </div>
          </div>
          <Badge size="md" variant="success" className="font-extrabold text-xs">
            Fee Fully Cleared
          </Badge>
        </div>

        {/* Ledger Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" /> Payment History &bull; {currentChildName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3.5">Receipt Voucher</th>
                    <th className="p-3.5">Term Description</th>
                    <th className="p-3.5">Amount Paid</th>
                    <th className="p-3.5">Payment Date &amp; Mode</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Official Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {currentLedger.map((f) => (
                    <tr key={f.receiptNo} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-blue-600">{f.receiptNo}</td>
                      <td className="p-3.5 font-bold text-slate-900">{f.term}</td>
                      <td className="p-3.5 font-mono font-black text-emerald-700 text-sm">{f.amount}</td>
                      <td className="p-3.5">
                        <div>{f.paidDate}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{f.mode}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {f.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedReceipt(f)}
                          leftIcon={<Printer className="w-3.5 h-3.5 text-slate-600" />}
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
                  <p className="font-bold text-slate-900">{selectedReceipt.studentName}</p>
                </div>
                <div>
                  <span className="text-slate-400">Payer / Father:</span>
                  <p className="font-bold text-slate-900">Shri Rajesh Sharma</p>
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
