'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Printer, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatCurrency, formatDate } from '../../../lib/utils';

export default function AccountantCollectPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInvoice, setActiveInvoice] = useState<any>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [payForm, setPayForm] = useState({
    amount: 0,
    paymentMethod: 'cash',
    transactionReference: '',
    notes: '',
  });

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/fees/invoices');
      setInvoices(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleCollect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInvoice) return;
    setIsSubmitting(true);
    try {
      const res = await apiClient.post('/fees/payments/collect', {
        invoiceId: activeInvoice._id,
        amount: Number(payForm.amount),
        paymentMethod: payForm.paymentMethod,
        transactionReference: payForm.transactionReference,
        notes: payForm.notes,
      });
      setShowPayModal(false);
      setActiveReceipt(res.data.data);
      setShowReceiptModal(true);
      fetchInvoices();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to collect payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PortalLayout allowedRoles={['Accountant', 'SuperAdmin', 'Admin']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" /> Fee Collection POS Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Collect counter cash, record online UPI / bank references, and generate stamped receipts.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner label="Loading pending fee vouchers..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3.5">Invoice No</th>
                    <th className="px-4 py-3.5">Student Name</th>
                    <th className="px-4 py-3.5">Term Title</th>
                    <th className="px-4 py-3.5">Billed Amount</th>
                    <th className="px-4 py-3.5">Paid</th>
                    <th className="px-4 py-3.5">Balance Due</th>
                    <th className="px-4 py-3.5 text-right">POS Collection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {invoices.map((inv) => (
                    <tr key={inv._id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{inv.invoiceNumber}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {inv.studentId?.firstName} {inv.studentId?.lastName}
                      </td>
                      <td className="px-4 py-3">{inv.title}</td>
                      <td className="px-4 py-3 font-bold">{formatCurrency(inv.totalAmount)}</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">{formatCurrency(inv.paidAmount)}</td>
                      <td className="px-4 py-3 font-bold text-rose-600">{formatCurrency(inv.balanceAmount)}</td>
                      <td className="px-4 py-3 text-right">
                        {inv.balanceAmount > 0 ? (
                          <Button
                            size="sm"
                            variant="primary"
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
                          >
                            Collect POS
                          </Button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-600 flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* POS Modal */}
      {activeInvoice && (
        <Modal
          isOpen={showPayModal}
          onClose={() => setShowPayModal(false)}
          title={`Collect Fee POS: ${activeInvoice.invoiceNumber}`}
          description={`Student: ${activeInvoice.studentId?.firstName} ${activeInvoice.studentId?.lastName} • Due: ${formatCurrency(activeInvoice.balanceAmount)}`}
          maxWidth="md"
        >
          <form onSubmit={handleCollect} className="space-y-4">
            <Input
              label="Amount to Collect (₹)"
              type="number"
              required
              max={activeInvoice.balanceAmount}
              value={payForm.amount}
              onChange={(e) => setPayForm({ ...payForm, amount: Number(e.target.value) })}
            />
            <Select
              label="Payment Method"
              options={[
                { value: 'cash', label: 'Cash at Counter' },
                { value: 'online_upi', label: 'Online UPI (GPay/PhonePe/Paytm)' },
                { value: 'net_banking', label: 'Net Banking' },
                { value: 'cheque', label: 'Bank Cheque' },
                { value: 'dd', label: 'Demand Draft (DD)' },
              ]}
              value={payForm.paymentMethod}
              onChange={(e) => setPayForm({ ...payForm, paymentMethod: e.target.value })}
            />
            <Input
              label="Reference / UTR Number"
              placeholder="e.g. UPI-92384729"
              value={payForm.transactionReference}
              onChange={(e) => setPayForm({ ...payForm, transactionReference: e.target.value })}
            />
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setShowPayModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="success" isLoading={isSubmitting}>
                Record Payment
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Receipt Modal */}
      {activeReceipt && (
        <Modal
          isOpen={showReceiptModal}
          onClose={() => setShowReceiptModal(false)}
          title="Official Fee Payment Receipt"
          maxWidth="md"
        >
          <div className="p-6 bg-white border-2 border-slate-800 rounded-2xl space-y-4 text-xs">
            <div className="text-center border-b-2 border-slate-800 pb-3">
              <h2 className="text-sm font-black tracking-wider uppercase">SARSWATI GYAN MANDIR</h2>
              <p className="text-[10px] text-slate-600">Shamsabad, Farrukhabad (UP)</p>
              <span className="inline-block mt-1 font-bold text-xs bg-slate-100 px-2 py-0.5 rounded border uppercase">
                Fee Payment Receipt
              </span>
            </div>
            <div className="flex justify-between font-mono text-[11px] pb-2 border-b border-slate-200">
              <div>Receipt No: <strong>{activeReceipt.receiptNumber}</strong></div>
              <div>Date: <strong>{formatDate(activeReceipt.payment?.paymentDate)}</strong></div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-bold text-emerald-700">{formatCurrency(activeReceipt.payment?.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-semibold uppercase">{activeReceipt.payment?.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span>Remaining Balance:</span>
                <span className="font-bold">{formatCurrency(activeReceipt.invoice?.balanceAmount)}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowReceiptModal(false)}>
              Close
            </Button>
            <Button size="sm" variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>
              Print Receipt
            </Button>
          </div>
        </Modal>
      )}
    </PortalLayout>
  );
}

