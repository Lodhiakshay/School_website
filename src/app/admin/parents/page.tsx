'use client';

import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function ParentsAdminPage() {
  const [parents, setParents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/parents').then((res) => {
      setParents(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" /> Parent &amp; Guardian Directory
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
                  <th className="p-3">Father Name</th>
                  <th className="p-3">Mother Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {parents.map((p) => (
                  <tr key={p._id}>
                    <td className="p-3 font-bold">{p.fatherName}</td>
                    <td className="p-3">{p.motherName}</td>
                    <td className="p-3 font-mono text-blue-600">{p.fatherPhone}</td>
                    <td className="p-3">{p.residentialAddress}</td>
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
