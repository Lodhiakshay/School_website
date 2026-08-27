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
  CheckCircle2,
  Clock,
  Printer,
  Send,
  FileText,
  AlertCircle,
  ShieldCheck,
  Stamp,
  Users,
  Settings,
  Image as ImageIcon,
  FolderLock,
  BarChart3,
  Check,
  X,
  CreditCard,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { useToast } from '../../components/ui/toast';
import { apiClient } from '../../lib/api-client';

export default function PrincipalDashboardPage() {
  const { toast } = useToast();
  const [principalInfo, setPrincipalInfo] = useState<any>(null);

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'app_01',
      title: 'Class 10-A Half Yearly Science Marksheets (38 Students)',
      submittedBy: 'Shri Dinesh Gupta (HOD Mathematics & Evaluation)',
      type: 'marksheet',
      date: 'Today, 10:30 AM',
      status: 'pending',
    },
    {
      id: 'app_02',
      title: 'Class 12-B Physics Practical Assessment Ledgers (42 Students)',
      submittedBy: 'Dr. Anita Srivastava (Senior Physics Lecturer)',
      type: 'practical',
      date: 'Yesterday, 04:15 PM',
      status: 'pending',
    },
    {
      id: 'app_03',
      title: 'Transfer Certificate Application #TC-2026-089 (Rahul Yadav)',
      submittedBy: 'Central Admissions & Record Vault',
      type: 'tc',
      date: '24 Aug 2026',
      status: 'pending',
    },
    {
      id: 'app_04',
      title: 'Faculty Medical Leave Application (Smt. Geeta Dixit)',
      submittedBy: 'Hindi Department (Duration: 28-30 Aug)',
      type: 'leave',
      date: '25 Aug 2026',
      status: 'pending',
    },
  ]);

  const [endorsedApprovals, setEndorsedApprovals] = useState<any[]>([]);

  useEffect(() => {
    apiClient
      .get('/school/public-home')
      .then((res) => {
        if (res.data?.data?.principalDesk) {
          setPrincipalInfo(res.data.data.principalDesk);
        }
      })
      .catch(() => {});
  }, []);

  const handleApprove = (id: string, title: string) => {
    const item = pendingApprovals.find((p) => p.id === id);
    if (item) {
      setEndorsedApprovals((prev) => [{ ...item, endorsedAt: new Date().toLocaleTimeString() }, ...prev]);
    }
    setPendingApprovals((prev) => prev.filter((p) => p.id !== id));
    toast.success(`Affixed Principal Signature & Round Seal to: "${title}"`, 'Executive Sign-Off Recorded');
  };

  const principalName = principalInfo?.name || 'Dr. Ramesh Kumar Sharma';
  const principalQual = principalInfo?.qualifications || 'M.Sc. (Physics), M.Ed., Ph.D.';
  const signatureUrl = principalInfo?.signatureUrl || '/images/stamps/principal-signature.png';
  const roundSealUrl = principalInfo?.roundSealUrl || '/images/stamps/principal-round-seal.png';

  return (
    <PortalLayout allowedRoles={['Principal', 'SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Executive Banner */}
        <div className="bg-gradient-to-r from-[#002060] via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-800/40">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-900 flex-shrink-0 shadow-lg">
              <img
                src={principalInfo?.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'}
                alt={principalName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black bg-amber-400/20 text-amber-300 px-3 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-amber-400" /> Principal &amp; Executive Academic Director
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-serif tracking-tight">
                {principalName}
              </h1>
              <p className="text-xs text-blue-200">
                {principalQual} &bull; Institutional Academic Governance &bull; Affiliation: UP-FBD-2026-SGM-089
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/results"
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" /> Verify Marksheets
            </Link>
            <Link
              href="/admin/school-settings"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" /> School Settings CMS
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <MetricCard
            title="Enrolled Scholars (SIS)"
            value="1,248"
            subtitle="Nursery to Class 12 Board"
            icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
            color="blue"
          />
          <MetricCard
            title="Faculty & Educators"
            value="42 Teachers"
            subtitle="100% Present Today"
            icon={<UserCheck className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          />
          <MetricCard
            title="Campus Attendance Rate"
            value="96.2%"
            subtitle="1,201 Students Present"
            icon={<CalendarCheck className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          />
          <MetricCard
            title="Pending Sign-Offs"
            value={`${pendingApprovals.length} Queue Items`}
            subtitle="Marksheets, TCs & Leaves"
            icon={<Award className="w-5 h-5 text-amber-600" />}
            color="amber"
          />
        </div>

        {/* Executive Action Deck & Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pending Sign-Offs Queue */}
          <Card className="lg:col-span-7 border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" /> Executive Endorsement &amp; Approval Queue
              </CardTitle>
              <Badge size="sm" variant={pendingApprovals.length > 0 ? 'warning' : 'success'}>
                {pendingApprovals.length} Pending Sign-Offs
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              {pendingApprovals.length === 0 ? (
                <div className="p-10 text-center text-xs text-slate-500 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-slate-800 text-sm">All submissions have been endorsed!</h4>
                  <p className="text-slate-400">Digital signature and official round seal (*Muhar*) have been affixed.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            size="sm"
                            variant={item.type === 'marksheet' ? 'info' : item.type === 'tc' ? 'danger' : 'purple'}
                          >
                            {item.type.toUpperCase()}
                          </Badge>
                          <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                        </div>
                        <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500">{item.submittedBy}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs"
                          onClick={() => handleApprove(item.id, item.title)}
                          leftIcon={<Stamp className="w-3.5 h-3.5" />}
                        >
                          Sign &amp; Stamp
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Principal Verified Digital Seal & Signature Badge */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-black uppercase tracking-wider text-blue-900 text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Authorized Institutional Seal &amp; Signature
                </span>
                <Badge variant="success">Verified Active</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                {/* Round Seal Muhar */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Institutional Round Seal</span>
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src={roundSealUrl}
                      alt="Official Round Seal"
                      className="max-h-16 max-w-[70px] object-contain opacity-90"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 block font-bold">UP Board Code: 089</span>
                </div>

                {/* Digital Signature */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Digital Signature Stamp</span>
                  <div className="h-16 flex items-center justify-center">
                    <img
                      src={signatureUrl}
                      alt="Principal Signature"
                      className="max-h-12 max-w-[120px] object-contain filter contrast-125"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 block">{principalName}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                These cryptographic stamps are automatically affixed to verified student report cards, official fee vouchers, and Transfer Certificates (TC).
              </p>
            </div>

            {/* Quick Administrative Operations Shortcuts */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                Direct Administrative Controls
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/admin/students"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 transition font-bold flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-blue-600" /> Student SIS
                </Link>
                <Link
                  href="/admin/admissions"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 transition font-bold flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-600" /> Admissions CRM
                </Link>
                <Link
                  href="/admin/gallery"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 transition font-bold flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4 text-indigo-600" /> Media Gallery
                </Link>
                <Link
                  href="/admin/documents"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 transition font-bold flex items-center gap-2"
                >
                  <FolderLock className="w-4 h-4 text-purple-600" /> Document Vault
                </Link>
                <Link
                  href="/admin/reports"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 transition font-bold flex items-center gap-2 col-span-2"
                >
                  <BarChart3 className="w-4 h-4 text-amber-600" /> Master Ledgers &amp; Inspection Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
