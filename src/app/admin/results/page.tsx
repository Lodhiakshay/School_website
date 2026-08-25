'use client';

import React, { useState } from 'react';
import {
  Award,
  Printer,
  Download,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

const fallbackResults = [
  {
    _id: 'res_01',
    rank: 1,
    rollNo: 1,
    studentName: 'Aarav Sharma',
    admNo: 'SGM-2026-1001',
    className: 'Class 10 (Section A)',
    grandTotal: 524,
    maxGrandTotal: 600,
    percentage: 87.33,
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
    grandTotal: 512,
    maxGrandTotal: 600,
    percentage: 85.33,
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
    grandTotal: 498,
    maxGrandTotal: 600,
    percentage: 83.0,
    grade: 'A2',
    decision: 'PASSED (FIRST DIV)',
  },
  {
    _id: 'res_04',
    rank: 1,
    rollNo: 1,
    studentName: 'Harshit Dubey',
    admNo: 'SGM-2026-1004',
    className: 'Class 10 (Section B)',
    grandTotal: 485,
    maxGrandTotal: 600,
    percentage: 80.83,
    grade: 'A2',
    decision: 'PASSED (FIRST DIV)',
  },
  {
    _id: 'res_05',
    rank: 1,
    rollNo: 1,
    studentName: 'Rohan Sharma',
    admNo: 'SGM-2026-1201',
    className: 'Class 12 (Science PCM)',
    grandTotal: 462,
    maxGrandTotal: 500,
    percentage: 92.4,
    grade: 'A1',
    decision: 'PASSED (FIRST DIV WITH HONOURS)',
  },
  {
    _id: 'res_06',
    rank: 1,
    rollNo: 1,
    studentName: 'Sneha Tripathi',
    admNo: 'SGM-2026-1202',
    className: 'Class 12 (Science PCB)',
    grandTotal: 458,
    maxGrandTotal: 500,
    percentage: 91.6,
    grade: 'A1',
    decision: 'PASSED (FIRST DIV WITH HONOURS)',
  },
];

export default function ResultsAdminPage() {
  const [results] = useState(fallbackResults);
  const [activeResult, setActiveResult] = useState<any | null>(null);
  const { toast } = useToast();

  const subjects = [
    { name: 'Mathematics (103)', theory: 68, practical: 28, total: 96, max: 100, grade: 'A1' },
    { name: 'Science (104)', theory: 65, practical: 28, total: 93, max: 100, grade: 'A1' },
    { name: 'Hindi Sahitya (101)', theory: 88, practical: 0, total: 88, max: 100, grade: 'A1' },
    { name: 'English Core (102)', theory: 84, practical: 0, total: 84, max: 100, grade: 'A2' },
    { name: 'Social Science (105)', theory: 86, practical: 0, total: 86, max: 100, grade: 'A2' },
    { name: 'Sanskrit (106)', theory: 89, practical: 0, total: 89, max: 100, grade: 'A1' },
  ];

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6 pt-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Award className="w-5 h-5 text-blue-600" /> Examination Results &amp; Official Report Cards
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review terminal marks, rank calculations, and generate printable Board-style report cards.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.print();
              toast.success('Generated printable Results Ledger.', 'Print Ready');
            }}
            leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
          >
            Print Results Ledger
          </Button>
        </div>

        {/* Results Table */}
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
                  {results.map((r) => (
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
      </div>

      {/* Printable Report Card Modal (Bounded & Scroll Safe) */}
      {activeResult && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col p-5 sm:p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            {/* Pinned Header */}
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

            {/* Scrollable Report Card Body */}
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
                      Terminal Examination Report Card
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
                        <th className="p-2 text-center">Theory</th>
                        <th className="p-2 text-center">Practical</th>
                        <th className="p-2 text-center">Total Scored</th>
                        <th className="p-2 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {subjects.map((sub, i) => (
                        <tr key={i}>
                          <td className="p-2 font-bold text-slate-900">{sub.name}</td>
                          <td className="p-2 text-center font-mono">{sub.theory}</td>
                          <td className="p-2 text-center font-mono">{sub.practical}</td>
                          <td className="p-2 text-center font-mono font-bold text-blue-700">{sub.total} / {sub.max}</td>
                          <td className="p-2 text-center font-black text-emerald-700">{sub.grade}</td>
                        </tr>
                      ))}
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
              </div>
            </div>

            {/* Pinned Action Buttons */}
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
