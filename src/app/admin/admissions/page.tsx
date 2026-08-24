'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function AdmissionsAdminPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/admissions').then((res) => {
      setApps(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'AdmissionStaff']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-blue-600" /> Admissions Inquiries &amp; Pipeline
        </h1>
      </div>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3">App No</th>
                  <th className="p-3">Applicant</th>
                  <th className="p-3">Target Class</th>
                  <th className="p-3">Father Phone</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {apps.map((a) => (
                  <tr key={a._id}>
                    <td className="p-3 font-mono font-bold text-blue-600">{a.applicationNumber}</td>
                    <td className="p-3 font-bold">{a.applicantName}</td>
                    <td className="p-3">{a.targetClassId?.name || 'Class'}</td>
                    <td className="p-3 font-mono">{a.fatherPhone}</td>
                    <td className="p-3"><Badge size="sm" variant={a.status === 'admitted' ? 'success' : 'info'}>{a.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </PortalLayout>
  );
}
