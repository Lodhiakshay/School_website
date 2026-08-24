'use client';

import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  Sparkles,
  Users,
  AlertTriangle,
  FileText,
  Printer,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/toast';

const fallbackStudentNotices = [
  {
    _id: 'sn_01',
    title: 'UP Board High School Examination Registration Verification',
    content:
      'All Class 10 students must verify their subject codes and parent spelling with Class Teacher Shri Dinesh Gupta before 30 September 2026.',
    priority: 'urgent',
    date: '24 Aug 2026',
    publisher: 'Controller of Examinations',
  },
  {
    _id: 'sn_02',
    title: 'Inter-School Science Model Exhibition & Robotics Fair',
    content:
      'Interested students from Class 9 to 12 can register project ideas with Physics Lab Incharge Dr. Anita Srivastava. Top models qualify for District Level.',
    priority: 'normal',
    date: '22 Aug 2026',
    publisher: 'Science Club',
  },
  {
    _id: 'sn_03',
    title: 'Half-Yearly Examination Timetable & Revision Sessions',
    content:
      'Terminal board assessments commence from 15 September 2026. Special morning doubt clearing classes will be held every Saturday.',
    priority: 'high',
    date: '20 Aug 2026',
    publisher: 'Principal Office',
  },
];

export default function StudentNoticesPage() {
  const [notices] = useState(fallbackStudentNotices);
  const { toast } = useToast();

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Bell className="w-5 h-5 text-blue-600" /> Student Campus Circulars &amp; Noticeboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live school announcements, examination circulars, holiday schedules, and event notices.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.print();
              toast.success('Generated printable Notice Bulletin.', 'Print Ready');
            }}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Bulletin
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
