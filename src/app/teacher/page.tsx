'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, Clock, BookOpen, Award, Sparkles, Users, Layers, ArrowRight } from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

export default function TeacherDashboardPage() {
  const myClasses = [
    { class: 'Class 10 (Section A)', subject: 'Mathematics (103)', time: '09:00 - 09:45 AM', room: 'Room 102', students: 48 },
    { class: 'Class 12 (Section A)', subject: 'Calculus & Vectors', time: '10:30 - 11:15 AM', room: 'Room 204', students: 42 },
    { class: 'Class 9 (Section B)', subject: 'Algebra & Geometry', time: '12:30 - 01:15 PM', room: 'Room 105', students: 50 },
  ];

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      {/* Teacher Welcome Banner with Portrait */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800/40">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-xl flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              alt="Shri Dinesh Chandra Gupta"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Teacher Workspace • Department of Mathematics</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight font-serif">
              Shri Dinesh Chandra Gupta
            </h1>
            <p className="text-xs text-slate-300">
              Emp ID: <strong className="text-amber-300 font-mono">EMP-2024-0012</strong> • Class Teacher: <strong>Class 10 (Section A)</strong> • 22 Yrs Experience
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/teacher/attendance">
            <Button size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 font-bold" leftIcon={<CalendarCheck className="w-4 h-4" />}>
              Mark Class 10A Attendance
            </Button>
          </Link>
          <Link href="/teacher/marks">
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
              Enter Marks
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MetricCard
          title="Class 10A Attendance Today"
          value="46 / 48 Present"
          subtitle="95.8% Attendance Rate"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="emerald"
        />
        <MetricCard
          title="Assigned Lectures"
          value="3 Lectures"
          subtitle="Scheduled for Today"
          icon={<Clock className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          title="Pending Homework Submissions"
          value="18 Submissions"
          subtitle="Awaiting Evaluation"
          icon={<BookOpen className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Today's Teaching Schedule */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" /> Today&apos;s Assigned Teaching Periods
          </CardTitle>
          <Badge variant="purple" size="sm">Session 2026-27</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Assigned Class</th>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Period Timing</th>
                  <th className="p-3.5">Classroom</th>
                  <th className="p-3.5">Strength</th>
                  <th className="p-3.5 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {myClasses.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900">{c.class}</td>
                    <td className="p-3.5 font-bold text-blue-700">{c.subject}</td>
                    <td className="p-3.5 font-mono text-[11px]">{c.time}</td>
                    <td className="p-3.5 font-semibold text-slate-600">{c.room}</td>
                    <td className="p-3.5">{c.students} Students</td>
                    <td className="p-3.5 text-right">
                      <Link href="/teacher/homework">
                        <Button size="sm" variant="outline" className="text-xs">
                          Assign HW
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PortalLayout>
  );
}
