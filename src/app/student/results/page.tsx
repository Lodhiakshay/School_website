'use client';

import React from 'react';
import { Award, Printer, Download, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/toast';

export default function StudentResultsPage() {
  const { toast } = useToast();

  const markEntries = [
    { code: 'HIN-101', subject: 'Hindi (हिंदी साहित्य एवं व्याकरण)', theoryMax: 100, theoryObtained: 88, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 88, grade: 'A1' },
    { code: 'ENG-102', subject: 'English (General & Literature)', theoryMax: 100, theoryObtained: 84, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 84, grade: 'A2' },
    { code: 'MTH-103', subject: 'Mathematics (गणित)', theoryMax: 100, theoryObtained: 96, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 96, grade: 'A1' },
    { code: 'SCI-104', subject: 'Science (Physics, Chemistry & Biology)', theoryMax: 70, theoryObtained: 65, practicalMax: 30, practicalObtained: 28, totalMax: 100, totalObtained: 93, grade: 'A1' },
    { code: 'SST-105', subject: 'Social Science (सामाजिक विज्ञान)', theoryMax: 100, theoryObtained: 86, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 86, grade: 'A2' },
    { code: 'SAN-106', subject: 'Sanskrit (संस्कृत)', theoryMax: 100, theoryObtained: 89, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 89, grade: 'A1' },
  ];

  const totalMax = markEntries.reduce((acc, curr) => acc + curr.totalMax, 0);
  const totalObtained = markEntries.reduce((acc, curr) => acc + curr.totalObtained, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(2);

  const handlePrint = () => {
    window.print();
    toast.success('Generated official High School Marksheet PDF.', 'Scorecard Ready');
  };

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin', 'Parent', 'Admin']}>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Award className="w-5 h-5 text-blue-600" /> Terminal Examination Marksheet &amp; Scorecard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Official evaluation statement for Half-Yearly Board Assessment (Academic Session 2026-27).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700 font-bold text-xs shadow-md shadow-blue-600/30"
              leftIcon={<Printer className="w-4 h-4" />}
              onClick={handlePrint}
            >
              Print / Save PDF Scorecard
            </Button>
          </div>
        </div>

        {/* Official Printable Marksheet Card */}
        <div className="bg-white border-2 border-slate-900 rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto">
          {/* Institution Header Ribbon */}
          <div className="bg-[#002060] text-white p-6 sm:p-8 text-center relative border-b-4 border-amber-400">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white p-1 mx-auto mb-3 border-2 border-amber-400 shadow-lg">
              <img src="/logo.png" alt="SGM Crest" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-base sm:text-xl font-black uppercase tracking-wider text-amber-300 font-serif">
              सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 font-medium">
              SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE • SHAMSABAD (FARRUKHABAD)
            </p>
            <p className="text-[11px] text-amber-200 mt-1 font-mono">
              Affiliated with UP State Board of High School &amp; Intermediate • Code: UP-FBD-2026-SGM-089
            </p>

            <div className="mt-3 inline-block bg-amber-400 text-slate-950 text-xs font-black uppercase px-4 py-1 rounded-full shadow-md">
              HALF-YEARLY EVALUATION STATEMENT (2026-2027)
            </div>
          </div>

          {/* Student Demographics Table */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Student Name:</span>
                <p className="font-black text-slate-900 text-sm">Aarav Sharma</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Roll Number:</span>
                <p className="font-mono font-black text-blue-700 text-sm">10-A-01</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Class &amp; Section:</span>
                <p className="font-bold text-slate-800 text-sm">Class 10 (Section A)</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Admission ID:</span>
                <p className="font-mono font-bold text-slate-800 text-sm">SGM-2026-1001</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Father&apos;s Name:</span>
                <p className="font-semibold text-slate-800">Shri Rajesh Sharma</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Mother&apos;s Name:</span>
                <p className="font-semibold text-slate-800">Smt. Meena Sharma</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Date of Birth:</span>
                <p className="font-mono text-slate-800">12 August 2010</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Academic Year:</span>
                <p className="font-bold text-emerald-700">2026-2027</p>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#002060] text-white font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Subject Name</th>
                    <th className="p-3 text-center">Theory (Max / Obt)</th>
                    <th className="p-3 text-center">Practical (Max / Obt)</th>
                    <th className="p-3 text-center">Total Marks</th>
                    <th className="p-3 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {markEntries.map((m) => (
                    <tr key={m.code} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-blue-700">{m.code}</td>
                      <td className="p-3 font-bold text-slate-900">{m.subject}</td>
                      <td className="p-3 text-center font-mono">
                        {m.theoryObtained} / {m.theoryMax}
                      </td>
                      <td className="p-3 text-center font-mono">
                        {m.practicalMax > 0 ? `${m.practicalObtained} / ${m.practicalMax}` : '—'}
                      </td>
                      <td className="p-3 text-center font-mono font-black text-slate-900">
                        {m.totalObtained} / {m.totalMax}
                      </td>
                      <td className="p-3 text-center">
                        <span className="bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full text-[10px]">
                          {m.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Grand Total Row */}
                  <tr className="bg-slate-100 font-black text-slate-900 text-sm border-t-2 border-slate-900">
                    <td colSpan={2} className="p-3 uppercase">
                      Grand Total Marks
                    </td>
                    <td colSpan={2} className="p-3 text-center text-blue-800 font-mono">
                      Percentage: {percentage}%
                    </td>
                    <td className="p-3 text-center text-emerald-700 font-mono">
                      {totalObtained} / {totalMax}
                    </td>
                    <td className="p-3 text-center text-emerald-700">PASS (FIRST DIV)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Performance Summary Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                  #1
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Class Standing</span>
                  <p className="font-black text-emerald-800">Rank #1 in Class 10-A</p>
                </div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold">Aggregate Score</span>
                <p className="font-black text-slate-900 text-sm">
                  {totalObtained} / {totalMax} ({percentage}%)
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold">Result Status</span>
                <p className="font-black text-emerald-700 text-sm">Passed with Distinction</p>
              </div>
            </div>

            {/* Signatures & Institutional Seal */}
            <div className="pt-8 grid grid-cols-3 gap-6 text-center text-xs border-t border-slate-200">
              <div className="space-y-1">
                <div className="h-10 border-b border-slate-300 font-serif italic text-slate-600 flex items-end justify-center pb-1">
                  Dinesh Gupta
                </div>
                <p className="font-bold text-slate-700">Class Teacher</p>
                <p className="text-[10px] text-slate-400">Class 10-A Incharge</p>
              </div>

              <div className="space-y-1">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-600 mx-auto flex items-center justify-center text-[9px] font-mono text-blue-700 font-bold uppercase p-1 leading-tight">
                  INSTITUTION SEAL
                </div>
                <p className="font-bold text-slate-700">Controller of Exams</p>
              </div>

              <div className="space-y-1">
                <div className="h-10 border-b border-slate-300 font-serif italic text-slate-600 flex items-end justify-center pb-1">
                  Dr. R.K. Sharma
                </div>
                <p className="font-bold text-slate-700">Principal</p>
                <p className="text-[10px] text-slate-400">SGM Intermediate College</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
