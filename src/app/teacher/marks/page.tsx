'use client';

import React, { useState, useEffect } from 'react';
import { Award, Save } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function TeacherMarksEntryPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/students', { params: { classId: '6a8c23b4696177c803396123' } }).then((res) => {
      setStudents(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Enter Class 10A Mathematics Marks
        </h1>
        <Button size="sm" variant="primary" leftIcon={<Save className="w-4 h-4" />} onClick={() => alert('Marks saved!')}>Save Marks</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Theory (Max 70)</th>
                  <th className="p-3">Practical (Max 30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {students.map((s) => (
                  <tr key={s._id}>
                    <td className="p-3 font-bold">{s.currentRollNumber || 1}</td>
                    <td className="p-3 font-bold">{s.firstName} {s.lastName}</td>
                    <td className="p-3"><input type="number" defaultValue={65} className="w-20 border rounded p-1" /></td>
                    <td className="p-3"><input type="number" defaultValue={20} className="w-20 border rounded p-1" /></td>
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
