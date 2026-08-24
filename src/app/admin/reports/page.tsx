'use client';

import React from 'react';
import {
  BarChart3,
  Download,
  Printer,
  Users,
  CreditCard,
  Award,
  BookOpen,
  Bus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

export default function ReportsAdminPage() {
  const { toast } = useToast();

  const reportPacks = [
    {
      title: 'Student Enrollment Master Ledger (Session 2026-27)',
      desc: 'Complete roster of 1,248 enrolled students with admission IDs, class assignments, father contacts, and gender ratios.',
      category: 'Demographics & SIS',
      icon: <Users className="w-5 h-5 text-blue-600" />,
      stats: '1,248 Records',
      filename: 'sgm_student_enrollment_ledger_2026.csv',
    },
    {
      title: 'Fee Collection, POS Counter & Dues Statement',
      desc: 'Monthly financial statement covering tuition collection, bus charges, lab fees, and outstanding ledger dues.',
      category: 'Finance & Accounts',
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
      stats: '₹ 42.5 Lakhs Collected',
      filename: 'sgm_financial_collection_statement.csv',
    },
    {
      title: 'UP Board Academic & Examination Score Analytics',
      desc: 'Subject-wise performance matrix for High School & Intermediate terminal tests, division summaries, and topper rosters.',
      category: 'Academic Evaluation',
      icon: <Award className="w-5 h-5 text-purple-600" />,
      stats: '99.4% Pass Rate',
      filename: 'sgm_academic_board_scorecard_2026.csv',
    },
    {
      title: 'Faculty Attendance & Workload Distribution',
      desc: 'Teaching hours, assigned periods, leave balances, and departmental responsibilities across 42 permanent educators.',
      category: 'Human Resources',
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      stats: '42 Active Faculty',
      filename: 'sgm_faculty_workload_audit.csv',
    },
    {
      title: 'Central Library Stock & Circulation Register',
      desc: '5,000+ book inventory audit, accession numbers, issued books, returned copies, and overdue statistics.',
      category: 'Library Science',
      icon: <BookOpen className="w-5 h-5 text-sky-600" />,
      stats: '5,240 Volumes',
      filename: 'sgm_library_circulation_register.csv',
    },
    {
      title: 'School Transport & Bus Commuter Safety Ledger',
      desc: 'Route stops, driver compliance certificates, vehicle fitness logs, and student route allocation lists.',
      category: 'Operations & Fleet',
      icon: <Bus className="w-5 h-5 text-rose-600" />,
      stats: '4 Active Routes',
      filename: 'sgm_transport_route_ledger.csv',
    },
  ];

  const handleDownload = (filename: string, title: string) => {
    toast.success(`Exporting ${title} (${filename})...`, 'Ledger Exported');
  };

  const handlePrint = (title: string) => {
    window.print();
    toast.success(`Print preview launched for ${title}.`, 'Print Ready');
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Accountant']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <BarChart3 className="w-5 h-5 text-blue-600" /> Central Reports, Ledgers &amp; Statutory Audits
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Export comprehensive institutional statements, student directories, financial ledgers, and academic matrices.
            </p>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 font-bold"
            onClick={() => handleDownload('sgm_complete_institutional_dump_2026.zip', 'Complete School Data Archive')}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export All Ledgers (ZIP)
          </Button>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reportPacks.map((r, idx) => (
            <Card
              key={idx}
              className="border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex-shrink-0">
                    {r.icon}
                  </div>
                  <Badge size="sm" variant="info">
                    {r.category}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-slate-900 font-serif leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{r.desc}</p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Key Stat:</span>
                  <span className="text-blue-700 font-mono">{r.stats}</span>
                </div>

                <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => handlePrint(r.title)}
                    leftIcon={<Printer className="w-3.5 h-3.5" />}
                  >
                    Print
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                    onClick={() => handleDownload(r.filename, r.title)}
                    leftIcon={<Download className="w-3.5 h-3.5 text-amber-400" />}
                  >
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
