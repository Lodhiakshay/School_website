'use client';

import React, { useState } from 'react';
import {
  Award,
  Printer,
  Download,
  Upload,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Save,
  BookOpen,
  Edit3,
  ListOrdered,
  Building2,
  Languages,
  Loader2,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { downloadElementAsPdf, printIsolatedDocument } from '../../../lib/pdf-download';
import { ClientPortal } from '../../../components/ui/client-portal';

const sgmLedger = [
  {
    _id: 'res_01',
    campus: 'sgm',
    rank: 1,
    rollNo: 1,
    studentName: 'Aarav Sharma',
    admNo: 'SGM-2026-1001',
    className: 'Class 10 (Section A)',
    math: 96,
    science: 93,
    hindi: 88,
    english: 84,
    sst: 86,
    sanskrit: 89,
    grandTotal: 536,
    maxGrandTotal: 600,
    percentage: 89.33,
    grade: 'A1',
    decision: 'PASSED (FIRST DIV WITH DISTINCTION)',
  },
  {
    _id: 'res_02',
    campus: 'sgm',
    rank: 2,
    rollNo: 2,
    studentName: 'Ananya Gupta',
    admNo: 'SGM-2026-1002',
    className: 'Class 10 (Section A)',
    math: 92,
    science: 89,
    hindi: 86,
    english: 82,
    sst: 84,
    sanskrit: 88,
    grandTotal: 521,
    maxGrandTotal: 600,
    percentage: 86.83,
    grade: 'A1',
    decision: 'PASSED (FIRST DIV)',
  },
  {
    _id: 'res_03',
    campus: 'sgm',
    rank: 3,
    rollNo: 3,
    studentName: 'Divyanshu Singh',
    admNo: 'SGM-2026-1003',
    className: 'Class 10 (Section A)',
    math: 88,
    science: 85,
    hindi: 84,
    english: 80,
    sst: 82,
    sanskrit: 85,
    grandTotal: 504,
    maxGrandTotal: 600,
    percentage: 84.0,
    grade: 'A2',
    decision: 'PASSED (FIRST DIV)',
  },
];

const sssdLedger = [
  {
    _id: 'sssd_res_01',
    campus: 'sssd',
    rank: 1,
    rollNo: 1,
    studentName: 'Aarav Malhotra',
    admNo: 'SSSD-2026-501',
    className: 'Class 5 (Rose Section)',
    math: 98,
    science: 95,
    hindi: 90,
    english: 96,
    sst: 92,
    sanskrit: 94,
    grandTotal: 565,
    maxGrandTotal: 600,
    percentage: 94.17,
    grade: 'A1',
    decision: 'OUTSTANDING (CBSE MERIT)',
  },
  {
    _id: 'sssd_res_02',
    campus: 'sssd',
    rank: 2,
    rollNo: 2,
    studentName: 'Kiara Saxena',
    admNo: 'SSSD-2026-801',
    className: 'Class 8 (Lotus Section)',
    math: 94,
    science: 91,
    hindi: 88,
    english: 93,
    sst: 90,
    sanskrit: 89,
    grandTotal: 545,
    maxGrandTotal: 600,
    percentage: 90.83,
    grade: 'A1',
    decision: 'PASSED (FIRST DIV WITH DISTINCTION)',
  },
  {
    _id: 'sssd_res_03',
    campus: 'sssd',
    rank: 3,
    rollNo: 3,
    studentName: 'Reyansh Verma',
    admNo: 'SSSD-2026-101',
    className: 'Class 10 (Einstein Section)',
    math: 90,
    science: 88,
    hindi: 85,
    english: 92,
    sst: 86,
    sanskrit: 87,
    grandTotal: 528,
    maxGrandTotal: 600,
    percentage: 88.0,
    grade: 'A1',
    decision: 'PASSED (FIRST DIV)',
  },
];

export default function ResultsAdminPage() {
  const [selectedCampus, setSelectedCampus] = useState<'sgm' | 'sssd'>('sgm');
  const [activeTab, setActiveTab] = useState<'published' | 'ledger'>('ledger');
  const [selectedExam, setSelectedExam] = useState('Half-Yearly Examination 2026');
  const [selectedClass, setSelectedClass] = useState('Class 10 (Section A)');
  const [ledger, setLedger] = useState(sgmLedger);
  const [activeResult, setActiveResult] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownloadReportCardPdf = async () => {
    if (!activeResult) return;
    setIsDownloading(true);
    toast.success(`Exporting high-resolution PDF for ${activeResult.studentName}...`, 'Preparing Download');
    try {
      const campusTag = activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'SSSD' : 'SGM';
      const fileName = `${campusTag}_Report_Card_${activeResult.studentName.replace(/\s+/g, '_')}_${selectedExam.replace(/\s+/g, '_')}.pdf`;
      const ok = await downloadElementAsPdf('admin-report-card-inner', fileName);
      if (ok) {
        toast.success(`Downloaded ${fileName} successfully!`, 'PDF Download Ready');
      } else {
        printIsolatedDocument('admin-report-card-inner');
      }
    } catch {
      printIsolatedDocument('admin-report-card-inner');
    } finally {
      setIsDownloading(false);
    }
  };

  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<any[]>([]);

  const handleCampusSwitch = (campus: 'sgm' | 'sssd') => {
    setSelectedCampus(campus);
    if (campus === 'sgm') {
      setLedger(sgmLedger);
      setSelectedClass('Class 10 (Section A)');
      toast.info('Switched to Sarswati Gyan Mandir (Inter College) Examination Ledger', 'Campus Active');
    } else {
      setLedger(sssdLedger);
      setSelectedClass('Class 5 (Rose Section)');
      toast.info('Switched to SSSD Public School (English Medium) Examination Ledger', 'Campus Active');
    }
  };

  const handleMarkChange = (id: string, field: 'math' | 'science' | 'hindi' | 'english' | 'sst' | 'sanskrit', val: number) => {
    setLedger((prev) =>
      prev.map((item) => {
        if (item._id !== id) return item;
        const updated = { ...item, [field]: val };
        const total = (updated.math || 0) + (updated.science || 0) + (updated.hindi || 0) + (updated.english || 0) + (updated.sst || 0) + (updated.sanskrit || 0);
        const pct = Number(((total / 600) * 100).toFixed(2));
        const grade = pct >= 85 ? 'A1' : pct >= 75 ? 'A2' : pct >= 65 ? 'B1' : pct >= 55 ? 'B2' : 'C';
        return { ...updated, grandTotal: total, percentage: pct, grade };
      })
    );
  };

  const handleSaveLedger = () => {
    toast.success(`Successfully saved and published marks for ${ledger.length} students in ${selectedClass}!`, 'Marks Published');
  };

  const handleDownloadSampleCsv = () => {
    const prefix = selectedCampus === 'sssd' ? 'SSSD' : 'SGM';
    const csvContent =
      'AdmissionNumber,RollNumber,StudentName,Class,Math,Science,Hindi,English,SocialScience,ComputerAI\n' +
      `${prefix}-2026-1001,1,Aarav Sharma,Class 10 A,96,93,88,84,86,89\n` +
      `${prefix}-2026-1002,2,Ananya Gupta,Class 10 A,92,89,86,82,84,88\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${prefix.toLowerCase()}_marks_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${prefix} marks entry template.`, 'Template Ready');
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Teacher']}>
      <div className="space-y-6 pt-1">
        {/* Header with Multi-Campus Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Award className="w-5 h-5 text-amber-500" /> Academic Results &amp; Marksheet Center
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage multi-subject marks ledger, compute aggregate percentages, and print official stamped report cards.
            </p>
          </div>

          {/* Campus Selector Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 flex-shrink-0">
            <button
              type="button"
              onClick={() => handleCampusSwitch('sgm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                selectedCampus === 'sgm'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="w-4 h-4 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-xs flex-shrink-0 flex items-center justify-center">
                <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
              </div>
              <span>SGM Inter College</span>
            </button>
            <button
              type="button"
              onClick={() => handleCampusSwitch('sssd')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                selectedCampus === 'sssd'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="w-4 h-4 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-xs flex-shrink-0 flex items-center justify-center">
                <img src="/images/sssd-logo.png" alt="SSSD Logo" className="w-full h-full object-contain" />
              </div>
              <span>SSSD Public School</span>
            </button>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-800"
            >
              <option value="Half-Yearly Examination 2026">Half-Yearly Examination 2026</option>
              <option value="Annual Board Pre-Exam 2026">Annual Board Pre-Exam 2026</option>
              <option value="Quarterly Unit Test 1">Quarterly Unit Test 1</option>
            </select>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-800"
            >
              {selectedCampus === 'sssd' ? (
                <>
                  <option value="Class 5 (Rose Section)">Class 5 (Rose Section)</option>
                  <option value="Class 8 (Lotus Section)">Class 8 (Lotus Section)</option>
                  <option value="Class 10 (Einstein Section)">Class 10 (Einstein Section)</option>
                </>
              ) : (
                <>
                  <option value="Class 10 (Section A)">Class 10 (Section A)</option>
                  <option value="Class 12 (PCM Stream)">Class 12 (PCM Stream)</option>
                  <option value="Class 12 (PCB Stream)">Class 12 (PCB Stream)</option>
                </>
              )}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadSampleCsv}
              leftIcon={<Download className="w-4 h-4 text-emerald-600" />}
            >
              Sample CSV
            </Button>
            <Button
              size="sm"
              onClick={handleSaveLedger}
              leftIcon={<Save className="w-4 h-4" />}
              className={selectedCampus === 'sssd' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'}
            >
              Save &amp; Publish Ledger
            </Button>
          </div>
        </div>

        {/* Ledger Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50 p-4 border-b border-slate-200 flex flex-row items-center justify-between">
            <CardTitle className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
              <ListOrdered className="w-4 h-4 text-blue-600" />
              <span>Multi-Subject Marks Ledger ({selectedCampus === 'sssd' ? 'SSSD Public School CBSE' : 'SGM Inter College UP Board'})</span>
            </CardTitle>
            <Badge variant="outline" className="text-[10px] font-mono">
              Max: 600 Marks
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="p-3 pl-4">Rank</th>
                    <th className="p-3">Scholar &amp; Adm No</th>
                    <th className="p-3 text-center">Math</th>
                    <th className="p-3 text-center">Science</th>
                    <th className="p-3 text-center">Hindi</th>
                    <th className="p-3 text-center">English</th>
                    <th className="p-3 text-center">SST</th>
                    <th className="p-3 text-center">{selectedCampus === 'sssd' ? 'Comp/AI' : 'Sanskrit'}</th>
                    <th className="p-3 text-center">Total</th>
                    <th className="p-3 text-center">Percentage</th>
                    <th className="p-3 text-center">Grade</th>
                    <th className="p-3 text-right pr-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {ledger.map((row) => (
                    <tr key={row._id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 pl-4 font-bold text-slate-900 font-mono">#{row.rank}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{row.studentName}</div>
                        <span className="text-[10px] text-slate-500 font-mono">{row.admNo}</span>
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={row.math}
                          onChange={(e) => handleMarkChange(row._id, 'math', Number(e.target.value))}
                          className="w-12 text-center p-1 rounded-lg border border-slate-200 font-mono font-bold bg-slate-50 focus:bg-white"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={row.science}
                          onChange={(e) => handleMarkChange(row._id, 'science', Number(e.target.value))}
                          className="w-12 text-center p-1 rounded-lg border border-slate-200 font-mono font-bold bg-slate-50 focus:bg-white"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={row.hindi}
                          onChange={(e) => handleMarkChange(row._id, 'hindi', Number(e.target.value))}
                          className="w-12 text-center p-1 rounded-lg border border-slate-200 font-mono font-bold bg-slate-50 focus:bg-white"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={row.english}
                          onChange={(e) => handleMarkChange(row._id, 'english', Number(e.target.value))}
                          className="w-12 text-center p-1 rounded-lg border border-slate-200 font-mono font-bold bg-slate-50 focus:bg-white"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={row.sst}
                          onChange={(e) => handleMarkChange(row._id, 'sst', Number(e.target.value))}
                          className="w-12 text-center p-1 rounded-lg border border-slate-200 font-mono font-bold bg-slate-50 focus:bg-white"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="number"
                          value={row.sanskrit}
                          onChange={(e) => handleMarkChange(row._id, 'sanskrit', Number(e.target.value))}
                          className="w-12 text-center p-1 rounded-lg border border-slate-200 font-mono font-bold bg-slate-50 focus:bg-white"
                        />
                      </td>
                      <td className="p-3 text-center font-mono font-black text-blue-700">{row.grandTotal}</td>
                      <td className="p-3 text-center font-mono font-bold text-slate-800">{row.percentage}%</td>
                      <td className="p-3 text-center">
                        <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                          {row.grade}
                        </span>
                      </td>
                      <td className="p-3 text-right pr-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-[11px] text-blue-600 hover:text-blue-700 border-blue-200"
                          onClick={() => setActiveResult(row)}
                          leftIcon={<Printer className="w-3 h-3" />}
                        >
                          Report Card
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Official Report Card Modal (Supports SGM & SSSD) */}
      {activeResult && (
        <ClientPortal>
          <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto w-full h-full min-h-screen">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col p-3.5 sm:p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 sm:pb-3 flex-shrink-0">
              <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider font-mono truncate pr-2 ${activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'text-emerald-700' : 'text-blue-700'}`}>
                {activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'SSSD PUBLIC SCHOOL CBSE REPORT CARD' : 'SGM INTER COLLEGE OFFICIAL REPORT CARD'}
              </span>
              <button
                onClick={() => setActiveResult(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="flex items-center justify-between text-[11px] text-blue-800 bg-blue-50/80 px-3 py-1.5 rounded-lg border border-blue-200 sm:hidden flex-shrink-0">
              <span className="font-semibold">👉 Swipe sideways to view full certificate</span>
              <span className="font-mono text-[10px] text-blue-600 font-bold">A4 Single-Page</span>
            </div>

            <div className="overflow-x-auto overflow-y-auto flex-1 py-2 sm:py-3">
              <div
                id="admin-report-card-inner"
                className="printable-document relative p-4 sm:p-7 bg-white border-4 border-double border-[#002060] rounded-2xl space-y-3.5 sm:space-y-4 text-slate-900 text-xs shadow-xl font-sans overflow-hidden min-w-[580px] sm:min-w-0 select-text"
              >
                {/* Official Institutional Watermark Logo (Straight, Centered, Clearly Visible Emblem) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.22] z-0 overflow-hidden select-none">
                  <img
                    src={activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? '/images/sssd-logo.png' : '/logo.png'}
                    alt="Watermark Crest"
                    className="w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] object-contain filter grayscale"
                  />
                </div>

                <div className="relative z-10 space-y-3 sm:space-y-4">
                  {/* Institution Grand Header (Website Royal Navy & Gold Theme) */}
                  <div className="flex items-center justify-between border-b-2 border-[#002060] pb-3 gap-3 sm:gap-4">
                    {/* Enlarged Prominent School Crest Logo */}
                    <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-full overflow-hidden border-3 border-amber-400 bg-white shadow-lg flex-shrink-0 p-1 ring-4 ring-amber-400/40">
                      <img
                        src={activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? '/images/sssd-logo.png' : '/logo.png'}
                        alt="School Crest Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center flex-1 min-w-0">
                      <h2 className="text-base sm:text-2xl font-serif font-black text-[#002060] tracking-wide uppercase leading-tight">
                        {activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'SSSD PUBLIC SCHOOL' : 'सरस्वती ज्ञान मन्दिर इण्टर कॉलेज'}
                      </h2>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">
                        {activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? '100% ENGLISH MEDIUM • CBSE PATTERN' : 'SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE'}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium mt-0.5">
                        SHAMSABAD, FARRUKHABAD (U.P.) - 209503 &bull; AFFILIATION: UP-FBD-2026-SGM-089 &bull; PH: +91 9451234501
                      </p>
                      <div className="mt-2 inline-block bg-gradient-to-r from-[#001845] via-[#002060] to-[#001845] text-amber-300 font-bold text-[9.5px] sm:text-[11.5px] px-4 py-1 rounded-full uppercase tracking-wider font-mono border border-amber-400/50 shadow-sm">
                        ACADEMIC EVALUATION &amp; SCHOLASTIC PROGRESS REPORT (2026-2027)
                      </div>
                    </div>
                    <div className="w-16 h-16 sm:w-22 sm:h-22 flex-shrink-0 flex items-center justify-center border-2 border-dashed border-blue-300 rounded-2xl bg-blue-50/60 text-[8px] sm:text-[9.5px] text-blue-800 font-bold text-center p-1 font-mono">
                      OFFICIAL ATTESTED
                    </div>
                  </div>

                  {/* Student Demographics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 bg-gradient-to-r from-blue-50/70 via-slate-50/50 to-blue-50/70 p-2.5 sm:p-3 rounded-xl border border-blue-200 text-xs shadow-sm">
                    <div>
                      <span className="text-blue-900/60 text-[9px] sm:text-[10px] font-bold block uppercase">Scholar Name:</span>
                      <p className="font-black text-slate-900 text-xs sm:text-sm leading-tight py-0.5">{activeResult.studentName}</p>
                    </div>
                    <div>
                      <span className="text-blue-900/60 text-[9px] sm:text-[10px] font-bold block uppercase">Admission / Scholar No:</span>
                      <p className="font-mono font-black text-xs sm:text-sm leading-tight py-0.5 text-blue-700">{activeResult.admNo}</p>
                    </div>
                    <div>
                      <span className="text-blue-900/60 text-[9px] sm:text-[10px] font-bold block uppercase">Class &amp; Section:</span>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight py-0.5">{activeResult.className} (Sec A)</p>
                    </div>
                    <div>
                      <span className="text-blue-900/60 text-[9px] sm:text-[10px] font-bold block uppercase">Institutional Rank:</span>
                      <p className="font-black text-emerald-700 text-xs sm:text-sm leading-tight py-0.5">Rank #{activeResult.rank} (Top 2%)</p>
                    </div>
                    <div>
                      <span className="text-blue-900/60 text-[9px] sm:text-[10px] font-bold block uppercase">Father / Guardian:</span>
                      <p className="font-bold text-slate-800 text-xs leading-tight py-0.5">Shri Rajesh Sharma</p>
                    </div>
                    <div>
                      <span className="text-blue-900/60 text-[9px] sm:text-[10px] font-bold block uppercase">Mother&apos;s Name:</span>
                      <p className="font-bold text-slate-800 text-xs leading-tight py-0.5">Smt. Sunita Sharma</p>
                    </div>
                    <div>
                      <span className="text-blue-900/60 text-[9px] sm:text-[10px] font-bold block uppercase">Date of Birth:</span>
                      <p className="font-mono font-bold text-slate-800 text-xs leading-tight py-0.5">12-Aug-2010</p>
                    </div>
                    <div>
                      <span className="text-blue-900/60 text-[9px] sm:text-[10px] font-bold block uppercase">Term Attendance:</span>
                      <p className="font-mono font-bold text-blue-900 text-xs leading-tight py-0.5">95.4% (185/194 Days)</p>
                    </div>
                  </div>

                  {/* Scholastic Performance Table */}
                  <div className="border-2 border-[#002060] rounded-xl overflow-hidden shadow-sm bg-white">
                    <div className="bg-[#002060] text-amber-300 px-3 py-1 text-[10px] font-black uppercase tracking-wider font-mono flex justify-between">
                      <span>Part 1: Scholastic Assessment Performance</span>
                      <span>Assessment: {selectedExam}</span>
                    </div>
                    <table className="w-full text-left text-xs">
                      <thead className="bg-blue-50 text-blue-950 font-black text-[10px] uppercase border-b-2 border-[#002060]">
                        <tr>
                          <th className="p-2 sm:p-2.5">Subject Description</th>
                          <th className="p-2 sm:p-2.5 text-center">Max Marks</th>
                          <th className="p-2 sm:p-2.5 text-center">Terminal (70)</th>
                          <th className="p-2 sm:p-2.5 text-center">Internal (30)</th>
                          <th className="p-2 sm:p-2.5 text-center">Total (100)</th>
                          <th className="p-2 sm:p-2.5 text-center">Grade</th>
                          <th className="p-2 sm:p-2.5 text-center">GP</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-100 font-medium text-xs">
                        <tr className="hover:bg-blue-50/30">
                          <td className="p-2 sm:p-2.5 font-bold text-slate-950">Mathematics (गणित)</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono">100</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{Math.round(activeResult.math * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{activeResult.math - Math.round(activeResult.math * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-black text-[#002060] bg-blue-50/70">{activeResult.math}</td>
                          <td className="p-2 sm:p-2.5 text-center font-black text-emerald-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px]">{activeResult.math >= 90 ? 'A1' : 'A2'}</span>
                          </td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-700">10.0</td>
                        </tr>
                        <tr className="hover:bg-blue-50/30">
                          <td className="p-2 sm:p-2.5 font-bold text-slate-950">Science (विज्ञान)</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono">100</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{Math.round(activeResult.science * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{activeResult.science - Math.round(activeResult.science * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-black text-[#002060] bg-blue-50/70">{activeResult.science}</td>
                          <td className="p-2 sm:p-2.5 text-center font-black text-emerald-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px]">{activeResult.science >= 90 ? 'A1' : 'A2'}</span>
                          </td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-700">10.0</td>
                        </tr>
                        <tr className="hover:bg-blue-50/30">
                          <td className="p-2 sm:p-2.5 font-bold text-slate-950">Hindi (हिंदी साहित्य)</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono">100</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{Math.round(activeResult.hindi * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{activeResult.hindi - Math.round(activeResult.hindi * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-black text-[#002060] bg-blue-50/70">{activeResult.hindi}</td>
                          <td className="p-2 sm:p-2.5 text-center font-black text-emerald-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px]">{activeResult.hindi >= 90 ? 'A1' : 'A2'}</span>
                          </td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-700">9.0</td>
                        </tr>
                        <tr className="hover:bg-blue-50/30">
                          <td className="p-2 sm:p-2.5 font-bold text-slate-950">English (अंग्रेजी)</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono">100</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{Math.round(activeResult.english * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{activeResult.english - Math.round(activeResult.english * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-black text-[#002060] bg-blue-50/70">{activeResult.english}</td>
                          <td className="p-2 sm:p-2.5 text-center font-black text-emerald-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px]">{activeResult.english >= 90 ? 'A1' : 'A2'}</span>
                          </td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-700">9.0</td>
                        </tr>
                        <tr className="hover:bg-blue-50/30">
                          <td className="p-2 sm:p-2.5 font-bold text-slate-950">Social Studies (सामाजिक विज्ञान)</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono">100</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{Math.round(activeResult.sst * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{activeResult.sst - Math.round(activeResult.sst * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-black text-[#002060] bg-blue-50/70">{activeResult.sst}</td>
                          <td className="p-2 sm:p-2.5 text-center font-black text-emerald-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px]">{activeResult.sst >= 90 ? 'A1' : 'A2'}</span>
                          </td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-700">9.0</td>
                        </tr>
                        <tr className="hover:bg-blue-50/30">
                          <td className="p-2 sm:p-2.5 font-bold text-slate-950">Sanskrit / Computers (संस्कृत)</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono">100</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{Math.round(activeResult.sanskrit * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-800">{activeResult.sanskrit - Math.round(activeResult.sanskrit * 0.7)}</td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-black text-[#002060] bg-blue-50/70">{activeResult.sanskrit}</td>
                          <td className="p-2 sm:p-2.5 text-center font-black text-emerald-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[10px]">{activeResult.sanskrit >= 90 ? 'A1' : 'A2'}</span>
                          </td>
                          <td className="p-2 sm:p-2.5 text-center font-mono font-bold text-slate-700">9.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Co-Scholastic & Life Skills Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="p-2 sm:p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-slate-700">Discipline &amp; Conduct:</span>
                      <span className="font-black text-emerald-800 font-mono bg-emerald-100 px-2 py-0.5 rounded-lg">A+ (Exemplary)</span>
                    </div>
                    <div className="p-2 sm:p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-slate-700">Work Education &amp; IT:</span>
                      <span className="font-black text-emerald-800 font-mono bg-emerald-100 px-2 py-0.5 rounded-lg">A (Proficient)</span>
                    </div>
                    <div className="p-2 sm:p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between">
                      <span className="font-bold text-slate-700">Sports &amp; Physical Fitness:</span>
                      <span className="font-black text-emerald-800 font-mono bg-emerald-100 px-2 py-0.5 rounded-lg">A (Active Leader)</span>
                    </div>
                  </div>

                  {/* Comprehensive Performance Summary Card (Website Royal Navy & Gold Theme) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 bg-gradient-to-r from-[#001845] via-[#002060] to-[#023e8a] text-white p-3 sm:p-3.5 rounded-xl text-center text-xs shadow-md border-2 border-amber-400/70 font-sans">
                    <div>
                      <span className="text-blue-200 text-[10px] uppercase font-bold block">Grand Total</span>
                      <span className="font-mono font-black text-amber-300 text-xs sm:text-base">{activeResult.grandTotal} / {activeResult.maxGrandTotal}</span>
                    </div>
                    <div>
                      <span className="text-blue-200 text-[10px] uppercase font-bold block">Percentage</span>
                      <span className="font-mono font-black text-amber-300 text-xs sm:text-base">{activeResult.percentage}%</span>
                    </div>
                    <div>
                      <span className="text-blue-200 text-[10px] uppercase font-bold block">Overall Grade</span>
                      <span className="font-mono font-black text-cyan-300 text-xs sm:text-base">A1 (Distinction)</span>
                    </div>
                    <div>
                      <span className="text-blue-200 text-[10px] uppercase font-bold block">Decision Status</span>
                      <span className="font-black text-emerald-300 text-[10px] sm:text-sm block leading-tight">{activeResult.decision}</span>
                    </div>
                  </div>

                  {/* Remarks & Grading Scale */}
                  <div className="bg-amber-50/90 border border-amber-300/80 p-2.5 rounded-xl text-[11px] text-amber-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="font-black text-amber-950">Institutional Remarks: </span>
                      <span className="italic">Extraordinary intellectual dedication and commendable moral discipline displayed throughout the academic term.</span>
                    </div>
                    <div className="font-mono text-[9px] text-amber-900 font-bold bg-amber-100 px-2 py-1 rounded-lg border border-amber-300 whitespace-nowrap">
                      Scale: 91-100: A1 &bull; 81-90: A2 &bull; 71-80: B1
                    </div>
                  </div>

                  {/* Stamped Tri-Signatures Block */}
                  <div className="pt-3 sm:pt-4 flex items-end justify-between border-t-2 border-[#002060] text-xs mt-2 gap-2 sm:gap-4 overflow-x-auto pb-1">
                    <div className="text-center flex-1 min-w-[90px] sm:max-w-[150px]">
                      <img
                        src="/images/stamps/registrar-signature.png"
                        alt="Class Incharge Sig"
                        className="w-20 sm:w-28 h-8 sm:h-10 object-contain mx-auto filter contrast-125"
                      />
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 block mt-0.5 uppercase truncate">
                        Class Incharge
                      </span>
                      <span className="text-[7px] sm:text-[8px] text-slate-500 font-mono block">Attested: 2026</span>
                    </div>

                    <div className="text-center flex-1 min-w-[80px] sm:max-w-[130px]">
                      <img
                        src={activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? '/images/stamps/sssd-principal-round-seal.png' : '/images/stamps/approved-stamp.png'}
                        alt="Exam Stamp"
                        className="w-10 h-10 sm:w-14 sm:h-12 object-contain mx-auto drop-shadow-sm transform -rotate-1 filter contrast-125"
                      />
                      <span className="text-[9px] sm:text-[10px] font-bold text-emerald-900 block mt-0.5 uppercase truncate">
                        Exam Verified
                      </span>
                      <span className="text-[7px] sm:text-[8px] text-slate-500 font-mono block">Institutional</span>
                    </div>

                    <div className="text-center flex-1 min-w-[110px] sm:max-w-[170px]">
                      <img
                        src={activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? '/images/stamps/sssd-principal-signature.png' : '/images/stamps/principal-signature.png'}
                        alt="Principal Signature"
                        className="w-24 sm:w-36 h-8 sm:h-12 object-contain mx-auto filter contrast-150"
                      />
                      <span className="font-bold text-slate-950 block text-[10px] sm:text-xs truncate">Dr. Ramesh Kumar</span>
                      <span className="text-[8px] sm:text-[10px] text-slate-600 block font-serif truncate">Principal &amp; Head</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2 pt-2.5 sm:pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                type="button"
                className={`w-full sm:w-auto flex-1 font-bold text-xs shadow-md ${activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-[#002060] hover:bg-[#001845]'}`}
                onClick={() => {
                  printIsolatedDocument('admin-report-card-inner');
                  toast.success(`Generated official Vector PDF for ${activeResult.studentName}. (Select 'Save as PDF' to save with selectable text)`, 'Vector PDF Ready');
                }}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print / Save Vector PDF (Selectable Text)
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto font-bold text-xs border-slate-300"
                onClick={handleDownloadReportCardPdf}
                disabled={isDownloading}
                leftIcon={isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              >
                {isDownloading ? 'Exporting...' : 'Direct PDF File'}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setActiveResult(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </ClientPortal>
      )}
    </PortalLayout>
  );
}
