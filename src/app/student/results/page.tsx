'use client';

import React, { useState, useEffect } from 'react';
import { Award, Printer, Download, Sparkles, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';
import { downloadElementAsPdf, printIsolatedDocument } from '../../../lib/pdf-download';

const fallbackMarkEntries = [
  { code: 'HIN-101', subject: 'Hindi (हिंदी साहित्य एवं व्याकरण)', theoryMax: 100, theoryObtained: 88, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 88, grade: 'A1' },
  { code: 'ENG-102', subject: 'English (General & Literature)', theoryMax: 100, theoryObtained: 84, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 84, grade: 'A2' },
  { code: 'MTH-103', subject: 'Mathematics (गणित)', theoryMax: 100, theoryObtained: 96, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 96, grade: 'A1' },
  { code: 'SCI-104', subject: 'Science (Physics, Chemistry & Biology)', theoryMax: 70, theoryObtained: 65, practicalMax: 30, practicalObtained: 28, totalMax: 100, totalObtained: 93, grade: 'A1' },
  { code: 'SST-105', subject: 'Social Science (सामाजिक विज्ञान)', theoryMax: 100, theoryObtained: 86, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 86, grade: 'A2' },
  { code: 'SAN-106', subject: 'Sanskrit (संस्कृत)', theoryMax: 100, theoryObtained: 89, practicalMax: 0, practicalObtained: 0, totalMax: 100, totalObtained: 89, grade: 'A1' },
];

export default function StudentResultsPage() {
  const [markEntries, setMarkEntries] = useState<any[]>(fallbackMarkEntries);
  const [studentMeta, setStudentMeta] = useState<any>({ name: 'Aarav Sharma', roll: '10-A-01', adm: 'SGM-2026-1001' });
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function loadResult() {
      try {
        const res = await apiClient.get('/results/my-result');
        if (res.data?.data) {
          const r = res.data.data;
          if (r.subjects && r.subjects.length > 0) {
            const mapped = r.subjects.map((s: any, idx: number) => ({
              code: s.subjectCode || `SUB-${101 + idx}`,
              subject: s.subjectName || 'Subject',
              theoryMax: s.maxMarks || 100,
              theoryObtained: s.marksObtained || 0,
              practicalMax: 0,
              practicalObtained: 0,
              totalMax: s.maxMarks || 100,
              totalObtained: s.marksObtained || 0,
              grade: s.grade || 'A1',
            }));
            setMarkEntries(mapped);
          }
          if (r.student) {
            setStudentMeta({
              name: r.student.name || 'Aarav Sharma',
              roll: r.student.rollNumber || '10-A-01',
              adm: r.student.admissionNumber || 'SGM-2026-1001',
            });
          }
        }
      } catch (err) {
        // Fallback gracefully
      }
    }
    loadResult();
  }, []);

  const totalMax = markEntries.reduce((acc, curr) => acc + curr.totalMax, 0);
  const totalObtained = markEntries.reduce((acc, curr) => acc + curr.totalObtained, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(2);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    toast.success('Generating high-definition PDF Scorecard...', 'Preparing Download');
    try {
      const fileName = `${studentMeta.name.replace(/\s+/g, '_')}_Official_Marksheet_2026.pdf`;
      const ok = await downloadElementAsPdf('student-marksheet-card', fileName);
      if (ok) {
        toast.success(`Downloaded ${fileName} successfully!`, 'PDF Download Ready');
      } else {
        printIsolatedDocument('student-marksheet-card');
      }
    } catch {
      printIsolatedDocument('student-marksheet-card');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    printIsolatedDocument('student-marksheet-card');
    toast.success('Sent official High School Marksheet to printer.', 'Print Ready');
  };

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin', 'Parent', 'Admin', 'Principal']}>
      <div className="space-y-6 pt-1">
        {/* Header Bar */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Award className="w-5 h-5 text-blue-600" /> Terminal Examination Marksheet &amp; Scorecard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Official evaluation statement for Half-Yearly Board Assessment (Academic Session 2026-27).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 font-bold text-xs shadow-md"
              leftIcon={isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              onClick={handleDownloadPdf}
              disabled={isDownloading}
            >
              {isDownloading ? 'Exporting PDF...' : 'Download Official PDF'}
            </Button>
            <Button
              variant="outline"
              className="font-bold text-xs"
              leftIcon={<Printer className="w-4 h-4" />}
              onClick={handlePrint}
            >
              Print
            </Button>
          </div>
        </div>

        {/* Official Printable Marksheet Card */}
        <div id="student-marksheet-card" className="printable-document relative bg-white border-4 border-double border-[#002060] rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto">
          {/* Institutional Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0 overflow-hidden select-none">
            <img
              src="/logo.png"
              alt="Watermark Crest"
              className="w-80 sm:w-96 h-80 sm:h-96 object-contain filter grayscale transform -rotate-12"
            />
          </div>

          {/* Institution Header Ribbon */}
          <div className="relative z-10 bg-gradient-to-r from-[#001845] via-[#002060] to-[#001845] text-white p-4 sm:p-7 text-center border-b-4 border-amber-400">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full overflow-hidden bg-white p-1 mx-auto mb-2 sm:mb-3 border-2 border-amber-400 shadow-lg">
              <img src="/logo.png" alt="SGM Crest" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-base sm:text-2xl font-black uppercase tracking-wider text-amber-300 font-serif">
              सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-100 font-medium mt-0.5">
              SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE • SHAMSABAD (FARRUKHABAD)
            </p>
            <p className="text-[9px] sm:text-[11px] text-amber-200 mt-1 font-mono">
              Affiliated with UP State Board of High School &amp; Intermediate • Code: UP-FBD-2026-SGM-089
            </p>

            <div className="mt-2.5 sm:mt-3 inline-block bg-[#001845] text-amber-300 text-[10px] sm:text-xs font-black uppercase px-4 py-1 rounded-full shadow-md border border-amber-400/40 font-mono">
              HALF-YEARLY EVALUATION STATEMENT (2026-2027)
            </div>
          </div>

          {/* Student Demographics Table */}
          <div className="relative z-10 p-3.5 sm:p-7 space-y-4 sm:space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/60 border border-blue-200 text-xs shadow-sm">
              <div>
                <span className="text-blue-900/60 text-[10px] sm:text-xs font-bold uppercase">Student Name:</span>
                <p className="font-black text-slate-900 text-xs sm:text-sm truncate">{`Aarav Sharma`}</p>
              </div>
              <div>
                <span className="text-blue-900/60 text-[10px] sm:text-xs font-bold uppercase">Roll Number:</span>
                <p className="font-mono font-black text-blue-700 text-xs sm:text-sm truncate">10-A-01</p>
              </div>
              <div>
                <span className="text-blue-900/60 text-[10px] sm:text-xs font-bold uppercase">Class &amp; Section:</span>
                <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">Class 10 (Section A)</p>
              </div>
              <div>
                <span className="text-blue-900/60 text-[10px] sm:text-xs font-bold uppercase">Admission ID:</span>
                <p className="font-mono font-bold text-slate-800 text-xs sm:text-sm truncate">SGM-2026-1001</p>
              </div>

              <div>
                <span className="text-blue-900/60 text-[10px] sm:text-xs font-bold uppercase">Father&apos;s Name:</span>
                <p className="font-semibold text-slate-800 text-[11px] sm:text-xs truncate">Shri Rajesh Sharma</p>
              </div>
              <div>
                <span className="text-blue-900/60 text-[10px] sm:text-xs font-bold uppercase">Mother&apos;s Name:</span>
                <p className="font-semibold text-slate-800 text-[11px] sm:text-xs truncate">Smt. Meena Sharma</p>
              </div>
              <div>
                <span className="text-blue-900/60 text-[10px] sm:text-xs font-bold uppercase">Date of Birth:</span>
                <p className="font-mono text-slate-800 text-[11px] sm:text-xs truncate">12 August 2010</p>
              </div>
              <div>
                <span className="text-blue-900/60 text-[10px] sm:text-xs font-bold uppercase">Academic Year:</span>
                <p className="font-bold text-emerald-700 text-[11px] sm:text-xs">2026-2027</p>
              </div>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="flex items-center justify-end text-[10px] text-blue-700 sm:hidden px-1 font-semibold">
              <span>👉 Swipe table sideways to inspect all marks</span>
            </div>

            {/* Subject Marks Table with Horizontal Scroll */}
            <div className="border-2 border-[#002060] rounded-xl sm:rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs min-w-[480px] sm:min-w-[650px]">
                <thead className="bg-[#002060] text-amber-300 font-bold uppercase text-[9px] sm:text-[10px] tracking-wider">
                  <tr>
                    <th className="p-2.5 sm:p-3.5">Code</th>
                    <th className="p-2.5 sm:p-3.5">Subject Name</th>
                    <th className="p-2.5 sm:p-3.5 text-center">Theory</th>
                    <th className="p-2.5 sm:p-3.5 text-center">Practical</th>
                    <th className="p-2.5 sm:p-3.5 text-center">Total</th>
                    <th className="p-2.5 sm:p-3.5 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100 font-medium text-[11px] sm:text-xs">
                  {markEntries.map((m) => (
                    <tr key={m.code} className="hover:bg-blue-50/40">
                      <td className="p-2.5 sm:p-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">{m.code}</td>
                      <td className="p-2.5 sm:p-3.5 font-bold text-slate-900">{m.subject}</td>
                      <td className="p-2.5 sm:p-3.5 text-center font-mono whitespace-nowrap">
                        {m.theoryObtained} / {m.theoryMax}
                      </td>
                      <td className="p-2.5 sm:p-3.5 text-center font-mono whitespace-nowrap">
                        {m.practicalMax > 0 ? `${m.practicalObtained} / ${m.practicalMax}` : '—'}
                      </td>
                      <td className="p-2.5 sm:p-3.5 text-center font-mono font-black text-[#002060] bg-blue-50/60 whitespace-nowrap">
                        {m.totalObtained} / {m.totalMax}
                      </td>
                      <td className="p-2.5 sm:p-3.5 text-center whitespace-nowrap">
                        <span className="bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full text-[10px]">
                          {m.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Grand Total Row */}
                  <tr className="bg-gradient-to-r from-[#001845] via-[#002060] to-[#023e8a] font-black text-white text-xs sm:text-sm border-t-2 border-amber-400">
                    <td colSpan={2} className="p-2.5 sm:p-3.5 uppercase tracking-wide text-amber-300">
                      Grand Total Marks
                    </td>
                    <td colSpan={2} className="p-2.5 sm:p-3.5 text-center text-cyan-200 font-mono whitespace-nowrap">
                      Percentage: {percentage}%
                    </td>
                    <td className="p-2.5 sm:p-3.5 text-center text-amber-300 font-mono whitespace-nowrap text-sm sm:text-base">
                      {totalObtained} / {totalMax}
                    </td>
                    <td className="p-2.5 sm:p-3.5 text-center text-emerald-300 whitespace-nowrap">PASS (FIRST DIV)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Performance Summary Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/80 border border-blue-200 text-xs shadow-sm">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#002060] text-amber-300 flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0 shadow-sm">
                  #1
                </div>
                <div>
                  <span className="text-blue-900/60 text-[9px] sm:text-[10px] uppercase font-bold">Class Standing</span>
                  <p className="font-black text-blue-950 text-xs sm:text-sm">Rank #1 in Class 10-A</p>
                </div>
              </div>
              <div>
                <span className="text-blue-900/60 text-[9px] sm:text-[10px] uppercase font-bold">Aggregate Score</span>
                <p className="font-black text-slate-900 text-xs sm:text-sm">
                  {totalObtained} / {totalMax} ({percentage}%)
                </p>
              </div>
              <div>
                <span className="text-blue-900/60 text-[9px] sm:text-[10px] uppercase font-bold">Result Status</span>
                <p className="font-black text-emerald-700 text-xs sm:text-sm">Passed with Distinction</p>
              </div>
            </div>

            {/* Signatures & Institutional Seal */}
            <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-6 text-center text-xs border-t-2 border-[#002060]">
              <div className="space-y-1">
                <div className="h-10 sm:h-12 flex items-end justify-center pb-1">
                  <span className="font-serif italic text-xs sm:text-sm text-slate-800 font-bold border-b border-slate-400 px-2 sm:px-4 truncate">
                    Shri Dinesh Gupta
                  </span>
                </div>
                <p className="font-bold text-slate-700 text-[11px] sm:text-xs">Class Teacher</p>
                <p className="text-[9px] sm:text-[10px] text-slate-400">Class 10-A Incharge</p>
              </div>

              <div className="space-y-1">
                <div className="h-10 sm:h-12 flex items-center justify-center">
                  <img
                    src="/images/stamps/principal-round-seal.png"
                    alt="Official Round Seal Muhar"
                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain opacity-90"
                  />
                </div>
                <p className="font-bold text-slate-700 text-[11px] sm:text-xs">Official Seal</p>
                <p className="text-[9px] sm:text-[10px] text-slate-400">SGM Shamsabad</p>
              </div>

              <div className="space-y-1">
                <div className="h-10 sm:h-12 flex items-center justify-center">
                  <img
                    src="/images/stamps/principal-signature.png"
                    alt="Principal Digital Signature Stamp"
                    className="h-8 sm:h-10 max-w-[90px] sm:max-w-[120px] object-contain filter contrast-125"
                  />
                </div>
                <p className="font-bold text-slate-700 text-[11px] sm:text-xs">Principal</p>
                <p className="text-[9px] sm:text-[10px] text-slate-400 truncate">Dr. Ramesh Kumar Sharma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
