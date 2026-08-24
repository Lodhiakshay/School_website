'use client';

import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function ClassesAdminPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/academics/classes').then((res) => {
      setClasses(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-600" /> Classes &amp; Sections
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
                  <th className="p-3">Class Name</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Sections</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {classes.map((cls) => (
                  <tr key={cls._id}>
                    <td className="p-3 font-bold">{cls.name}</td>
                    <td className="p-3 font-mono text-blue-600">{cls.code}</td>
                    <td className="p-3">{cls.sections?.map((s: any) => `Sec ${s.name}`).join(', ') || 'A'}</td>
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
