'use client';

import React, { useState } from 'react';
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
  Calendar,
  FileSpreadsheet,
  CheckCircle2,
  Eye,
  X,
  FileText,
  Filter,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { useToast } from '../../../components/ui/toast';

interface ReportPack {
  id: string;
  title: string;
  desc: string;
  category: string;
  stats: string;
  filename: string;
  headers: string[];
  sampleRows: (string | number)[][];
}

const REPORT_PACKS: ReportPack[] = [
  {
    id: 'student-roster',
    title: 'Student Enrollment Master Dossier (Session 2026-27)',
    desc: 'Complete roster of 1,248 enrolled scholars with admission IDs, class assignments, father contacts, category, and gender metrics.',
    category: 'Demographics & SIS',
    stats: '1,248 Records',
    filename: 'sgm_student_enrollment_ledger_2026.csv',
    headers: ['Admission No', 'Roll No', 'Student Name', 'Class & Section', 'Father Name', 'Contact Phone', 'Category', 'Status'],
    sampleRows: [
      ['SGM-2026-1001', '10-A-01', 'Aarav Sharma', 'Class 10-A', 'Shri Rajesh Sharma', '+91 98765 43210', 'GEN', 'Active'],
      ['SGM-2026-1002', '10-A-02', 'Ananya Gupta', 'Class 10-A', 'Shri Sunil Gupta', '+91 98765 43211', 'OBC', 'Active'],
      ['SGM-2026-1003', '10-A-03', 'Divyanshu Singh', 'Class 10-A', 'Shri Virendra Singh', '+91 98765 43212', 'GEN', 'Active'],
      ['SGM-2026-1004', '10-A-04', 'Harshit Dubey', 'Class 10-A', 'Shri Manoj Dubey', '+91 98765 43213', 'GEN', 'Active'],
      ['SGM-2026-1005', '10-A-05', 'Ishita Verma', 'Class 10-A', 'Shri Alok Verma', '+91 98765 43214', 'OBC', 'Active'],
      ['SGM-2026-1201', '12-A-01', 'Rohan Verma', 'Class 12-A (PCM)', 'Shri Prem Verma', '+91 98765 43215', 'OBC', 'Active'],
      ['SGM-2026-1202', '12-B-01', 'Priya Singh', 'Class 12-B (PCB)', 'Shri Ranveer Singh', '+91 98765 43216', 'GEN', 'Active'],
    ],
  },
  {
    id: 'fee-collection',
    title: 'Financial Fee Collection & Counter POS Statement',
    desc: 'Monthly financial statement covering tuition collection, bus charges, lab fees, and outstanding ledger balance dues.',
    category: 'Finance & Accounts',
    stats: '₹ 42.5 Lakhs Collected',
    filename: 'sgm_financial_collection_statement_2026.csv',
    headers: ['Receipt No', 'Invoice ID', 'Student Name', 'Admission No', 'Term', 'Amount (₹)', 'Payment Mode', 'Txn Ref ID', 'Date'],
    sampleRows: [
      ['REC-2026-1001-Q1', 'INV-2026-1001', 'Aarav Sharma', 'SGM-2026-1001', 'Q1 Tuition & Dev', '6,500', 'UPI / NetBanking', 'UPI-2026-9812401', '10 Apr 2026'],
      ['REC-2026-1001-Q2', 'INV-2026-1001', 'Aarav Sharma', 'SGM-2026-1001', 'Q2 Tuition & Science Lab', '5,800', 'Counter Cash POS', 'POS-CASH-8910', '08 Jul 2026'],
      ['REC-2026-1002-Q1', 'INV-2026-1002', 'Ananya Gupta', 'SGM-2026-1002', 'Q1 Tuition & Annual', '5,800', 'Counter Cash POS', 'POS-CASH-8914', '11 Apr 2026'],
      ['REC-2026-1201-Q1', 'INV-2026-1201', 'Rohan Verma', 'SGM-2026-1201', 'Q1 Inter PCM Lab', '6,800', 'UPI / QR Scan', 'UPI-2026-4412091', '12 Apr 2026'],
      ['REC-2026-1202-Q1', 'INV-2026-1202', 'Priya Singh', 'SGM-2026-1202', 'Q1 Inter PCB Lab', '6,400', 'Counter Cash POS', 'POS-CASH-9002', '14 Apr 2026'],
    ],
  },
  {
    id: 'exam-performance',
    title: 'UP Board Academic & Examination Score Analytics',
    desc: 'Subject-wise performance matrix for High School & Intermediate terminal tests, marks breakdown, and division rank rosters.',
    category: 'Academic Evaluation',
    stats: '99.4% Pass Rate',
    filename: 'sgm_academic_board_scorecard_2026.csv',
    headers: ['Roll No', 'Student Name', 'Hindi (100)', 'English (100)', 'Math (100)', 'Science (100)', 'SST (100)', 'Sanskrit (100)', 'Total (600)', 'Percent', 'Rank'],
    sampleRows: [
      ['10-A-01', 'Aarav Sharma', '88', '84', '96', '93', '86', '89', '536', '89.33%', 'Rank #1'],
      ['10-A-02', 'Ananya Gupta', '86', '82', '92', '89', '84', '88', '521', '86.83%', 'Rank #2'],
      ['10-A-03', 'Divyanshu Singh', '84', '80', '88', '85', '82', '85', '504', '84.00%', 'Rank #3'],
      ['10-A-04', 'Harshit Dubey', '82', '78', '82', '80', '80', '83', '485', '80.83%', 'Rank #4'],
      ['10-A-05', 'Ishita Verma', '80', '76', '78', '76', '78', '81', '469', '78.16%', 'Rank #5'],
    ],
  },
  {
    id: 'faculty-workload',
    title: 'Faculty Workload & Departmental Audit Ledger',
    desc: 'Teaching hours, assigned periods, leave balances, and departmental responsibilities across 42 permanent educators.',
    category: 'Human Resources',
    stats: '42 Active Faculty',
    filename: 'sgm_faculty_workload_audit_2026.csv',
    headers: ['Emp ID', 'Faculty Name', 'Department', 'Designation', 'Assigned Classes', 'Weekly Periods', 'Attendance', 'Status'],
    sampleRows: [
      ['EMP-001', 'Dr. Ramesh Kumar Sharma', 'Physics', 'Principal', 'Class 12 Physics Special', '8 Periods', '100%', 'Active'],
      ['EMP-012', 'Shri Dinesh Gupta', 'Mathematics', 'HOD Mathematics', 'Class 10-A, 12-A, 9-B', '24 Periods', '98%', 'Active'],
      ['EMP-014', 'Dr. Anita Srivastava', 'Physics', 'Senior Lecturer', 'Class 10-A, 11-A, 12-A', '22 Periods', '96%', 'Active'],
      ['EMP-018', 'Smt. Geeta Dixit', 'Hindi', 'Senior Lecturer', 'Class 9-A, 10-A, 11-B', '20 Periods', '95%', 'Active'],
      ['EMP-022', 'Shri Vikramaditya Singh', 'English', 'Lecturer', 'Class 10-A, 11-A, 12-B', '22 Periods', '97%', 'Active'],
      ['EMP-025', 'Smt. Sunita Verma', 'Primary Wing', 'Primary Coordinator', 'Class 1 to 5 Foundational', '26 Periods', '99%', 'Active'],
    ],
  },
  {
    id: 'library-stock',
    title: 'Central Knowledge Library Stock & Circulation Register',
    desc: '5,000+ book inventory audit, accession numbers, issued books, returned copies, and overdue statistics.',
    category: 'Library Science',
    stats: '5,240 Volumes',
    filename: 'sgm_library_circulation_register_2026.csv',
    headers: ['Accession No', 'Book Title', 'Author / Publication', 'Subject Category', 'Shelf Rack', 'Total Copies', 'Issued', 'Available'],
    sampleRows: [
      ['ACC-1001', 'NCERT Physics Class 12 (Part 1 & 2)', 'NCERT Editorial Directorate', 'Physics Science', 'Rack A-01', '40', '32', '8'],
      ['ACC-1045', 'Higher Algebra & Calculus Handbook', 'Hall & Knight', 'Mathematics', 'Rack A-04', '25', '18', '7'],
      ['ACC-2010', 'Comprehensive Organic Chemistry', 'Dr. O.P. Tandon', 'Chemistry Science', 'Rack B-02', '30', '24', '6'],
      ['ACC-3004', 'NCERT Biology Textbook (Class 11 & 12)', 'NCERT Publication', 'Life Sciences', 'Rack B-05', '35', '28', '7'],
      ['ACC-4012', 'Vedic Mathematics & Arithmetic Sutras', 'Swami Bharati Krishna Tirtha', 'Mathematics', 'Rack C-01', '20', '12', '8'],
    ],
  },
  {
    id: 'transport-fleet',
    title: 'School Transport & Bus Commuter Safety Ledger',
    desc: 'Route stops, driver compliance certificates, vehicle fitness logs, and student route allocation lists.',
    category: 'Operations & Fleet',
    stats: '4 Active Routes',
    filename: 'sgm_transport_route_ledger_2026.csv',
    headers: ['Vehicle No', 'Route Name', 'Coverage Stops', 'Assigned Driver', 'Driver Phone', 'Capacity', 'Enrolled Scholars', 'GPS Status'],
    sampleRows: [
      ['UP-76-T-1201', 'Route 1 (Shamsabad Highway)', 'Bus Stand, Chauraha, Mandi, Bypass', 'Shri Ramakant Yadav', '+91 9451234701', '42 Seats', '38 Students', 'Active Live GPS'],
      ['UP-76-T-1202', 'Route 2 (Kaimganj Sector)', 'Kaimganj Station, Subhash Chowk, Toll', 'Shri Surendra Kumar', '+91 9451234702', '42 Seats', '40 Students', 'Active Live GPS'],
      ['UP-76-T-1203', 'Route 3 (Mohammadabad Line)', 'Block Office, Gandhi Nagar, Hospital', 'Shri Shivpal Singh', '+91 9451234703', '36 Seats', '32 Students', 'Active Live GPS'],
      ['UP-76-T-1204', 'Route 4 (Nawabganj Rural Link)', 'Nawabganj Bazar, Police Chowki, Bridge', 'Shri Devendra Verma', '+91 9451234704', '36 Seats', '34 Students', 'Active Live GPS'],
    ],
  },
];

export default function ReportsAdminPage() {
  const { toast } = useToast();
  const [selectedPack, setSelectedPack] = useState<ReportPack | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const handleDownloadCsv = (pack: ReportPack) => {
    const csvContent =
      pack.headers.join(',') +
      '\n' +
      pack.sampleRows.map((row) => row.map((c) => `"${c}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', pack.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Generated and downloaded ${pack.filename}`, 'Report Exported');
  };

  const handlePrint = (title: string) => {
    window.print();
    toast.success(`Print preview launched for ${title}.`, 'Print Ready');
  };

  const filteredPacks =
    activeCategory === 'all'
      ? REPORT_PACKS
      : REPORT_PACKS.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Demographics & SIS':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'Finance & Accounts':
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case 'Academic Evaluation':
        return <Award className="w-5 h-5 text-purple-600" />;
      case 'Human Resources':
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case 'Library Science':
        return <BookOpen className="w-5 h-5 text-sky-600" />;
      case 'Operations & Fleet':
        return <Bus className="w-5 h-5 text-rose-600" />;
      default:
        return <FileSpreadsheet className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Accountant']}>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" /> Central Academic &amp; Statutory Ledgers
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 font-serif">
              Institutional Reports, Ledgers &amp; Audits
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Export verified CSV datasets, student demographics dossiers, terminal marksheet matrices, and statutory finance ledgers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePrint('All Central Reports')}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Master Summary
            </Button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Ledgers (6)' },
            { id: 'Demographics', label: 'Student SIS' },
            { id: 'Finance', label: 'Financial POS' },
            { id: 'Academic', label: 'Board Examination' },
            { id: 'Human', label: 'Faculty HR' },
            { id: 'Library', label: 'Library Stock' },
            { id: 'Operations', label: 'Transport Fleet' },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-[#002060] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Master Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPacks.map((pack) => (
            <Card
              key={pack.id}
              className="border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getCategoryIcon(pack.category)}
                  </div>
                  <Badge variant="outline" size="sm">
                    {pack.stats}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">
                    {pack.category}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 font-serif leading-snug">{pack.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{pack.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedPack(pack)}
                    leftIcon={<Eye className="w-3.5 h-3.5 text-slate-600" />}
                  >
                    Inspect Ledger
                  </Button>

                  <Button
                    size="sm"
                    className="bg-[#002060] hover:bg-blue-900 font-bold text-xs"
                    onClick={() => handleDownloadCsv(pack)}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    CSV Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEDGER DATA INSPECTION MODAL                                              */}
      {/* ========================================================================= */}
      {selectedPack && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 border-2 border-slate-900 my-auto text-xs">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider font-mono">
                  CENTRAL REPOSITORY LEDGER PREVIEW
                </span>
                <h3 className="text-base font-black text-slate-900 font-serif">{selectedPack.title}</h3>
                <p className="text-[11px] text-slate-500">{selectedPack.desc}</p>
              </div>
              <button
                onClick={() => setSelectedPack(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
              <div className="overflow-x-auto max-h-80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-[10px] font-black uppercase text-slate-600 tracking-wider sticky top-0 border-b border-slate-200">
                    <tr>
                      {selectedPack.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 bg-white font-medium">
                    {selectedPack.sampleRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-3 whitespace-nowrap text-slate-800">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Official Certification Footer */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/images/stamps/principal-round-seal.png"
                  alt="Official Round Seal Muhar"
                  className="w-10 h-10 object-contain opacity-90"
                />
                <div>
                  <span className="font-bold text-slate-800 block text-xs">Verified Institutional Master Record</span>
                  <span className="text-[10px] text-slate-400">UP Board Affiliation: UP-FBD-2026-SGM-089</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.print();
                    toast.success('Generated printable document statement.', 'Print Ready');
                  }}
                  leftIcon={<Printer className="w-4 h-4" />}
                >
                  Print Ledger
                </Button>
                <Button
                  size="sm"
                  className="bg-[#002060] hover:bg-blue-900 font-bold"
                  onClick={() => handleDownloadCsv(selectedPack)}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Export CSV ({selectedPack.filename})
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
