'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function NoticesAdminPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/notices').then((res) => {
      setNotices(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" /> Noticeboard &amp; Alerts
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          notices.map((n) => (
            <Card key={n._id} className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <Badge size="sm" variant="info">{n.priority}</Badge>
                <span className="text-[10px] text-slate-400">{formatDate(n.publishDate)}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-600">{n.content}</p>
            </Card>
          ))
        )}
      </div>
    </PortalLayout>
  );
}
