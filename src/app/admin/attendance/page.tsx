'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, Save } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function AttendanceAdminPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiClient.get('/academics/classes'), apiClient.get('/academics/sections')]).then(([resC, resS]) => {
      const c = resC.data?.data || [];
      const s = resS.data?.data || [];
      setClasses(c);
      setSections(s);
      if (c.length > 0) setSelectedClass(c[0]._id);
      if (s.length > 0) setSelectedSection(s[0]._id);
    });
  }, []);

  const loadSheet = async () => {
    if (!selectedClass || !selectedSection) return;
    setIsLoading(true);
    try {
      const res = await apiClient.get('/attendance/class-sheet', {
        params: { classId: selectedClass, sectionId: selectedSection, date },
      });
      setRecords(res.data?.data?.records || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSheet();
  }, [selectedClass, selectedSection, date]);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Teacher']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" /> Daily Attendance Sheet
        </h1>
      </div>
      <Card>
        <CardContent className="p-4 grid grid-cols-3 gap-3">
          <Select label="Class" options={classes.map((c) => ({ value: c._id, label: c.name }))} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} />
          <Select label="Section" options={sections.map((s) => ({ value: s._id, label: `Section ${s.name}` }))} value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} />
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </CardContent>
      </Card>
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
                  <th className="p-3">Name</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {records.map((r) => (
                  <tr key={r.studentId}>
                    <td className="p-3 font-bold">{r.rollNumber}</td>
                    <td className="p-3 font-mono text-blue-600">{r.admissionNumber}</td>
                    <td className="p-3 font-bold">{r.name}</td>
                    <td className="p-3 uppercase font-bold text-emerald-600">{r.status}</td>
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
