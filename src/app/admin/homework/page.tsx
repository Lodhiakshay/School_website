'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';

export default function HomeworkAdminPage() {
  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Homework &amp; LMS
        </h1>
      </div>
      <Card className="p-6">
        <p className="text-xs text-slate-600">Homework and digital study assignments roster.</p>
      </Card>
    </PortalLayout>
  );
}
