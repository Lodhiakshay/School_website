'use client';

import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Search,
  Printer,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackExams = [
  {
    _id: 'ex_01',
    name: 'Unit Test 1 Assessment (Session 2026-27)',
    examType: 'Unit Test',
    classes: 'Class 6 through Class 12',
    startDate: '10 Jul 2026',
    endDate: '18 Jul 2026',
    maxMarks: 50,
    status: 'completed',
    resultPublished: true,
  },
  {
    _id: 'ex_02',
    name: 'UP Board Half-Yearly Evaluation Assessment',
    examType: 'Terminal Exam',
    classes: 'Nursery to Class 12',
    startDate: '15 Sep 2026',
    endDate: '26 Sep 2026',
    maxMarks: 100,
    status: 'scheduled',
    resultPublished: false,
  },
  {
    _id: 'ex_03',
    name: 'High School Pre-Board Examination (Class 10)',
    examType: 'Pre-Board',
    classes: 'Class 10 (High School)',
    startDate: '05 Jan 2027',
    endDate: '16 Jan 2027',
    maxMarks: 100,
    status: 'upcoming',
    resultPublished: false,
  },
  {
    _id: 'ex_04',
    name: 'Intermediate Pre-Board Examination (Class 12)',
    examType: 'Pre-Board',
    classes: 'Class 12 (Science & Arts)',
    startDate: '08 Jan 2027',
    endDate: '20 Jan 2027',
    maxMarks: 100,
    status: 'upcoming',
    resultPublished: false,
  },
  {
    _id: 'ex_05',
    name: 'Annual Final Examination & Promotion (2026-27)',
    examType: 'Annual Term',
    classes: 'Class 1 through Class 9 & 11',
    startDate: '01 Mar 2027',
    endDate: '15 Mar 2027',
    maxMarks: 100,
    status: 'planning',
    resultPublished: false,
  },
];

export default function ExamsAdminPage() {
  const [exams, setExams] = useState<any[]>(fallbackExams);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newExam, setNewExam] = useState({
    name: '',
    examType: 'Terminal Exam',
    classes: 'Class 9, 10, 11, 12',
    startDate: '2026-10-15',
    endDate: '2026-10-25',
    maxMarks: '100',
  });

  useEffect(() => {
    apiClient
      .get('/exams')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setExams(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'ex_' + Date.now(),
      name: newExam.name,
      examType: newExam.examType,
      classes: newExam.classes,
      startDate: newExam.startDate,
      endDate: newExam.endDate,
      maxMarks: Number(newExam.maxMarks) || 100,
      status: 'scheduled',
      resultPublished: false,
    };
    setExams([...exams, created]);
    setShowAddModal(false);
    toast.success(`Exam Assessment "${created.name}" scheduled!`, 'Exam Configured');
  };

  const filtered = exams.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.examType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.classes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" /> Examination Schedules &amp; Board Terms
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Unit tests, half-yearly board assessments, pre-board schedules, and marks entry windows.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Examination Date Sheet.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Date Sheet
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Schedule Exam
            </Button>
          </div>
        </div>

        {/* Exams Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Examination Title</th>
                    <th className="p-3.5">Assessment Category</th>
                    <th className="p-3.5">Eligible Classes</th>
                    <th className="p-3.5">Start &amp; End Dates</th>
                    <th className="p-3.5 text-center">Max Marks</th>
                    <th className="p-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((e) => (
                    <tr key={e._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{e.name}</div>
                      </td>
                      <td className="p-3.5">
                        <Badge size="sm" variant="info">
                          {e.examType}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-slate-600">{e.classes}</td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-600">
                        {e.startDate} &mdash; {e.endDate}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-blue-700">
                        {e.maxMarks} Marks
                      </td>
                      <td className="p-3.5 text-center">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                            e.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : e.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : 'bg-amber-100 text-amber-800 border-amber-200'
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Schedule Examination
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <Input
                label="Exam Title *"
                required
                placeholder="e.g. Unit Test 2 Assessment"
                value={newExam.name}
                onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Exam Type</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newExam.examType}
                    onChange={(e) => setNewExam({ ...newExam, examType: e.target.value })}
                  >
                    <option value="Unit Test">Unit Test</option>
                    <option value="Terminal Exam">Terminal Exam</option>
                    <option value="Pre-Board">Pre-Board</option>
                    <option value="Annual Term">Annual Term</option>
                  </select>
                </div>
                <Input
                  label="Max Total Marks"
                  type="number"
                  value={newExam.maxMarks}
                  onChange={(e) => setNewExam({ ...newExam, maxMarks: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Start Date *"
                  type="date"
                  required
                  value={newExam.startDate}
                  onChange={(e) => setNewExam({ ...newExam, startDate: e.target.value })}
                />
                <Input
                  label="End Date *"
                  type="date"
                  required
                  value={newExam.endDate}
                  onChange={(e) => setNewExam({ ...newExam, endDate: e.target.value })}
                />
              </div>

              <Input
                label="Eligible Classes"
                placeholder="e.g. Class 9, 10, 11, 12"
                value={newExam.classes}
                onChange={(e) => setNewExam({ ...newExam, classes: e.target.value })}
              />

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Schedule Assessment
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
