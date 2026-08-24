'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  CalendarCheck,
  Award,
  BookOpen,
  Receipt,
  Sparkles,
  Clock,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

export default function StudentDashboardPage() {
  const todayPeriods = [
    { period: 1, time: '09:00 - 09:45 AM', subject: 'Mathematics (103)', teacher: 'Shri Dinesh Gupta', room: 'Room 102' },
    { period: 2, time: '09:45 - 10:30 AM', subject: 'Science (104)', teacher: 'Dr. Anita Srivastava', room: 'Physics Lab' },
    { period: 3, time: '10:30 - 11:15 AM', subject: 'Hindi Sahitya (101)', teacher: 'Smt. Geeta Dixit', room: 'Room 102' },
    { period: 4, time: '11:45 - 12:30 PM', subject: 'English Core (102)', teacher: 'Shri Vikramaditya Singh', room: 'Room 102' },
    { period: 5, time: '12:30 - 01:15 PM', subject: 'Social Science (105)', teacher: 'Shri Manoj Pathak', room: 'Room 102' },
    { period: 6, time: '01:15 - 02:00 PM', subject: 'Computer Applications', teacher: 'Shri Amit Verma', room: 'IT Lab' },
  ];

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      {/* Student Welcome Banner with Photo & High Contrast Buttons */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800/40">
        <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-xl flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
              alt="Aarav Sharma"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black bg-amber-500/20 text-amber-300 px-3 py-0.5 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Student SIS Portal • Session 2026-2027</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black tracking-tight font-serif truncate">
              Aarav Sharma
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-tight">
              Admission No: <strong className="text-amber-300 font-mono">SGM-2026-0001</strong> • Class:{' '}
              <strong>Class 10 (Section A)</strong> • Roll No: <strong>01</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons (High Contrast & Visible) */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Link href="/student/results" className="flex-1 sm:flex-initial">
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/30"
              leftIcon={<Award className="w-4 h-4" />}
            >
              Unit Test Marksheet
            </Button>
          </Link>
          <Link href="/student/timetable" className="flex-1 sm:flex-initial">
            <Button
              size="sm"
              className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 font-bold shadow-sm"
              leftIcon={<Calendar className="w-4 h-4 text-amber-400" />}
            >
              Class Timetable
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <MetricCard
          title="Attendance Rate"
          value="96.4%"
          subtitle="Board Threshold: 75%"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="emerald"
          trend={{ value: 'Eligible for Board', isPositive: true }}
        />
        <MetricCard
          title="Class Rank"
          value="Rank #1"
          subtitle="Score: 524/600 (87.3%)"
          icon={<Award className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          title="Active Homework"
          value="2 Pending"
          subtitle="Due This Week"
          icon={<BookOpen className="w-5 h-5" />}
          color="indigo"
        />
        <MetricCard
          title="Fee Status"
          value="₹ 0 Dues"
          subtitle="Term 1 Settled"
          icon={<Receipt className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Today's Schedule and Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" /> Today&apos;s Lecture Schedule (Monday)
              </CardTitle>
              <Badge variant="info" size="sm">
                6 Periods
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">Period</th>
                      <th className="p-3">Timing</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Educator</th>
                      <th className="p-3">Venue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {todayPeriods.map((p) => (
                      <tr key={p.period} className="hover:bg-slate-50/80">
                        <td className="p-3 font-bold text-blue-700">Period {p.period}</td>
                        <td className="p-3 font-mono text-[11px]">{p.time}</td>
                        <td className="p-3 font-bold text-slate-900">{p.subject}</td>
                        <td className="p-3">{p.teacher}</td>
                        <td className="p-3 font-semibold text-slate-500">{p.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-3xl space-y-4 shadow-md">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-black uppercase tracking-wider">Unit Test 1 Result</h3>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-amber-300">87.33%</div>
              <p className="text-xs text-slate-200">
                Grade: <strong className="text-emerald-300">A1 (Outstanding)</strong> | Class Rank:{' '}
                <strong className="text-white">#1</strong>
              </p>
            </div>
            <Link href="/student/results" className="block w-full">
              <Button size="sm" className="w-full bg-white text-blue-900 hover:bg-slate-100 font-black">
                View &amp; Print Marksheet &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
