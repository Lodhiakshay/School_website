'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, Save } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function TeacherAttendancePage() {
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/attendance/class-sheet', {
      params: { classId: '6a8c23b4696177c803396123', sectionId: '6a8c23b4696177c803396150', date: new Date().toISOString().split('T')[0] }
    }).then((res) => {
      setRecords(res.data?.data?.records || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" /> Class 10A Attendance Marker
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
                  <th className="p-3">Roll</th>
                  <th className="p-3">Admission No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {records.map((r) => (
                  <tr key={r.studentId}>
                    <td className="p-3 font-bold">{r.rollNumber}</td>
                    <td className="p-3 font-mono text-blue-600">{r.admissionNumber}</td>
                    <td className="p-3 font-bold">{r.name}</td>
                    <td className="p-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-bold uppercase">{r.status}</span></td>
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
