'use client';

import React, { useState, useEffect } from 'react';
import { BookMarked } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function SubjectsAdminPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/academics/subjects').then((res) => {
      setSubjects(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-blue-600" /> Subjects Catalog
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
                  <th className="p-3">Subject</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Max Marks</th>
                  <th className="p-3">Passing Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {subjects.map((s) => (
                  <tr key={s._id}>
                    <td className="p-3 font-bold">{s.name}</td>
                    <td className="p-3 font-mono text-blue-600">{s.code}</td>
                    <td className="p-3">{s.maxMarks}</td>
                    <td className="p-3 text-emerald-600">{s.passingMarks}</td>
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
