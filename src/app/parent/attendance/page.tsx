'use client';

import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';

export default function ParentAttendancePage() {
  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
      <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <CalendarCheck className="w-6 h-6 text-blue-600" /> Child Attendance Record
      </h1>
      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl mt-4">
        <span className="font-bold text-sm text-emerald-900">Aarav Sharma Attendance: 96.0% (Present)</span>
      </div>
    </PortalLayout>
  );
}
