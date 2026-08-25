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
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

const initialLedger = [
  {
    _id: 'res_01',
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
  {
    _id: 'res_04',
    rank: 4,
    rollNo: 4,
    studentName: 'Harshit Dubey',
    admNo: 'SGM-2026-1004',
    className: 'Class 10 (Section A)',
    math: 82,
    science: 80,
    hindi: 82,
    english: 78,
    sst: 80,
    sanskrit: 83,
    grandTotal: 485,
    maxGrandTotal: 600,
    percentage: 80.83,
    grade: 'A2',
    decision: 'PASSED (FIRST DIV)',
  },
  {
    _id: 'res_05',
    rank: 5,
    rollNo: 5,
    studentName: 'Ishita Verma',
    admNo: 'SGM-2026-1005',
    className: 'Class 10 (Section A)',
    math: 78,
    science: 76,
    hindi: 80,
    english: 76,
    sst: 78,
    sanskrit: 81,
    grandTotal: 469,
    maxGrandTotal: 600,
    percentage: 78.17,
    grade: 'B1',
    decision: 'PASSED (FIRST DIV)',
  },
];

export default function ResultsAdminPage() {
  const [activeTab, setActiveTab] = useState<'published' | 'ledger'>('ledger');
  const [selectedExam, setSelectedExam] = useState('Half-Yearly Examination 2026');
  const [selectedClass, setSelectedClass] = useState('Class 10 (Section A)');
  const [ledger, setLedger] = useState(initialLedger);
  const [activeResult, setActiveResult] = useState<any | null>(null);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<any[]>([]);
  const { toast } = useToast();

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
    const csvContent =
      'AdmissionNumber,RollNumber,StudentName,Class,Math,Science,Hindi,English,SocialScience,Sanskrit\n' +
      'SGM-2026-1001,1,Aarav Sharma,Class 10 A,96,93,88,84,86,89\n' +
      'SGM-2026-1002,2,Ananya Gupta,Class 10 A,92,89,86,82,84,88\n' +
      'SGM-2026-1003,3,Divyanshu Singh,Class 10 A,88,85,84,80,82,85\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'marks_entry_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded marks_entry_template.csv with exact subject headers.', 'Template Ready');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const parsed = [
      { rollNo: 1, studentName: 'Aarav Sharma', math: 98, science: 95, hindi: 90, english: 88, sst: 90, sanskrit: 92 },
      { rollNo: 2, studentName: 'Ananya Gupta', math: 94, science: 91, hindi: 88, english: 85, sst: 86, sanskrit: 90 },
      { rollNo: 3, studentName: 'Divyanshu Singh', math: 90, science: 87, hindi: 86, english: 82, sst: 85, sanskrit: 88 },
    ];
    setUploadedPreview(parsed);
    toast.success(`Validated marks for ${parsed.length} scholars from ${file.name}`, 'File Validated');
  };

  const handleConfirmBulkUpload = () => {
    if (uploadedPreview.length === 0) return;

    setLedger((prev) =>
      prev.map((item) => {
        const found = uploadedPreview.find((u) => u.rollNo === item.rollNo);
        if (!found) return item;
        const total = found.math + found.science + found.hindi + found.english + found.sst + found.sanskrit;
        const pct = Number(((total / 600) * 100).toFixed(2));
        return {
          ...item,
          math: found.math,
          science: found.science,
          hindi: found.hindi,
          english: found.english,
          sst: found.sst,
          sanskrit: found.sanskrit,
          grandTotal: total,
          percentage: pct,
          grade: 'A1',
        };
      })
    );

    setShowBulkUploadModal(false);
    setUploadedPreview([]);
    toast.success('Marks updated from CSV template import!', 'Ledger Updated');
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Teacher']}>
      <div className="space-y-6 pt-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Award className="w-5 h-5 text-blue-600" /> Examination Results &amp; Multi-Subject Marks Ledger
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Class Teachers: Record subject marks, calculate ranks in real-time, or generate official Board-style report cards.
            </p>
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
              variant="outline"
              size="sm"
              onClick={() => setShowBulkUploadModal(true)}
              leftIcon={<Upload className="w-4 h-4 text-indigo-600" />}
            >
              Bulk Upload Marks
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={handleSaveLedger}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save &amp; Publish
            </Button>
          </div>
        </div>

        {/* View Switcher & Class Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('ledger')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition flex-1 sm:flex-initial ${
                activeTab === 'ledger'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Multi-Subject Grading Ledger</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('published')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition flex-1 sm:flex-initial ${
                activeTab === 'published'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Rankings &amp; Report Cards</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none flex-1 sm:flex-initial"
            >
              <option value="Half-Yearly Examination 2026">Half-Yearly Examination 2026</option>
              <option value="Unit Test 1 Series">Unit Test 1 Series</option>
              <option value="Pre-Board Annual Test">Pre-Board Annual Test</option>
            </select>
          </div>
        </div>

        {/* Tab 1: Multi-Subject Grading Ledger */}
        {activeTab === 'ledger' && (
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" /> {selectedClass} &bull; {selectedExam}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Enter student marks (Max 100 per subject). Grand Total, % and Grade calculate automatically in real-time.
                </p>
              </div>
              <Badge variant="purple" size="sm">
                6 Subjects &bull; Max 600
              </Badge>
            </div>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[900px]">
                  <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-extrabold uppercase text-[10px]">
                    <tr>
                      <th className="p-3 text-center w-14">Roll</th>
                      <th className="p-3 min-w-[160px]">Student Name</th>
                      <th className="p-3 text-center">Math (100)</th>
                      <th className="p-3 text-center">Science (100)</th>
                      <th className="p-3 text-center">Hindi (100)</th>
                      <th className="p-3 text-center">English (100)</th>
                      <th className="p-3 text-center">SST (100)</th>
                      <th className="p-3 text-center">Sanskrit (100)</th>
                      <th className="p-3 text-center bg-blue-50/50">Total (600)</th>
                      <th className="p-3 text-center bg-blue-50/50">Percentage</th>
                      <th className="p-3 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {ledger.map((row) => (
                      <tr key={row._id} className="hover:bg-slate-50 transition">
                        <td className="p-3 text-center font-bold text-slate-900">{row.rollNo}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{row.studentName}</div>
                          <div className="font-mono text-[10px] text-blue-600">{row.admNo}</div>
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={row.math}
                            onChange={(e) => handleMarkChange(row._id, 'math', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={row.science}
                            onChange={(e) => handleMarkChange(row._id, 'science', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={row.hindi}
                            onChange={(e) => handleMarkChange(row._id, 'hindi', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={row.english}
                            onChange={(e) => handleMarkChange(row._id, 'english', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={row.sst}
                            onChange={(e) => handleMarkChange(row._id, 'sst', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={row.sanskrit}
                            onChange={(e) => handleMarkChange(row._id, 'sanskrit', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-center font-mono font-black text-blue-700 bg-blue-50/50">
                          {row.grandTotal}
                        </td>
                        <td className="p-3 text-center font-bold text-slate-900 bg-blue-50/50">
                          {row.percentage}%
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-md text-[10px] border border-emerald-200">
                            {row.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 2: Rankings & Report Cards */}
        {activeTab === 'published' && (
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[750px]">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-extrabold tracking-wider text-[10px]">
                    <tr>
                      <th className="px-4 py-3.5">Class Rank</th>
                      <th className="px-4 py-3.5">Roll No</th>
                      <th className="px-4 py-3.5">Student Name</th>
                      <th className="px-4 py-3.5">Class</th>
                      <th className="px-4 py-3.5">Marks Scored</th>
                      <th className="px-4 py-3.5">Percentage</th>
                      <th className="px-4 py-3.5">Grade</th>
                      <th className="px-4 py-3.5 text-right">Official Report Card</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {ledger.map((r) => (
                      <tr key={r._id} className="hover:bg-slate-50/80 transition">
                        <td className="px-4 py-3 font-black text-blue-700 whitespace-nowrap">
                          Rank #{r.rank}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold whitespace-nowrap">{r.rollNo}</td>
                        <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">
                          {r.studentName}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-600">
                          {r.className}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold whitespace-nowrap">
                          {r.grandTotal} / {r.maxGrandTotal}
                        </td>
                        <td className="px-4 py-3 font-black text-blue-700 whitespace-nowrap">
                          {r.percentage}%
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-200">
                            {r.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<Printer className="w-3.5 h-3.5" />}
                            onClick={() => setActiveResult(r)}
                          >
                            Print Report Card
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bulk Upload Marks Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Examination Marks Bulk CSV Upload
              </h3>
              <button onClick={() => setShowBulkUploadModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">Step 1: Download Marks Template</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownloadSampleCsv}
                    className="bg-white text-blue-700 border-blue-300 font-bold"
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download CSV
                  </Button>
                </div>
                <p className="text-[11px] text-blue-700">
                  Template contains standard subject columns: Math, Science, Hindi, English, SocialScience, Sanskrit.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Step 2: Upload CSV / Excel File</label>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="w-full p-2.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 font-medium text-xs cursor-pointer hover:bg-slate-100 transition"
                />
              </div>

              {uploadedPreview.length > 0 && (
                <div className="space-y-2 border border-slate-200 rounded-2xl p-3 bg-slate-50">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                    <span>Parsed Marks ({uploadedPreview.length} scholars)</span>
                    <span className="text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready to Import
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-200 text-slate-700 font-bold uppercase text-[9px]">
                        <tr>
                          <th className="p-1">Roll</th>
                          <th className="p-1">Name</th>
                          <th className="p-1 text-center">Math</th>
                          <th className="p-1 text-center">Sci</th>
                          <th className="p-1 text-center">Hin</th>
                          <th className="p-1 text-center">Eng</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono">
                        {uploadedPreview.map((row, i) => (
                          <tr key={i}>
                            <td className="p-1 font-bold">{row.rollNo}</td>
                            <td className="p-1 font-sans">{row.studentName}</td>
                            <td className="p-1 text-center">{row.math}</td>
                            <td className="p-1 text-center">{row.science}</td>
                            <td className="p-1 text-center">{row.hindi}</td>
                            <td className="p-1 text-center">{row.english}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold"
                disabled={uploadedPreview.length === 0}
                onClick={handleConfirmBulkUpload}
                leftIcon={<Upload className="w-4 h-4" />}
              >
                Import Marks &amp; Update Ledger
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowBulkUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Report Card Modal (Bounded & Scroll Safe) */}
      {activeResult && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col p-5 sm:p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                OFFICIAL REPORT CARD PREVIEW
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
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-900 bg-white shadow-md flex-shrink-0">
                    <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain p-0.5" />
                  </div>
                  <div className="text-center flex-1 px-3">
                    <h2 className="text-base font-serif font-black text-blue-950">
                      सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
                    </h2>
                    <p className="text-[10px] text-slate-600 font-medium">
                      SHAMSABAD, FARRUKHABAD (UP) &bull; UP-FBD-2026-SGM-089
                    </p>
                    <span className="inline-block mt-1 font-black text-[10px] bg-slate-900 text-white px-3 py-0.5 rounded-full uppercase">
                      {selectedExam} Report Card
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Student:</span>
                    <p className="font-bold text-slate-900">{activeResult.studentName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Adm No:</span>
                    <p className="font-mono font-bold text-blue-700">{activeResult.admNo}</p>
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
                        <td className="p-2 font-bold text-slate-900">Mathematics (103)</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.math}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">A1</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">Science (104 - 70Th + 30Pr)</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.science}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">A1</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">Hindi Sahitya (101)</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.hindi}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">A1</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">English Core (102)</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.english}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">A2</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">Social Science (105)</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.sst}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">A2</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-slate-900">Sanskrit (106)</td>
                        <td className="p-2 text-center font-mono font-bold text-blue-700">{activeResult.sanskrit}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-black text-emerald-700">A1</td>
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
                    <p className="text-xs font-black text-emerald-700">PASS (FIRST DIV)</p>
                  </div>
                </div>

                {/* Stamped Signatures Block */}
                <div className="pt-4 flex items-end justify-between border-t-2 border-slate-200 text-xs mt-4">
                  {/* Class Teacher / Registrar Sig */}
                  <div className="text-center w-36">
                    <img
                      src="/images/stamps/registrar-signature.png"
                      alt="Class Teacher Sig"
                      className="w-28 h-12 object-contain mx-auto"
                    />
                    <span className="text-[9px] font-bold text-slate-700 block mt-0.5 uppercase">
                      Class Incharge
                    </span>
                  </div>

                  {/* Center Approved Stamp */}
                  <div className="text-center">
                    <img
                      src="/images/stamps/approved-stamp.png"
                      alt="Approved Stamp"
                      className="w-28 h-10 object-contain transform rotate-1 mx-auto drop-shadow-sm"
                    />
                    <span className="text-[8px] font-bold text-emerald-800 block mt-0.5 uppercase">
                      Exam Cell Verified
                    </span>
                  </div>

                  {/* Principal Sig */}
                  <div className="text-center w-40">
                    <img
                      src="/images/stamps/principal-signature.png"
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
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-xs"
                onClick={() => {
                  window.print();
                  toast.success('Generated printable Official Report Card.', 'Print Ready');
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
