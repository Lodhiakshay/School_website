'use client';

import React from 'react';
import { Receipt, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';

export default function StudentFeesPage() {
  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Receipt className="w-6 h-6 text-blue-600" /> Fee Vouchers &amp; Receipts
        </h1>
      </div>
      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        <div>
          <h3 className="font-bold text-sm text-emerald-900">Current Balance: ₹ 0 (Paid)</h3>
          <p className="text-xs text-emerald-700">Quarter 1 &amp; 2 tuition fees cleared.</p>
        </div>
      </div>
    </PortalLayout>
  );
}
