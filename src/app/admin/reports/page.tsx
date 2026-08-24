'use client';

import React from 'react';
import { BarChart3, Download, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export default function ReportsAdminPage() {
  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" /> Central Reports &amp; Ledgers
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 space-y-3">
          <h3 className="font-bold text-sm">Student Enrollment Master Ledger</h3>
          <p className="text-xs text-slate-500">Export student registrations and class roll-lists.</p>
          <Button size="sm" variant="outline" leftIcon={<Printer className="w-3.5 h-3.5" />} onClick={() => window.print()}>Print Ledger</Button>
        </Card>
        <Card className="p-5 space-y-3">
          <h3 className="font-bold text-sm">Fee Collection &amp; Cash Statement</h3>
          <p className="text-xs text-slate-500">Export financial payments and outstanding dues.</p>
          <Button size="sm" variant="outline" leftIcon={<Printer className="w-3.5 h-3.5" />} onClick={() => window.print()}>Print Ledger</Button>
        </Card>
      </div>
    </PortalLayout>
  );
}
