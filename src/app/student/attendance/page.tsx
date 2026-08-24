'use client';

import React from 'react';
import { CalendarCheck, ShieldCheck } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';

export default function StudentAttendancePage() {
  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" /> My Attendance Record
        </h1>
      </div>
      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
        <span className="text-xs font-semibold text-emerald-800 uppercase">Overall Attendance: 96.0%</span>
        <p className="text-xs text-emerald-700 flex items-center gap-1 mt-1"><ShieldCheck className="w-4 h-4" /> Fully Eligible for Board Exams</p>
      </div>
    </PortalLayout>
  );
}
