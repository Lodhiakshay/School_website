'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  Save,
  CheckCircle2,
  Printer,
  Sparkles,
  Users,
  Clock,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

const fallbackClass10A = [
  { roll: 1, adm: 'SGM-2026-1001', name: 'Aarav Sharma', status: 'Present' },
  { roll: 2, adm: 'SGM-2026-1002', name: 'Ananya Gupta', status: 'Present' },
  { roll: 3, adm: 'SGM-2026-1003', name: 'Divyanshu Singh', status: 'Present' },
  { roll: 4, adm: 'SGM-2026-1004', name: 'Harshit Dubey', status: 'Present' },
  { roll: 5, adm: 'SGM-2026-1005', name: 'Ishita Verma', status: 'Present' },
  { roll: 6, adm: 'SGM-2026-1006', name: 'Kavya Pandey', status: 'Late' },
  { roll: 7, adm: 'SGM-2026-1007', name: 'Manish Kumar', status: 'Present' },
  { roll: 8, adm: 'SGM-2026-1008', name: 'Nikhil Mishra', status: 'Absent' },
  { roll: 9, adm: 'SGM-2026-1009', name: 'Pooja Rathore', status: 'Present' },
  { roll: 10, adm: 'SGM-2026-1010', name: 'Rohan Sharma', status: 'Present' },
  { roll: 11, adm: 'SGM-2026-1011', name: 'Sneha Tripathi', status: 'Present' },
  { roll: 12, adm: 'SGM-2026-1012', name: 'Yash Vardhan', status: 'Present' },
];

export default function TeacherAttendancePage() {
  const [students, setStudents] = useState(fallbackClass10A);
  const { toast } = useToast();

  const handleToggle = (roll: number, newStatus: string) => {
    setStudents(students.map((s) => (s.roll === roll ? { ...s, status: newStatus } : s)));
  };

  const handleMarkAllPresent = () => {
    setStudents(students.map((s) => ({ ...s, status: 'Present' })));
    toast.success('Marked all 12 students Present.', 'Batch Attendance');
  };

  const handleSave = () => {
    const presentCount = students.filter((s) => s.status === 'Present').length;
    toast.success(
      `Class 10-A daily attendance saved (${presentCount}/${students.length} Present).`,
      'Register Synced'
    );
  };

  const presentCount = students.filter((s) => s.status === 'Present').length;
  const absentCount = students.filter((s) => s.status === 'Absent').length;
  const lateCount = students.filter((s) => s.status === 'Late').length;

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <CalendarCheck className="w-5 h-5 text-blue-600" /> Class 10-A Daily Attendance Register
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Educator: Shri Dinesh Gupta &bull; Date: Today ({new Date().toLocaleDateString()})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllPresent}
              leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            >
              Mark All Present
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={handleSave}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Register
            </Button>
          </div>
        </div>

        {/* Counter Badges */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm text-center">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Present</span>
            <div className="text-xl font-black text-emerald-800 mt-1">{presentCount} Students</div>
          </div>
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 shadow-sm text-center">
            <span className="text-[10px] font-bold text-rose-700 uppercase">Absent</span>
            <div className="text-xl font-black text-rose-800 mt-1">{absentCount} Students</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm text-center">
            <span className="text-[10px] font-bold text-amber-700 uppercase">Late Entry</span>
            <div className="text-xl font-black text-amber-800 mt-1">{lateCount} Students</div>
          </div>
        </div>

        {/* Student Register Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Admission ID</th>
                    <th className="p-3.5">Student Full Name</th>
                    <th className="p-3.5 text-center">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {students.map((s) => (
                    <tr key={s.roll} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-mono font-black text-slate-900">{s.roll}</td>
                      <td className="p-3.5 font-mono font-bold text-blue-600">{s.adm}</td>
                      <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                      <td className="p-3.5 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                          <button
                            type="button"
                            onClick={() => handleToggle(s.roll, 'Present')}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                              s.status === 'Present'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggle(s.roll, 'Late')}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                              s.status === 'Late'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Late
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggle(s.roll, 'Absent')}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                              s.status === 'Absent'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
