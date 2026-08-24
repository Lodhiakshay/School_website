'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';

export default function TeacherTimetablePage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" /> My Teaching Schedule
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((d) => (
          <Card key={d} className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase">{d}</h4>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">Period 1: Mathematics (Class 10A) • 08:00 AM - 08:40 AM</div>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">Period 3: Mathematics (Class 9A) • 09:20 AM - 10:00 AM</div>
          </Card>
        ))}
      </div>
    </PortalLayout>
  );
}
