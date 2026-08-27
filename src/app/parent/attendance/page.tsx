'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Printer,
  Sparkles,
  User,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

export default function ParentAttendancePage() {
  const [selectedChild, setSelectedChild] = useState<'aarav' | 'ananya'>('aarav');
  const { toast } = useToast();

  const aaravAttendance = {
    name: 'Aarav Sharma (Class 10-A • SGM-2026-1001)',
    rate: '96.4%',
    presentDays: 108,
    totalDays: 112,
    leaves: 4,
    status: 'Eligible for UP Board Exam',
    recentPunches: [
      { date: '24 Aug 2026', status: 'Present', time: '08:40 AM', verifiedBy: 'Shri Dinesh Gupta' },
      { date: '23 Aug 2026', status: 'Present', time: '08:46 AM', verifiedBy: 'Shri Dinesh Gupta' },
      { date: '22 Aug 2026', status: 'Present', time: '08:43 AM', verifiedBy: 'Shri Dinesh Gupta' },
      { date: '21 Aug 2026', status: 'Present', time: '08:44 AM', verifiedBy: 'Shri Dinesh Gupta' },
      { date: '20 Aug 2026', status: 'Medical Leave', time: '—', verifiedBy: 'Leave Application' },
      { date: '19 Aug 2026', status: 'Present', time: '08:49 AM', verifiedBy: 'Shri Dinesh Gupta' },
    ],
  };

  const ananyaAttendance = {
    name: 'Ananya Sharma (Class 7-B • SGM-2026-0704)',
    rate: '98.2%',
    presentDays: 110,
    totalDays: 112,
    leaves: 2,
    status: 'Outstanding Attendance',
    recentPunches: [
      { date: '24 Aug 2026', status: 'Present', time: '08:38 AM', verifiedBy: 'Smt. Anjali Sharma' },
      { date: '23 Aug 2026', status: 'Present', time: '08:42 AM', verifiedBy: 'Smt. Anjali Sharma' },
      { date: '22 Aug 2026', status: 'Present', time: '08:40 AM', verifiedBy: 'Smt. Anjali Sharma' },
      { date: '21 Aug 2026', status: 'Present', time: '08:39 AM', verifiedBy: 'Smt. Anjali Sharma' },
      { date: '20 Aug 2026', status: 'Present', time: '08:41 AM', verifiedBy: 'Smt. Anjali Sharma' },
      { date: '19 Aug 2026', status: 'Present', time: '08:35 AM', verifiedBy: 'Smt. Anjali Sharma' },
    ],
  };

  const current = selectedChild === 'aarav' ? aaravAttendance : ananyaAttendance;

  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6 pt-1">
        {/* Header Ribbon & Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <CalendarCheck className="w-5 h-5 text-blue-600" /> Child Attendance Telemetry
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Live biometric entry logs, class register sync, and automated SMS alert records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedChild('aarav')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedChild === 'aarav' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Aarav (Class 10)
              </button>
              <button
                type="button"
                onClick={() => setSelectedChild('ananya')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedChild === 'ananya' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                Ananya (Class 7)
              </button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Attendance Certificate.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Cumulative Presence</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-800 mt-1">{current.rate}</div>
            <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {current.status}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Working Days</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{current.totalDays} Days</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 shadow-sm">
            <span className="text-[10px] font-bold text-blue-700 uppercase">Days Attended</span>
            <div className="text-xl sm:text-2xl font-black text-blue-800 mt-1">{current.presentDays} Days</div>
          </div>
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 shadow-sm">
            <span className="text-[10px] font-bold text-rose-700 uppercase">Recorded Leaves</span>
            <div className="text-xl sm:text-2xl font-black text-rose-700 mt-1">{current.leaves} Days</div>
          </div>
        </div>

        {/* Recent Telemetry Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Recent Daily Log &bull; {current.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 font-mono">Entry Time</th>
                    <th className="p-3.5">Verification By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {current.recentPunches.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{p.date}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border inline-block whitespace-nowrap ${
                            p.status === 'Present'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : p.status.includes('Leave')
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-rose-100 text-rose-800 border-rose-200'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">{p.time}</td>
                      <td className="p-3.5 text-[11px] text-slate-500 whitespace-nowrap">{p.verifiedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
