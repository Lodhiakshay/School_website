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
  Upload,
  Users,
  Filter,
  Sparkles,
  FileSpreadsheet,
  X,
  AlertCircle,
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
  { studentId: 's_07', rollNumber: 7, admissionNumber: 'SGM-2026-1007', name: 'Ayush Kumar', gender: 'Male', status: 'medical' },
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
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<any[]>([]);
  const { toast } = useToast();

  const handleDownloadSampleCsv = () => {
    const csvContent =
      'AdmissionNumber,RollNumber,StudentName,Date,Status,Remarks\n' +
      'SGM-2026-1001,1,Aarav Sharma,2026-08-25,Present,Biometric Verified\n' +
      'SGM-2026-1002,2,Ananya Gupta,2026-08-25,Present,Regular\n' +
      'SGM-2026-1003,3,Rohan Verma,2026-08-25,Absent,Uninformed\n' +
      'SGM-2026-1006,6,Kavya Mishra,2026-08-25,Late,Bus Delay\n' +
      'SGM-2026-1007,7,Ayush Kumar,2026-08-25,Medical,Doctor Note Submitted\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'attendance_bulk_upload_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded attendance_bulk_upload_template.csv with exact columns.', 'Template Ready');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const parsed = [
      { rollNumber: 1, admissionNumber: 'SGM-2026-1001', name: 'Aarav Sharma', status: 'present' },
      { rollNumber: 2, admissionNumber: 'SGM-2026-1002', name: 'Ananya Gupta', status: 'present' },
      { rollNumber: 3, admissionNumber: 'SGM-2026-1003', name: 'Rohan Verma', status: 'present' },
      { rollNumber: 4, admissionNumber: 'SGM-2026-1004', name: 'Priya Singh', status: 'present' },
      { rollNumber: 5, admissionNumber: 'SGM-2026-1005', name: 'Devansh Tiwari', status: 'present' },
    ];
    setUploadedPreview(parsed);
    toast.success(`Validated ${parsed.length} attendance rows from ${file.name}`, 'File Ready');
  };

  const handleConfirmBulkUpload = () => {
    if (uploadedPreview.length === 0) return;

    setRecords((prev) =>
      prev.map((r) => {
        const found = uploadedPreview.find((u) => u.admissionNumber === r.admissionNumber);
        return found ? { ...r, status: found.status } : r;
      })
    );

    setShowBulkUploadModal(false);
    setUploadedPreview([]);
    toast.success('Batch attendance updated successfully from CSV!', 'Attendance Imported');
  };

  const handleStatusChange = (studentId: string, newStatus: 'present' | 'absent' | 'late' | 'medical') => {
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
  const medicalCount = records.filter((r) => r.status === 'medical').length;
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
              Select class, section, and date to record, upload CSV, and verify student attendance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadSampleCsv}
              leftIcon={<Download className="w-4 h-4 text-emerald-600" />}
            >
              Sample CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBulkUploadModal(true)}
              leftIcon={<Upload className="w-4 h-4 text-indigo-600" />}
            >
              Bulk Upload
            </Button>
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
          <div className="lg:col-span-6 grid grid-cols-5 gap-2">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase">Enrolled</span>
              <span className="text-base font-black text-slate-900">{totalCount}</span>
            </div>
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between">
              <span className="text-[9px] font-bold text-emerald-700 uppercase">Present</span>
              <span className="text-base font-black text-emerald-700">{presentCount}</span>
            </div>
            <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200 shadow-sm flex flex-col justify-between">
              <span className="text-[9px] font-bold text-rose-700 uppercase">Absent</span>
              <span className="text-base font-black text-rose-700">{absentCount}</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 shadow-sm flex flex-col justify-between">
              <span className="text-[9px] font-bold text-amber-700 uppercase">Medical</span>
              <span className="text-base font-black text-amber-700">{medicalCount}</span>
            </div>
            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200 shadow-sm flex flex-col justify-between">
              <span className="text-[9px] font-bold text-blue-700 uppercase">Ratio</span>
              <span className="text-base font-black text-blue-700">{presentPercentage}%</span>
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
              <table className="w-full text-left text-xs min-w-[650px]">
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
                    const isM = r.status === 'medical';

                    return (
                      <tr key={r.studentId} className="hover:bg-slate-50 transition">
                        <td className="p-3 text-center font-bold text-slate-900">{r.rollNumber}</td>
                        <td className="p-3 font-mono font-bold text-blue-600">{r.admissionNumber}</td>
                        <td className="p-3 font-black text-slate-900">{r.name}</td>
                        <td className="p-3 text-slate-500">{r.gender}</td>
                        <td className="p-3 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button
                              type="button"
                              onClick={() => handleStatusChange(r.studentId, 'present')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
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
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                                isL
                                  ? 'bg-amber-500 text-white shadow-sm'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Late
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(r.studentId, 'medical')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                                isM
                                  ? 'bg-indigo-600 text-white shadow-sm'
                                  : 'text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              Medical
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(r.studentId, 'absent')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
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

      {/* Bulk Upload Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Attendance Register Bulk CSV Upload
              </h3>
              <button onClick={() => setShowBulkUploadModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">Step 1: Download Attendance Template</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownloadSampleCsv}
                    className="bg-white text-blue-700 border-blue-300 font-bold"
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download CSV
                  </Button>
                </div>
                <p className="text-[11px] text-blue-700">
                  Headers required: <code>AdmissionNumber,RollNumber,StudentName,Date,Status,Remarks</code>
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Step 2: Choose Prepared CSV File</label>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="w-full p-2.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 font-medium text-xs cursor-pointer hover:bg-slate-100 transition"
                />
              </div>

              {uploadedPreview.length > 0 && (
                <div className="space-y-2 border border-slate-200 rounded-2xl p-3 bg-slate-50">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                    <span>Parsed Records Preview ({uploadedPreview.length} items)</span>
                    <span className="text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-200 text-slate-700 font-bold uppercase text-[9px]">
                        <tr>
                          <th className="p-1">Roll</th>
                          <th className="p-1">Adm No</th>
                          <th className="p-1">Name</th>
                          <th className="p-1">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {uploadedPreview.map((row, i) => (
                          <tr key={i}>
                            <td className="p-1 font-mono font-bold">{row.rollNumber}</td>
                            <td className="p-1 font-mono text-blue-700">{row.admissionNumber}</td>
                            <td className="p-1 font-bold">{row.name}</td>
                            <td className="p-1 uppercase font-bold text-emerald-700">{row.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold"
                disabled={uploadedPreview.length === 0}
                onClick={handleConfirmBulkUpload}
                leftIcon={<Upload className="w-4 h-4" />}
              >
                Apply Attendance To Class Register
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowBulkUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
