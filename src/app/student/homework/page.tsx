'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function StudentHomeworkPage() {
  const [hw, setHw] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/homework').then((res) => {
      setHw(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Homework &amp; Assignments Desk
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          hw.map((h) => (
            <Card key={h._id} className="p-5 space-y-2">
              <h3 className="font-bold text-sm">{h.title}</h3>
              <p className="text-xs text-slate-600">{h.description}</p>
              <span className="text-[10px] text-slate-400">Due: {formatDate(h.dueDate)}</span>
            </Card>
          ))
        )}
      </div>
    </PortalLayout>
  );
}
