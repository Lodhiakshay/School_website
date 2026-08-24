'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  UserCheck,
  CalendarCheck,
  Bell,
  Sparkles,
  CheckCircle2,
  Clock,
  Printer,
  Send,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';

export default function PrincipalDashboardPage() {
  const { toast } = useToast();

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'app_01',
      title: 'Class 10-A Half Yearly Science Marksheets',
      submittedBy: 'Shri Dinesh Gupta (HOD Maths)',
      studentsCount: 38,
      date: 'Today, 10:30 AM',
      status: 'pending',
    },
    {
      id: 'app_02',
      title: 'Class 12-B Physics Practical Internal Marks',
      submittedBy: 'Smt. Sunita Verma (Vice Principal)',
      studentsCount: 42,
      date: 'Yesterday, 04:15 PM',
      status: 'pending',
    },
    {
      id: 'app_03',
      title: 'Transfer Certificate Application #TC-2026-089',
      submittedBy: 'Admission Office (Student: Rahul Yadav)',
      studentsCount: 1,
      date: '24 Aug 2026',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: string, title: string) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Approved: ${title}`, 'Principal Executive Sign-Off');
  };

  return (
    <PortalLayout allowedRoles={['Principal', 'SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Executive Banner */}
        <div className="bg-gradient-to-r from-[#002060] via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-800/40">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-900 flex-shrink-0 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Dr. Ramesh Sharma"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black bg-amber-400/20 text-amber-300 px-3 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-amber-400" /> Principal &amp; Director Desk
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-serif tracking-tight">
                Dr. Ramesh Kumar Sharma
              </h1>
              <p className="text-xs text-blue-200">
                M.Sc. (Physics), M.Ed., Ph.D. • Institutional Academic Governance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/results"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition shadow-md"
            >
              Verify Marksheets
            </Link>
            <Link
              href="/admin/notices"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition"
            >
              Broadcast Notice
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Enrolled Scholars"
            value="1,248"
            subtitle="Nursery to Class 12"
            icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
            color="blue"
          />
          <MetricCard
            title="Faculty Educators"
            value="42 Teachers"
            subtitle="100% Present Today"
            icon={<UserCheck className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          />
          <MetricCard
            title="Campus Attendance"
            value="96.2%"
            subtitle="1,201 Students Present"
            icon={<CalendarCheck className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          />
          <MetricCard
            title="Pending Sign-Offs"
            value={`${pendingApprovals.length} Requests`}
            subtitle="Marksheets &amp; TCs"
            icon={<Award className="w-5 h-5 text-amber-600" />}
            color="amber"
          />
        </div>

        {/* Executive Action Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pending Approvals */}
          <Card className="lg:col-span-7 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" /> Academic Approvals Queue
              </CardTitle>
              <Badge size="sm" variant="warning">
                {pendingApprovals.length} Pending
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              {pendingApprovals.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">All submissions have been approved!</p>
                  <p>No pending marksheets or certificates awaiting sign-off.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition">
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500">{item.submittedBy}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs"
                          onClick={() => handleApprove(item.id, item.title)}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Institutional Notice Board */}
          <Card className="lg:col-span-5 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5">
              <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" /> Active Campus Circulars
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-blue-700 uppercase">UP Board Circular</span>
                  <span className="text-[10px] text-slate-400">Today</span>
                </div>
                <h5 className="font-bold text-slate-900">High School &amp; Inter Examination Form Submission</h5>
                <p className="text-slate-600 text-[11px]">Final date for submitting examination fee vouchers is 30 September 2026.</p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-amber-700 uppercase">Sports Department</span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <h5 className="font-bold text-slate-900">District Inter-School Athletics Meet</h5>
                <p className="text-slate-600 text-[11px]">24 student athletes selected for Farrukhabad regional trials.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}
