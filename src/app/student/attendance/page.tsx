'use client';

import React from 'react';
import {
  CalendarCheck,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Sparkles,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

export default function StudentAttendancePage() {
  const { toast } = useToast();

  const augustDays = [
    { day: '01 Aug 2026', status: 'Present', punch: '08:45 AM' },
    { day: '02 Aug 2026', status: 'Present', punch: '08:42 AM' },
    { day: '03 Aug 2026', status: 'Sunday', punch: '—' },
    { day: '04 Aug 2026', status: 'Present', punch: '08:48 AM' },
    { day: '05 Aug 2026', status: 'Present', punch: '08:50 AM' },
    { day: '06 Aug 2026', status: 'Present', punch: '08:41 AM' },
    { day: '07 Aug 2026', status: 'Present', punch: '08:44 AM' },
    { day: '08 Aug 2026', status: 'Present', punch: '08:46 AM' },
    { day: '09 Aug 2026', status: 'Present', punch: '08:40 AM' },
    { day: '10 Aug 2026', status: 'Sunday', punch: '—' },
    { day: '11 Aug 2026', status: 'Present', punch: '08:45 AM' },
    { day: '12 Aug 2026', status: 'Late', punch: '09:05 AM' },
    { day: '13 Aug 2026', status: 'Present', punch: '08:43 AM' },
    { day: '14 Aug 2026', status: 'Present', punch: '08:47 AM' },
    { day: '15 Aug 2026', status: 'Holiday (Independence Day)', punch: '08:00 AM Event' },
    { day: '16 Aug 2026', status: 'Present', punch: '08:45 AM' },
    { day: '17 Aug 2026', status: 'Sunday', punch: '—' },
    { day: '18 Aug 2026', status: 'Present', punch: '08:42 AM' },
    { day: '19 Aug 2026', status: 'Present', punch: '08:49 AM' },
    { day: '20 Aug 2026', status: 'Medical Leave', punch: '—' },
    { day: '21 Aug 2026', status: 'Present', punch: '08:44 AM' },
    { day: '22 Aug 2026', status: 'Present', punch: '08:43 AM' },
    { day: '23 Aug 2026', status: 'Present', punch: '08:46 AM' },
    { day: '24 Aug 2026', status: 'Present', punch: '08:40 AM' },
  ];

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin', 'Admin', 'Parent', 'Principal']}>
      <div className="space-y-6 pt-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <CalendarCheck className="w-5 h-5 text-blue-600" /> Academic Attendance Record (Session 2026-27)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Daily biometric punch telemetry, monthly presence percentage, and UP Board eligibility threshold.
            </p>
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
            Print Attendance Sheet
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Cumulative Attendance</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-800 mt-1">96.4%</div>
            <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ Board Threshold: 75%</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Working Days</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">112 Days</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 shadow-sm">
            <span className="text-[10px] font-bold text-blue-700 uppercase">Present Days</span>
            <div className="text-xl sm:text-2xl font-black text-blue-800 mt-1">108 Days</div>
          </div>
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 shadow-sm">
            <span className="text-[10px] font-bold text-rose-700 uppercase">Leaves / Absences</span>
            <div className="text-xl sm:text-2xl font-black text-rose-700 mt-1">4 Days</div>
          </div>
        </div>

        {/* Monthly Register Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Daily Punch Telemetry — August 2026
            </CardTitle>
            <Badge size="sm" variant="success">
              21 / 22 Days Present (95.4%)
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 font-mono">Biometric Punch Time</th>
                    <th className="p-3.5">Remarks / Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {augustDays.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{d.day}</td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border inline-block whitespace-nowrap ${
                            d.status === 'Present'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : d.status.includes('Holiday')
                              ? 'bg-purple-100 text-purple-800 border-purple-200'
                              : d.status === 'Late'
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : d.status === 'Sunday'
                              ? 'bg-slate-100 text-slate-500 border-slate-200'
                              : d.status.includes('Leave')
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-rose-100 text-rose-800 border-rose-200'
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">{d.punch}</td>
                      <td className="p-3.5 text-[11px] text-slate-500 whitespace-nowrap">
                        {d.status === 'Present' ? 'Verified by Class 10A Incharge' : d.status}
                      </td>
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
