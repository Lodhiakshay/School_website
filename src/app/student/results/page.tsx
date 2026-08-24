'use client';

import React from 'react';
import { Award, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Button } from '../../../components/ui/button';

export default function StudentResultsPage() {
  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Unit Test 1 Progress Report
        </h1>
        <Button size="sm" variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>Print</Button>
      </div>
      <div className="p-8 bg-white border-2 border-slate-800 rounded-2xl space-y-4">
        <div className="text-center">
          <h2 className="font-black text-sm uppercase">SARSWATI GYAN MANDIR</h2>
          <p className="text-xs text-slate-600">Unit Test 1 Report Card • Aarav Sharma (Class 10A)</p>
          <div className="text-lg font-black text-emerald-700 mt-2">Rank #1 • 87.33% (Grade A1)</div>
        </div>
      </div>
    </PortalLayout>
  );
}
