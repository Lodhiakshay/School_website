'use client';

import React from 'react';
import { Receipt, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';

export default function ParentFeesPage() {
  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
      <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <Receipt className="w-6 h-6 text-blue-600" /> Fee Receipts
      </h1>
      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl mt-4 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        <span className="text-sm font-bold text-emerald-900">All fees cleared for current term.</span>
      </div>
    </PortalLayout>
  );
}
