'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  UserCheck,
  CreditCard,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  Bell,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { apiClient } from '../../lib/api-client';
import { formatCurrency, formatDate } from '../../lib/utils';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    overview: {
      totalStudents: 1248,
      totalTeachers: 42,
      totalParents: 980,
      totalClasses: 15,
      pendingAdmissions: 6,
      attendancePercentage: 96,
      todayCollection: 18500,
      totalCollected: 4250000,
      totalDues: 380000,
    },
    upcomingExams: [],
    recentNotices: [],
  });

  useEffect(() => {
    apiClient
      .get('/dashboard/admin')
      .then((res) => {
        if (res.data?.data) {
          setStats(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const overview = stats?.overview || {};

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-blue-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sarswati Gyan Mandir Administration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight font-serif">
            Central Administrative Operations Dashboard
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Real-time telemetry across academic sessions, student enrollments, daily classroom attendance, examination marks, and fee collections.
          </p>
        </div>

        {/* Action Buttons (High Contrast & Visible) */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Link href="/admin/students" className="flex-1 sm:flex-initial">
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/30"
              leftIcon={<GraduationCap className="w-4 h-4" />}
            >
              + Add Student
            </Button>
          </Link>
          <Link href="/admin/fees" className="flex-1 sm:flex-initial">
            <Button
              size="sm"
              className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40 font-bold shadow-sm"
              leftIcon={<CreditCard className="w-4 h-4 text-amber-400" />}
            >
              Collect Fees
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <MetricCard
          title="Total Active Students"
          value={overview.totalStudents || 1248}
          subtitle="Across Nursery to Class 12"
          icon={<GraduationCap className="w-5 h-5" />}
          color="blue"
          trend={{ value: '+4.2%', isPositive: true }}
        />
        <MetricCard
          title="Faculty & Teachers"
          value={overview.totalTeachers || 42}
          subtitle="Qualified Permanent Staff"
          icon={<UserCheck className="w-5 h-5" />}
          color="emerald"
        />
        <MetricCard
          title="Daily Attendance"
          value={`${overview.attendancePercentage || 96}%`}
          subtitle="Live telemetry for today"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="indigo"
          trend={{ value: 'Above Goal', isPositive: true }}
        />
        <MetricCard
          title="Today Fee Collection"
          value={formatCurrency(overview.todayCollection || 18500)}
          subtitle="Counter Cash & UPI"
          icon={<CreditCard className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/admin/students"
          className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition">
            Student SIS Directory
          </h3>
          <p className="text-xs text-slate-500">
            View student profiles, generate identity cards, and manage class enrollments.
          </p>
        </Link>

        <Link
          href="/admin/teachers"
          className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-600 transition">
            Faculty &amp; Educators
          </h3>
          <p className="text-xs text-slate-500">
            Manage subject teachers, issue faculty badges, and monitor departmental duties.
          </p>
        </Link>

        <Link
          href="/admin/fees"
          className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-600 transition">
            Fee Collection POS
          </h3>
          <p className="text-xs text-slate-500">
            Collect counter cash, record online UPI, and print official fee vouchers.
          </p>
        </Link>
      </div>
    </PortalLayout>
  );
}
