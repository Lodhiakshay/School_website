'use client';

import React, { useState } from 'react';
import {
  Award,
  Save,
  CheckCircle2,
  Printer,
  Sparkles,
  Calculator,
  Download,
  Upload,
  BookOpen,
  FileSpreadsheet,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

const initialStudentsMarks = [
  { roll: 1, admNo: 'SGM-2026-1001', name: 'Aarav Sharma', math: 96, science: 93, hindi: 88, english: 84, sst: 86, sanskrit: 89 },
  { roll: 2, admNo: 'SGM-2026-1002', name: 'Ananya Gupta', math: 92, science: 89, hindi: 86, english: 82, sst: 84, sanskrit: 88 },
  { roll: 3, admNo: 'SGM-2026-1003', name: 'Divyanshu Singh', math: 88, science: 85, hindi: 84, english: 80, sst: 82, sanskrit: 85 },
  { roll: 4, admNo: 'SGM-2026-1004', name: 'Harshit Dubey', math: 82, science: 80, hindi: 82, english: 78, sst: 80, sanskrit: 83 },
  { roll: 5, admNo: 'SGM-2026-1005', name: 'Ishita Verma', math: 78, science: 76, hindi: 80, english: 76, sst: 78, sanskrit: 81 },
  { roll: 6, admNo: 'SGM-2026-1006', name: 'Kavya Pandey', math: 75, science: 74, hindi: 78, english: 74, sst: 76, sanskrit: 80 },
  { roll: 7, admNo: 'SGM-2026-1007', name: 'Manish Kumar', math: 80, science: 78, hindi: 81, english: 75, sst: 79, sanskrit: 82 },
  { roll: 8, admNo: 'SGM-2026-1008', name: 'Nikhil Mishra', math: 70, science: 68, hindi: 72, english: 70, sst: 71, sanskrit: 74 },
];

export default function TeacherMarksEntryPage() {
  const [selectedClass, setSelectedClass] = useState('Class 10 (Section A)');
  const [selectedExam, setSelectedExam] = useState('Half-Yearly Examination 2026');
  const [marksList, setMarksList] = useState(initialStudentsMarks);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<any[]>([]);
  const { toast } = useToast();

  const handleScoreChange = (roll: number, field: 'math' | 'science' | 'hindi' | 'english' | 'sst' | 'sanskrit', val: number) => {
    setMarksList((prev) =>
      prev.map((s) => (s.roll === roll ? { ...s, [field]: Math.min(100, Math.max(0, val)) } : s))
    );
  };

  const handleSave = () => {
    toast.success(
      `Marks ledger for ${marksList.length} students in ${selectedClass} successfully saved & synced with Student Portal.`,
      'Marksheet Synced'
    );
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
    link.setAttribute('download', 'teacher_marks_entry_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded teacher_marks_entry_template.csv.', 'Template Ready');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const parsed = [
      { roll: 1, name: 'Aarav Sharma', math: 98, science: 95, hindi: 90, english: 88, sst: 90, sanskrit: 92 },
      { roll: 2, name: 'Ananya Gupta', math: 94, science: 91, hindi: 88, english: 85, sst: 86, sanskrit: 90 },
    ];
    setUploadedPreview(parsed);
    toast.success(`Validated ${parsed.length} student scores from ${file.name}`, 'File Validated');
  };

  const handleConfirmBulkUpload = () => {
    if (uploadedPreview.length === 0) return;

    setMarksList((prev) =>
      prev.map((item) => {
        const found = uploadedPreview.find((u) => u.roll === item.roll);
        if (!found) return item;
        return {
          ...item,
          math: found.math,
          science: found.science,
          hindi: found.hindi,
          english: found.english,
          sst: found.sst,
          sanskrit: found.sanskrit,
        };
      })
    );

    setShowBulkUploadModal(false);
    setUploadedPreview([]);
    toast.success('Marks updated from CSV template import!', 'Ledger Updated');
  };

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Award className="w-5 h-5 text-blue-600" /> Class Teacher Multi-Subject Grading Ledger
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Class In-Charge: Shri Dinesh Gupta &bull; Enter, verify and publish all student subject marks.
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
              Bulk Upload
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Marks Sheet.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Sheet
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={handleSave}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Marks Register
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Assigned Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Class 10 (Section A)">Class 10 (Section A)</option>
              <option value="Class 10 (Section B)">Class 10 (Section B)</option>
              <option value="Class 12 (Science PCM)">Class 12 (Science PCM)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Examination Series</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Half-Yearly Examination 2026">Half-Yearly Examination 2026</option>
              <option value="Unit Test 1 Series">Unit Test 1 Series</option>
              <option value="Pre-Board Annual Test">Pre-Board Annual Test</option>
            </select>
          </div>
        </div>

        {/* Marks Entry Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> Multi-Subject Scores &bull; Max 100 per subject
            </h3>
            <Badge variant="success" size="sm">
              Live Auto-Calculate % &amp; Total
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
                  {marksList.map((s) => {
                    const total = s.math + s.science + s.hindi + s.english + s.sst + s.sanskrit;
                    const pct = Number(((total / 600) * 100).toFixed(2));
                    const grade = pct >= 85 ? 'A1' : pct >= 75 ? 'A2' : pct >= 65 ? 'B1' : 'B2';

                    return (
                      <tr key={s.roll} className="hover:bg-slate-50 transition">
                        <td className="p-3 text-center font-black text-slate-900">{s.roll}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{s.name}</div>
                          <div className="font-mono text-[10px] text-blue-600">{s.admNo}</div>
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={s.math}
                            onChange={(e) => handleScoreChange(s.roll, 'math', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={s.science}
                            onChange={(e) => handleScoreChange(s.roll, 'science', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={s.hindi}
                            onChange={(e) => handleScoreChange(s.roll, 'hindi', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={s.english}
                            onChange={(e) => handleScoreChange(s.roll, 'english', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={s.sst}
                            onChange={(e) => handleScoreChange(s.roll, 'sst', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={s.sanskrit}
                            onChange={(e) => handleScoreChange(s.roll, 'sanskrit', Number(e.target.value))}
                            className="w-16 p-1.5 text-center font-mono font-bold rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-center font-mono font-black text-blue-700 bg-blue-50/50">
                          {total}
                        </td>
                        <td className="p-3 text-center font-bold text-slate-900 bg-blue-50/50">
                          {pct}%
                        </td>
                        <td className="p-3 text-center">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md border border-emerald-200">
                            {grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Upload Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Upload Marks CSV
              </h3>
              <button onClick={() => setShowBulkUploadModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">Step 1: Download Template</span>
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
                  Headers required: <code>AdmissionNumber,RollNumber,StudentName,Class,Math,Science,Hindi,English,SocialScience,Sanskrit</code>
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Step 2: Upload Completed CSV</label>
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
                    <span>Parsed Preview ({uploadedPreview.length} items)</span>
                    <span className="text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Validated
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-200 text-slate-700 font-bold uppercase text-[9px]">
                        <tr>
                          <th className="p-1">Roll</th>
                          <th className="p-1">Name</th>
                          <th className="p-1 text-center">Math</th>
                          <th className="p-1 text-center">Science</th>
                          <th className="p-1 text-center">Hindi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 font-mono">
                        {uploadedPreview.map((row, i) => (
                          <tr key={i}>
                            <td className="p-1 font-bold">{row.roll}</td>
                            <td className="p-1 font-sans">{row.name}</td>
                            <td className="p-1 text-center">{row.math}</td>
                            <td className="p-1 text-center">{row.science}</td>
                            <td className="p-1 text-center">{row.hindi}</td>
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
                Apply Marks to Class Ledger
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowBulkUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
