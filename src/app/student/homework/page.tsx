'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Upload,
  FileText,
  Sparkles,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

const fallbackStudentHw = [
  {
    _id: 'hw_01',
    title: 'Quadratic Equations & Roots (Exercise 4.3)',
    subject: 'Mathematics (103)',
    teacher: 'Shri Dinesh Gupta',
    dueDate: '26 Aug 2026',
    status: 'pending',
    instructions: 'Solve problems 1 through 10 from NCERT Textbook with complete step-by-step discriminant calculations.',
    attachment: 'Class10_Maths_Ch4_Assignment.pdf',
  },
  {
    _id: 'hw_02',
    title: 'सूरदास के पद — भावार्थ एवं व्याख्या',
    subject: 'Hindi Sahitya (101)',
    teacher: 'Smt. Geeta Dixit',
    dueDate: '28 Aug 2026',
    status: 'pending',
    instructions: 'पद क्रमांक 1 से 4 का संदर्भ, प्रसंग सहित भावार्थ लिखें और महत्वपूर्ण अलंकारों का उल्लेख करें।',
    attachment: 'Hindi_Kavya_Surdas_Sheet.pdf',
  },
  {
    _id: 'hw_03',
    title: 'Chemical Reactions & Balancing Equations',
    subject: 'Science (104)',
    teacher: 'Dr. Anita Srivastava',
    dueDate: '22 Aug 2026',
    status: 'submitted',
    instructions: 'Balance all 15 chemical equations and categorize them into Redox, Displacement, and Combination reactions.',
    attachment: 'Chemistry_Ch1_Solutions.pdf',
  },
];

export default function StudentHomeworkPage() {
  const [tasks, setTasks] = useState(fallbackStudentHw);
  const { toast } = useToast();

  const handleSubmit = (id: string, title: string) => {
    setTasks(tasks.map((t) => (t._id === id ? { ...t, status: 'submitted' } : t)));
    toast.success(`Assignment "${title}" uploaded and submitted to subject teacher!`, 'Submission Received');
  };

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin', 'Admin', 'Parent', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <BookOpen className="w-5 h-5 text-blue-600" /> My Academic Homework &amp; Assignments
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Active class homework assignments, practice sheets, and digital submission portal.
            </p>
          </div>
        </div>

        {/* Homework Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tasks.map((t) => (
            <Card
              key={t._id}
              className={`border shadow-sm overflow-hidden flex flex-col justify-between ${
                t.status === 'pending' ? 'border-amber-300 bg-amber-50/10' : 'border-emerald-300 bg-emerald-50/10'
              }`}
            >
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <Badge size="sm" variant={t.status === 'pending' ? 'default' : 'success'}>
                  {t.subject}
                </Badge>
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    t.status === 'pending'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {t.status === 'pending' ? '⏳ Pending' : '✓ Submitted'}
                </span>
              </div>

              <CardContent className="p-5 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900 font-serif">{t.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{t.instructions}</p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-mono text-blue-600 font-bold text-[11px]">
                    <FileText className="w-3.5 h-3.5" /> {t.attachment}
                  </span>
                  <button
                    onClick={() => toast.success(`Downloading ${t.attachment}...`, 'Assignment Download')}
                    className="text-[10px] font-bold text-slate-600 hover:text-blue-600"
                  >
                    Download Worksheet
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Due: <strong className="text-rose-600">{t.dueDate}</strong> &bull; {t.teacher}
                  </span>

                  {t.status === 'pending' ? (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 font-bold text-xs"
                      onClick={() => handleSubmit(t._id, t.title)}
                      leftIcon={<Upload className="w-3.5 h-3.5" />}
                    >
                      Submit File
                    </Button>
                  ) : (
                    <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
