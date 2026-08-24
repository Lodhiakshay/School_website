'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Printer, Plus, Search, Receipt } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatCurrency, formatDate } from '../../../lib/utils';

export default function FeesAdminPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInvoice, setActiveInvoice] = useState<any>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  useEffect(() => {
    apiClient.get('/fees/invoices').then((res) => {
      setInvoices(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Accountant']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-700" /> Fees, Invoicing &amp; Collection POS
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage fee structures, issue term vouchers, and print official fee receipts.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner label="Loading fee ledgers and invoices..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3.5">Invoice No</th>
                    <th className="px-4 py-3.5">Student Name</th>
                    <th className="px-4 py-3.5">Fee Particulars</th>
                    <th className="px-4 py-3.5">Total Billed</th>
                    <th className="px-4 py-3.5">Amount Paid</th>
                    <th className="px-4 py-3.5">Balance Due</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Fee Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {invoices.map((inv) => (
                    <tr key={inv._id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700">{inv.invoiceNumber}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{inv.studentId?.firstName} {inv.studentId?.lastName}</td>
                      <td className="px-4 py-3">{inv.title || 'Quarter 1 Tuition & Lab Fee'}</td>
                      <td className="px-4 py-3 font-black text-slate-900">{formatCurrency(inv.totalAmount || 4500)}</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">{formatCurrency(inv.paidAmount || 4500)}</td>
                      <td className="px-4 py-3 font-bold text-rose-600">{formatCurrency(inv.balanceAmount || 0)}</td>
                      <td className="px-4 py-3">
                        <Badge size="sm" variant={inv.status === 'paid' ? 'success' : 'warning'}>
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="font-bold border-blue-600 text-blue-700 hover:bg-blue-50"
                          leftIcon={<Printer className="w-3.5 h-3.5" />}
                          onClick={() => {
                            setActiveInvoice(inv);
                            setShowReceiptModal(true);
                          }}
                        >
                          Print Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Official Printable Fee Receipt Modal */}
      {activeInvoice && (
        <Modal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} title="Official Fee Collection Receipt" maxWidth="md">
          <div
            id="printable-fee-receipt"
            className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-900 text-slate-900 font-sans"
            style={{ borderColor: '#002060' }}
          >
            {/* Navy Blue & Gold Header */}
            <div
              className="px-4 py-3 flex items-center gap-3 text-white border-b-2 border-amber-400"
              style={{ backgroundColor: '#002060' }}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-white shadow-md flex-shrink-0">
                <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black tracking-wide uppercase font-serif text-amber-300 leading-tight">
                  सरस्वती ज्ञान मन्दिर
                </h3>
                <p className="text-[10px] text-white font-extrabold tracking-wider uppercase leading-tight">
                  SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE
                </p>
                <p className="text-[9px] text-blue-200 font-semibold leading-tight">
                  शमसाबाद, फर्रुखाबाद (उ०प्र०) • Official Payment Voucher
                </p>
              </div>
            </div>

            {/* Receipt Meta & Breakdown */}
            <div className="p-5 space-y-4 bg-slate-50/50">
              <div className="flex justify-between text-xs border-b border-slate-200 pb-2">
                <div>
                  <span className="text-slate-500 font-semibold">Receipt No: </span>
                  <strong className="font-mono text-blue-900">{activeInvoice.invoiceNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Date: </span>
                  <strong>{formatDate(activeInvoice.createdAt || new Date())}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-500 text-[11px]">Student Name:</span>
                  <p className="font-black text-slate-900">{activeInvoice.studentId?.firstName} {activeInvoice.studentId?.lastName}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Admission No:</span>
                  <p className="font-mono font-bold text-blue-900">{activeInvoice.studentId?.admissionNumber || 'SGM-2026-0001'}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Class:</span>
                  <p className="font-bold text-slate-800">Class 10 (Section A)</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Payment Mode:</span>
                  <p className="font-bold text-emerald-700 uppercase">Cash / UPI Confirmed</p>
                </div>
              </div>

              {/* Particulars Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Particulars</th>
                      <th className="p-2.5 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr>
                      <td className="p-2.5 text-slate-800">Monthly Tuition Fee (Term 1)</td>
                      <td className="p-2.5 text-right font-bold">₹3,000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-800">Science Laboratory &amp; Computer Fee</td>
                      <td className="p-2.5 text-right font-bold">₹1,000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-800">Examination &amp; Maintenance Charge</td>
                      <td className="p-2.5 text-right font-bold">₹500</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-blue-50 border-t-2 border-slate-300 font-black text-blue-950">
                    <tr>
                      <td className="p-2.5 uppercase">Total Paid Amount:</td>
                      <td className="p-2.5 text-right text-sm text-emerald-700">{formatCurrency(activeInvoice.paidAmount || 4500)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Signatures */}
              <div className="pt-6 flex justify-between items-center text-[10px] text-slate-600">
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <span>Accountant Signature</span>
                </div>
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <span className="font-bold text-blue-950">Authorized Cashier Seal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowReceiptModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition shadow-sm"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2 rounded-xl text-xs font-black text-white bg-blue-700 hover:bg-blue-800 transition shadow-md shadow-blue-700/30 flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Print Official Receipt
            </button>
          </div>
        </Modal>
      )}
    </PortalLayout>
  );
}
