'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, GraduationCap, CalendarCheck, Award, BookOpen, Receipt, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';

export default function ParentDashboardPage() {
  const children = [
    {
      id: '1',
      name: 'Aarav Sharma',
      class: 'Class 10 (Section A)',
      admNo: 'SGM-2026-0001',
      rollNo: 1,
      attendance: '96.4%',
      rank: 'Rank #1',
      score: '87.33% (A1)',
      dues: '₹ 0',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      name: 'Ananya Sharma',
      class: 'Class 6 (Section A)',
      admNo: 'SGM-2026-0042',
      rollNo: 4,
      attendance: '98.1%',
      rank: 'Rank #2',
      score: '91.50% (A1)',
      dues: '₹ 0',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const [active, setActive] = useState(children[0]);

  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
      {/* Parent Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-black bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Parent Portal Desk • Guardian: Shri Rajesh Kumar Sharma</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight font-serif">
            Children Academic Performance Hub
          </h1>
          <p className="text-xs text-slate-300">
            Switch between your enrolled children below to inspect real-time classroom telemetry, report cards, and fee receipts.
          </p>
        </div>

        {/* Multi-Child Switcher Buttons with Avatars */}
        <div className="flex flex-wrap items-center gap-3">
          {children.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-black transition-all border ${
                active.id === c.id
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-white/40 flex-shrink-0">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Child Dossier */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-blue-900 shadow-md flex-shrink-0">
            <img src={active.image} alt={active.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Selected Child
            </span>
            <h2 className="text-lg font-black text-slate-900 font-serif">{active.name}</h2>
            <p className="text-xs text-slate-600 font-medium">
              {active.class} • Roll No: <strong>{active.rollNo}</strong> • Adm No: <strong className="font-mono text-blue-700">{active.admNo}</strong>
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/parent/results">
            <Button size="sm" variant="primary" className="bg-blue-700 hover:bg-blue-800 font-bold" leftIcon={<Award className="w-4 h-4" />}>
              Download Report Card
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MetricCard
          title="Classroom Attendance"
          value={active.attendance}
          subtitle="Above Board Threshold (75%)"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="emerald"
        />
        <MetricCard
          title="Terminal Exam Rank"
          value={active.rank}
          subtitle={`Score: ${active.score}`}
          icon={<Award className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          title="School Fee Status"
          value={active.dues}
          subtitle="Term 1 Cleared"
          icon={<Receipt className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Navigation Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/parent/attendance" className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <h3 className="font-black text-sm text-slate-900 group-hover:text-emerald-700">Detailed Attendance Sheet</h3>
          <p className="text-xs text-slate-500">View month-wise presence records and leave history.</p>
        </Link>
        <Link href="/parent/results" className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-black text-sm text-slate-900 group-hover:text-blue-700">Terminal Report Cards</h3>
          <p className="text-xs text-slate-500">Inspect subject-wise theory &amp; practical marks with official signatures.</p>
        </Link>
        <Link href="/parent/fees" className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2 group">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Receipt className="w-5 h-5" />
          </div>
          <h3 className="font-black text-sm text-slate-900 group-hover:text-amber-700">Fee Receipts &amp; Dues</h3>
          <p className="text-xs text-slate-500">Download and print official fee vouchers and payment receipts.</p>
        </Link>
      </div>
    </PortalLayout>
  );
}
