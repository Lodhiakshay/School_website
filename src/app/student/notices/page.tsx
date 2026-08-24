'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function StudentNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/notices').then((res) => {
      setNotices(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" /> Student Noticeboard
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          notices.map((n) => (
            <Card key={n._id} className="p-5 space-y-2">
              <h3 className="font-bold text-sm">{n.title}</h3>
              <p className="text-xs text-slate-600">{n.content}</p>
            </Card>
          ))
        )}
      </div>
    </PortalLayout>
  );
}
