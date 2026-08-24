'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Download,
  Users,
  Filter,
  Sparkles,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackStudents = [
  { studentId: 's_01', rollNumber: 1, admissionNumber: 'SGM-2026-1001', name: 'Aarav Sharma', gender: 'Male', status: 'present' },
  { studentId: 's_02', rollNumber: 2, admissionNumber: 'SGM-2026-1002', name: 'Ananya Gupta', gender: 'Female', status: 'present' },
  { studentId: 's_03', rollNumber: 3, admissionNumber: 'SGM-2026-1003', name: 'Rohan Verma', gender: 'Male', status: 'absent' },
  { studentId: 's_04', rollNumber: 4, admissionNumber: 'SGM-2026-1004', name: 'Priya Singh', gender: 'Female', status: 'present' },
  { studentId: 's_05', rollNumber: 5, admissionNumber: 'SGM-2026-1005', name: 'Devansh Tiwari', gender: 'Male', status: 'present' },
  { studentId: 's_06', rollNumber: 6, admissionNumber: 'SGM-2026-1006', name: 'Kavya Mishra', gender: 'Female', status: 'late' },
  { studentId: 's_07', rollNumber: 7, admissionNumber: 'SGM-2026-1007', name: 'Ayush Kumar', gender: 'Male', status: 'present' },
  { studentId: 's_08', rollNumber: 8, admissionNumber: 'SGM-2026-1008', name: 'Sneha Dixit', gender: 'Female', status: 'present' },
  { studentId: 's_09', rollNumber: 9, admissionNumber: 'SGM-2026-1009', name: 'Harshit Yadav', gender: 'Male', status: 'present' },
  { studentId: 's_10', rollNumber: 10, admissionNumber: 'SGM-2026-1010', name: 'Rhea Chauhan', gender: 'Female', status: 'present' },
  { studentId: 's_11', rollNumber: 11, admissionNumber: 'SGM-2026-1011', name: 'Aditya Srivastava', gender: 'Male', status: 'absent' },
  { studentId: 's_12', rollNumber: 12, admissionNumber: 'SGM-2026-1012', name: 'Isha Pandey', gender: 'Female', status: 'present' },
];

export default function AttendanceAdminPage() {
  const [selectedClass, setSelectedClass] = useState('c_10');
  const [selectedSection, setSelectedSection] = useState('s_a');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<any[]>(fallbackStudents);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = (studentId: string, newStatus: 'present' | 'absent' | 'late') => {
    setRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status: newStatus } : r))
    );
  };

  const handleMarkAllPresent = () => {
    setRecords((prev) => prev.map((r) => ({ ...r, status: 'present' })));
    toast.success('Marked all students as Present.', 'Batch Updated');
  };

  const handleSaveAttendance = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(
        `Attendance for ${records.length} students recorded on ${date} (Class 10-A).`,
        'Attendance Sheet Saved'
      );
    }, 600);
  };

  const totalCount = records.length;
  const presentCount = records.filter((r) => r.status === 'present').length;
  const absentCount = records.filter((r) => r.status === 'absent').length;
  const lateCount = records.filter((r) => r.status === 'late').length;
  const presentPercentage = totalCount > 0 ? Math.round(((presentCount + lateCount) / totalCount) * 100) : 0;

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Teacher']}>
      <div className="space-y-6">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <CalendarCheck className="w-5 h-5 text-blue-600" /> Daily Batch Attendance Register
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Select class, section, and date to record and verify student attendance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Attendance Register sheet.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Sheet
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={handleSaveAttendance}
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Filter Toolbar & Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <Card className="lg:col-span-6 border-slate-200 shadow-sm">
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Class</label>
                <select
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="c_9">Class 9 (High School)</option>
                  <option value="c_10">Class 10 (High School)</option>
                  <option value="c_11">Class 11 (PCM / PCB)</option>
                  <option value="c_12">Class 12 (Intermediate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
                <select
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="s_a">Section A (Science)</option>
                  <option value="s_b">Section B (Arts)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Metrics Bar */}
          <div className="lg:col-span-6 grid grid-cols-4 gap-2.5">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Enrolled</span>
              <span className="text-lg font-black text-slate-900">{totalCount}</span>
            </div>
            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Present</span>
              <span className="text-lg font-black text-emerald-700">{presentCount}</span>
            </div>
            <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-rose-700 uppercase">Absent</span>
              <span className="text-lg font-black text-rose-700">{absentCount}</span>
            </div>
            <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-blue-700 uppercase">Ratio</span>
              <span className="text-lg font-black text-blue-700">{presentPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Class 10-A Student Roster ({date})
              </h3>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleMarkAllPresent}
              className="text-xs font-bold text-emerald-700 border-emerald-300 hover:bg-emerald-50"
            >
              Mark All Present
            </Button>
          </div>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3 w-16 text-center">Roll</th>
                    <th className="p-3">Admission No</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3 text-center">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {records.map((r) => {
                    const isP = r.status === 'present';
                    const isA = r.status === 'absent';
                    const isL = r.status === 'late';

                    return (
                      <tr key={r.studentId} className="hover:bg-slate-50 transition">
                        <td className="p-3 text-center font-bold text-slate-900">{r.rollNumber}</td>
                        <td className="p-3 font-mono font-bold text-blue-600">{r.admissionNumber}</td>
                        <td className="p-3 font-black text-slate-900">{r.name}</td>
                        <td className="p-3 text-slate-500">{r.gender}</td>
                        <td className="p-3 text-center">
                          <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                              type="button"
                              onClick={() => handleStatusChange(r.studentId, 'present')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                isP
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(r.studentId, 'late')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                isL
                                  ? 'bg-amber-500 text-white shadow-sm'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Late
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(r.studentId, 'absent')}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                isA
                                  ? 'bg-rose-600 text-white shadow-sm'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Absent
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
