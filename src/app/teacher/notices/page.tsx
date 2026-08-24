'use client';

import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  Sparkles,
  Users,
  ShieldCheck,
  Printer,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/toast';

const fallbackFacultyNotices = [
  {
    _id: 'fn_01',
    title: 'Submission of Half-Yearly Question Papers & Blueprint Scheme',
    content:
      'All subject heads must submit 2 sets of moderated question papers with detailed marking schemes to the Examination Committee by 01 September 2026.',
    priority: 'urgent',
    date: '24 Aug 2026',
    publisher: 'Dr. Ramesh Sharma (Principal)',
  },
  {
    _id: 'fn_02',
    title: 'Faculty Monthly Academic Review & Lesson Plan Audit',
    content:
      'The monthly departmental review meeting will be held this Saturday at 02:15 PM in the Conference Hall. Please bring student attendance registers.',
    priority: 'high',
    date: '23 Aug 2026',
    publisher: 'Academic Coordinator',
  },
  {
    _id: 'fn_03',
    title: 'Parent-Teacher Meeting (PTM) Duty Allocations',
    content:
      'Class Teachers and subject teachers are requested to review student progress cards and prepare individual performance feedback notes.',
    priority: 'normal',
    date: '21 Aug 2026',
    publisher: 'Vice Principal',
  },
];

export default function TeacherNoticesPage() {
  const [notices] = useState(fallbackFacultyNotices);
  const { toast } = useToast();

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Bell className="w-5 h-5 text-blue-600" /> Faculty Noticeboard &amp; Staff Circulars
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Principal orders, academic review schedules, examination duties, and departmental memos.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.print();
              toast.success('Generated printable Staff Bulletin.', 'Print Ready');
            }}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Circulars
          </Button>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {notices.map((n) => {
            const isUrgent = n.priority === 'urgent';
            const isHigh = n.priority === 'high';

            return (
              <Card
                key={n._id}
                className={`border shadow-sm overflow-hidden flex flex-col justify-between ${
                  isUrgent
                    ? 'border-rose-300 bg-rose-50/20'
                    : isHigh
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        isUrgent
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : isHigh
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}
                    >
                      {n.priority}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-medium">{n.date}</span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 font-serif leading-snug">{n.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>

                  <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                    Issued by: <strong className="text-slate-700">{n.publisher}</strong>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
