'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Printer,
  Calendar,
  FileText,
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

const fallbackHomework = [
  {
    _id: 'hw_01',
    title: 'Quadratic Equations & Roots (Exercise 4.3)',
    subject: 'Mathematics (103)',
    className: 'Class 10 (Section A)',
    assignedBy: 'Shri Dinesh Gupta',
    dueDate: '26 Aug 2026',
    submissions: 42,
    totalStudents: 48,
    description: 'Solve problems 1 through 10 from NCERT Textbook with complete step-by-step discriminant calculations.',
    attachment: 'Class10_Maths_Ch4_Assignment.pdf',
  },
  {
    _id: 'hw_02',
    title: 'Electromagnetic Induction & Faraday Laws',
    subject: 'Physics (111)',
    className: 'Class 12 (Section A - PCM)',
    assignedBy: 'Dr. Anita Srivastava',
    dueDate: '27 Aug 2026',
    submissions: 38,
    totalStudents: 42,
    description: 'Prepare lab practical writeup for Lenz Law experiment and complete numerical questions on mutual inductance.',
    attachment: 'Class12_Physics_EMI_Practice.pdf',
  },
  {
    _id: 'hw_03',
    title: 'सूरदास के पद — भावार्थ एवं व्याख्या',
    subject: 'Hindi Sahitya (101)',
    className: 'Class 10 (Section A)',
    assignedBy: 'Smt. Geeta Dixit',
    dueDate: '28 Aug 2026',
    submissions: 45,
    totalStudents: 48,
    description: 'पद क्रमांक 1 से 4 का संदर्भ, प्रसंग सहित भावार्थ लिखें और महत्वपूर्ण अलंकारों का उल्लेख करें।',
    attachment: 'Hindi_Kavya_Surdas_Sheet.pdf',
  },
  {
    _id: 'hw_04',
    title: 'Python File Handling & CSV Module Lab Exercise',
    subject: 'Computer Applications',
    className: 'Class 12 (Section A)',
    assignedBy: 'Shri Amit Verma',
    dueDate: '29 Aug 2026',
    submissions: 35,
    totalStudents: 40,
    description: 'Write Python program to read student marks from CSV and calculate overall percentile and grade ranking.',
    attachment: 'Python_Lab_Ex4.py',
  },
  {
    _id: 'hw_05',
    title: 'Organic Chemistry — Aldehydes and Ketones',
    subject: 'Chemistry (112)',
    className: 'Class 12 (Section B)',
    assignedBy: 'Dr. Anand Tiwari',
    dueDate: '30 Aug 2026',
    submissions: 32,
    totalStudents: 40,
    description: 'Mechanism writeup for Nucleophilic Addition reactions and Aldol Condensation with structural diagrams.',
    attachment: 'Chem_Organic_Ch12.pdf',
  },
];

export default function HomeworkAdminPage() {
  const [homeworkList, setHomeworkList] = useState<any[]>(fallbackHomework);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newHw, setNewHw] = useState({
    title: '',
    subject: 'Mathematics (103)',
    className: 'Class 10 (Section A)',
    assignedBy: 'Shri Dinesh Gupta',
    dueDate: '2026-08-30',
    description: '',
  });

  const handleCreateHw = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'hw_' + Date.now(),
      title: newHw.title,
      subject: newHw.subject,
      className: newHw.className,
      assignedBy: newHw.assignedBy,
      dueDate: newHw.dueDate,
      submissions: 0,
      totalStudents: 48,
      description: newHw.description,
      attachment: 'Assignment_Doc.pdf',
    };
    setHomeworkList([created, ...homeworkList]);
    setShowAddModal(false);
    toast.success(`Homework "${created.title}" assigned to ${created.className}!`, 'Assignment Published');
  };

  const filtered = homeworkList.filter(
    (h) =>
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Teacher', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <BookOpen className="w-5 h-5 text-blue-600" /> Digital LMS &amp; Homework Tasks
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Subject assignments, homework tasks, student submission ratios, and attachment sheets.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Homework Bulletin.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Sheet
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Assign Homework
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search topic, subject, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Homework Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((hw) => {
            const percentage = Math.round((hw.submissions / hw.totalStudents) * 100);

            return (
              <Card
                key={hw._id}
                className="border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
              >
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <Badge size="sm" variant="info">
                    {hw.subject}
                  </Badge>
                  <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    {hw.className}
                  </span>
                </div>

                <CardContent className="p-5 space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900 font-serif leading-snug">{hw.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{hw.description}</p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[10px] text-slate-400 uppercase">Submissions</span>
                      <span className="text-emerald-700 font-mono">
                        {hw.submissions} / {hw.totalStudents} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Due: <strong className="text-rose-600">{hw.dueDate}</strong></span>
                    <span>By: {hw.assignedBy}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Assign Homework Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Assign Class Homework
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateHw} className="space-y-3 text-xs">
              <Input
                label="Topic / Title *"
                required
                placeholder="e.g. Chemical Bonding Exercise 3.2"
                value={newHw.title}
                onChange={(e) => setNewHw({ ...newHw, title: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newHw.subject}
                    onChange={(e) => setNewHw({ ...newHw, subject: e.target.value })}
                  >
                    <option value="Mathematics (103)">Mathematics (103)</option>
                    <option value="Physics Science (104)">Physics (104)</option>
                    <option value="Chemistry Science (104)">Chemistry (104)</option>
                    <option value="Biology Science (104)">Biology (104)</option>
                    <option value="Hindi Sahitya (101)">Hindi (101)</option>
                    <option value="English Core (102)">English (102)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Class</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newHw.className}
                    onChange={(e) => setNewHw({ ...newHw, className: e.target.value })}
                  >
                    <option value="Class 10 (Section A)">Class 10-A</option>
                    <option value="Class 10 (Section B)">Class 10-B</option>
                    <option value="Class 12 (Section A - PCM)">Class 12-A PCM</option>
                    <option value="Class 12 (Section B - PCB)">Class 12-B PCB</option>
                    <option value="Class 9 (Section A)">Class 9-A</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  required
                  value={newHw.dueDate}
                  onChange={(e) => setNewHw({ ...newHw, dueDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Task Instructions *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter problem numbers and specific instructions..."
                  value={newHw.description}
                  onChange={(e) => setNewHw({ ...newHw, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Publish Assignment
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
