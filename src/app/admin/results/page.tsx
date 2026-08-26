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
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

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
  const [activeResult, setActiveResult] = useState<any | null>(null);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<any[]>([]);
  const { toast } = useToast();

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
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                selectedCampus === 'sgm'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>SGM Inter College</span>
            </button>
            <button
              type="button"
              onClick={() => handleCampusSwitch('sssd')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                selectedCampus === 'sssd'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-amber-300" />
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
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col p-5 sm:p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <span className={`text-xs font-black uppercase tracking-wider font-mono ${activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'text-emerald-700' : 'text-blue-700'}`}>
                {activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'SSSD PUBLIC SCHOOL CBSE REPORT CARD' : 'SGM INTER COLLEGE OFFICIAL REPORT CARD'}
              </span>
              <button
                onClick={() => setActiveResult(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4">
              <div className="p-5 sm:p-6 bg-white border-2 border-slate-900 rounded-2xl space-y-4 text-slate-900 text-xs shadow-inner">
                {/* Institution Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-white shadow-md flex-shrink-0">
                    <img
                      src={activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? '/images/sssd-logo.png' : '/logo.png'}
                      alt="Logo"
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  <div className="text-center flex-1 px-3">
                    <h2 className="text-base font-serif font-black text-slate-950">
                      {activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'SSSD PUBLIC SCHOOL' : 'सरस्वती ज्ञान मन्दिर इण्टर कॉलेज'}
                    </h2>
                    <p className="text-[10px] text-slate-600 font-medium">
                      {activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'SHAMSABAD, FARRUKHABAD (UP) • 100% ENGLISH MEDIUM • CBSE PATTERN' : 'SHAMSABAD, FARRUKHABAD (UP) • UP-FBD-2026-SGM-089'}
                    </p>
                    <span className={`inline-block mt-1 font-black text-[10px] text-white px-3 py-0.5 rounded-full uppercase ${activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'bg-emerald-800' : 'bg-slate-900'}`}>
                      {selectedExam} Report Card
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Scholar:</span>
                    <p className="font-bold text-slate-900">{activeResult.studentName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Adm No:</span>
                    <p className={`font-mono font-bold ${activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'text-emerald-700' : 'text-blue-700'}`}>{activeResult.admNo}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Class:</span>
                    <p className="font-bold text-slate-800">{activeResult.className}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Rank:</span>
                    <p className="font-bold text-emerald-700">Rank #{activeResult.rank}</p>
                  </div>
                </div>

                <div className="border border-slate-300 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[500px]">
                    <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-2">Subject</th>
                        <th className="p-2 text-center">Marks Scored</th>
                        <th className="p-2 text-center">Max Marks</th>
                        <th className="p-2 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      <tr>
                        <td className="p-2 font-bold text-slate-900">{activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'Mathematics (041)' : 'Mathematics (103)'}</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.math}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">{activeResult.math >= 90 ? 'A1' : 'A2'}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">{activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'Science & Technology (086)' : 'Science (104 - 70Th + 30Pr)'}</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.science}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">{activeResult.science >= 90 ? 'A1' : 'A2'}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">{activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'English Communicative (101)' : 'Hindi Sahitya (101)'}</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.hindi}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">{activeResult.hindi >= 85 ? 'A1' : 'A2'}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">{activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'Social Science (087)' : 'English Core (102)'}</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.english}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">{activeResult.english >= 85 ? 'A1' : 'A2'}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">{activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'Computer & AI Robotics (165)' : 'Social Science (105)'}</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.sst}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">{activeResult.sst >= 85 ? 'A1' : 'A2'}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">{activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'Hindi Course (002)' : 'Sanskrit (106)'}</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.sanskrit}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">{activeResult.sanskrit >= 85 ? 'A1' : 'A2'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-slate-500 font-medium">Percentage</span>
                    <p className="text-sm font-black text-blue-700">{activeResult.percentage}%</p>
                  </div>
                  <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-200">
                    <span className="text-slate-500 font-medium">Aggregate</span>
                    <p className="text-sm font-black text-indigo-700">{activeResult.grandTotal} / {activeResult.maxGrandTotal}</p>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-slate-500 font-medium">Decision</span>
                    <p className="text-xs font-black text-emerald-700">{activeResult.decision}</p>
                  </div>
                </div>

                {/* Stamped Signatures Block */}
                <div className="pt-4 flex items-end justify-between border-t-2 border-slate-200 text-xs mt-4">
                  <div className="text-center w-36">
                    <img
                      src="/images/stamps/registrar-signature.png"
                      alt="Class Incharge Sig"
                      className="w-28 h-12 object-contain mx-auto"
                    />
                    <span className="text-[9px] font-bold text-slate-700 block mt-0.5 uppercase">
                      Class Incharge
                    </span>
                  </div>

                  <div className="text-center">
                    <img
                      src={activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? '/images/stamps/sssd-principal-round-seal.png' : '/images/stamps/approved-stamp.png'}
                      alt="Stamp"
                      className="w-12 h-12 object-contain mx-auto drop-shadow-sm transform -rotate-2"
                    />
                    <span className="text-[8px] font-bold text-emerald-800 block mt-0.5 uppercase">
                      Exam Cell Verified
                    </span>
                  </div>

                  <div className="text-center w-40">
                    <img
                      src={activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? '/images/stamps/sssd-principal-signature.png' : '/images/stamps/principal-signature.png'}
                      alt="Principal Signature"
                      className="w-36 h-16 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                type="button"
                className={`w-full font-bold text-xs ${activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={() => {
                  window.print();
                  toast.success(`Generated printable ${activeResult.campus === 'sssd' || selectedCampus === 'sssd' ? 'SSSD' : 'SGM'} Report Card.`, 'Print Ready');
                }}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print / Save PDF
              </Button>
              <Button type="button" variant="outline" onClick={() => setActiveResult(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
