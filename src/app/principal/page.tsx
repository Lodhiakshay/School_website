'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  UserCheck,
  CalendarCheck,
  Bell,
  Sparkles,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { apiClient } from '../../lib/api-client';

export default function PrincipalDashboardPage() {
  const [stats, setStats] = useState<any>({
    overview: {
      totalStudents: 1248,
      totalTeachers: 42,
      attendancePercentage: 96,
      pendingAdmissions: 6,
    },
  });

  useEffect(() => {
    apiClient.get('/dashboard/admin').then((res) => {
      if (res.data?.data) setStats(res.data.data);
    }).catch(() => {});
  }, []);

  return (
    <PortalLayout allowedRoles={['Principal', 'SuperAdmin']}>
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Principal &amp; Director Executive Office</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Academic Governance &amp; Institutional Oversight
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Enrolled Students" value={stats.overview?.totalStudents || 1248} subtitle="Nursery - Class 12" icon={<GraduationCap className="w-5 h-5" />} color="blue" />
        <MetricCard title="Faculty Instructors" value={stats.overview?.totalTeachers || 42} subtitle="Full-Time Teachers" icon={<UserCheck className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Today's Attendance" value={`${stats.overview?.attendancePercentage || 96}%`} subtitle="Campus Present" icon={<CalendarCheck className="w-5 h-5" />} color="indigo" />
        <MetricCard title="Admission Inquiries" value={stats.overview?.pendingAdmissions || 6} subtitle="Awaiting Review" icon={<Award className="w-5 h-5" />} color="amber" />
      </div>
    </PortalLayout>
  );
}
