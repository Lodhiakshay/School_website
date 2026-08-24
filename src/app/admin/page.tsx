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
    apiClient.get('/dashboard/admin').then((res) => {
      if (res.data?.data) {
        setStats(res.data.data);
      }
    }).catch(() => {});
  }, []);

  const overview = stats?.overview || {};

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sarswati Gyan Mandir Administration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Central Administrative Operations Dashboard
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Real-time telemetry across academic sessions, student enrollments, daily classroom attendance, examination marks, and fee collections.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/admin/students">
            <Button size="sm" variant="primary" leftIcon={<GraduationCap className="w-3.5 h-3.5" />}>
              + Add Student
            </Button>
          </Link>
          <Link href="/admin/fees">
            <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Collect Fees
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          subtitle="PGT & TGT Instructors"
          icon={<UserCheck className="w-5 h-5" />}
          color="emerald"
        />
        <MetricCard
          title="Today's Attendance"
          value={`${overview.attendancePercentage || 96}%`}
          subtitle="Daily Present Roster"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="indigo"
          trend={{ value: 'Normal', isPositive: true }}
        />
        <MetricCard
          title="Today's Fee Collection"
          value={formatCurrency(overview.todayCollection || 18500)}
          subtitle={`Total Dues: ${formatCurrency(overview.totalDues || 380000)}`}
          icon={<CreditCard className="w-5 h-5" />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary &amp; Collection Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Collected</span>
                  <div className="text-lg font-bold text-emerald-600 mt-1">
                    {formatCurrency(overview.totalCollected || 4250000)}
                  </div>
                  <span className="text-[10px] text-slate-400">Current Session</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Pending Invoices</span>
                  <div className="text-lg font-bold text-amber-600 mt-1">
                    {formatCurrency(overview.totalDues || 380000)}
                  </div>
                  <span className="text-[10px] text-slate-400">Outstanding balance</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">New Inquiries</span>
                  <div className="text-lg font-bold text-blue-600 mt-1">
                    {overview.pendingAdmissions || 6}
                  </div>
                  <span className="text-[10px] text-slate-400">Awaiting review</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" /> Active School Notices
              </CardTitle>
              <Link href="/admin/notices" className="text-xs text-blue-600 font-semibold hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Independence Day Celebrations</span>
                  <Badge size="sm" variant="info">High</Badge>
                </div>
                <p className="text-slate-500 text-[11px]">All students and teachers are cordially invited for flag hoisting ceremony.</p>
                <span className="text-[10px] text-slate-400">15 Aug 2026</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}
