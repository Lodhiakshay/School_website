'use client';

import React from 'react';
import { Award, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Button } from '../../../components/ui/button';

export default function ParentResultsPage() {
  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Child Report Card
        </h1>
        <Button size="sm" variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>Print</Button>
      </div>
      <div className="p-6 bg-white border rounded-2xl mt-4 space-y-2">
        <h3 className="font-bold">Aarav Sharma &bull; Class 10A</h3>
        <p className="text-sm text-emerald-700 font-bold">Rank #1 (87.33% - Grade A1)</p>
      </div>
    </PortalLayout>
  );
}
