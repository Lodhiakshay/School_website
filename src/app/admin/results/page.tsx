'use client';

import React, { useState, useEffect } from 'react';
import { Award, Printer, Download, Sparkles, ShieldCheck } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function ResultsAdminPage() {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeResult, setActiveResult] = useState<any>(null);
  const [showReportCardModal, setShowReportCardModal] = useState(false);

  useEffect(() => {
    apiClient.get('/results').then((res) => {
      setResults(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  const subjects = [
    { name: 'Mathematics (103)', theory: 68, practical: 20, total: 88, max: 100, grade: 'A1' },
    { name: 'Science (104)', theory: 65, practical: 19, total: 84, max: 100, grade: 'A2' },
    { name: 'Hindi Sahitya (101)', theory: 90, practical: 0, total: 90, max: 100, grade: 'A1' },
    { name: 'English Core (102)', theory: 86, practical: 0, total: 86, max: 100, grade: 'A2' },
    { name: 'Social Science (105)', theory: 89, practical: 0, total: 89, max: 100, grade: 'A1' },
    { name: 'Computer Applications (106)', theory: 67, practical: 20, total: 87, max: 100, grade: 'A1' },
  ];

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" /> Examination Results &amp; Official Report Cards
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Review terminal marks, rank calculations, and generate printable Board-style report cards.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner label="Loading marks and examination ledger..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
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
                    <tr key={r._id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-extrabold text-blue-600">Rank #{r.rank || 1}</td>
                      <td className="px-4 py-3 font-bold">{r.studentId?.currentRollNumber || 1}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{r.studentId?.firstName} {r.studentId?.lastName}</td>
                      <td className="px-4 py-3">{r.classId?.name || 'Class 10'}</td>
                      <td className="px-4 py-3 font-semibold">{r.grandTotal} / {r.maxGrandTotal}</td>
                      <td className="px-4 py-3 font-black text-blue-700">{r.percentage}%</td>
                      <td className="px-4 py-3">
                        <Badge size="sm" variant="success">
                          {r.grade}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Printer className="w-3.5 h-3.5" />}
                          onClick={() => {
                            setActiveResult(r);
                            setShowReportCardModal(true);
                          }}
                        >
                          Print Report Card
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Printable Report Card Modal with School Crest */}
      {activeResult && (
        <Modal isOpen={showReportCardModal} onClose={() => setShowReportCardModal(false)} title="Official Terminal Examination Report Card" maxWidth="lg">
          <div className="p-8 bg-white border-2 border-slate-900 rounded-3xl space-y-6 text-slate-900 text-xs shadow-md">
            {/* Header with Logo */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-900 bg-white shadow-md flex-shrink-0">
                <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="text-center flex-1 px-4">
                <h2 className="text-lg font-black tracking-wider uppercase font-serif text-blue-950">सरस्वती ज्ञान मन्दिर इण्टर कॉलेज</h2>
                <h3 className="text-sm font-black tracking-wider uppercase text-slate-900">SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE</h3>
                <p className="text-xs text-slate-700 font-bold">शमसाबाद, फर्रुखाबाद (उ०प्र०) • Shamsabad, Farrukhabad, UP (PIN: 209503)</p>
                <p className="text-[10px] text-slate-500 font-medium">Affiliated to UP Board of High School &amp; Intermediate Education (Affiliation: UP-FBD-2026-SGM-089)</p>
                <span className="inline-block mt-2 font-black text-xs bg-slate-900 text-white px-4 py-1 rounded-full uppercase tracking-wider">
                  Unit Test 1 Report Card • Academic Session 2026-2027
                </span>
              </div>
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-xl text-[10px] text-slate-400 font-bold text-center p-1">
                Student Photo
              </div>
            </div>

            {/* Student Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 font-semibold">Student Name:</span>
                <p className="font-bold text-slate-900">{activeResult.studentId?.firstName} {activeResult.studentId?.lastName}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Admission No:</span>
                <p className="font-mono font-bold text-blue-700">{activeResult.studentId?.admissionNumber || 'SGM-2026-0001'}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Class &amp; Section:</span>
                <p className="font-bold text-slate-900">Class 10 (Section A)</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Roll Number:</span>
                <p className="font-bold text-slate-900">{activeResult.studentId?.currentRollNumber || 1}</p>
              </div>
            </div>

            {/* Marks Table */}
            <div className="border border-slate-300 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5">Theory</th>
                    <th className="p-2.5">Practical</th>
                    <th className="p-2.5">Marks Scored</th>
                    <th className="p-2.5">Max Marks</th>
                    <th className="p-2.5">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {subjects.map((sub, i) => (
                    <tr key={i}>
                      <td className="p-2.5 font-bold text-slate-900">{sub.name}</td>
                      <td className="p-2.5">{sub.theory}</td>
                      <td className="p-2.5">{sub.practical}</td>
                      <td className="p-2.5 font-bold text-blue-700">{sub.total}</td>
                      <td className="p-2.5 text-slate-500">{sub.max}</td>
                      <td className="p-2.5 font-black text-emerald-700">{sub.grade}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 border-t-2 border-slate-300 font-bold text-slate-900">
                  <tr>
                    <td colSpan={3} className="p-2.5 text-right uppercase">Grand Total:</td>
                    <td className="p-2.5 text-blue-700 font-black">524</td>
                    <td className="p-2.5">600</td>
                    <td className="p-2.5 font-black text-emerald-700">A1</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Result Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                <span className="text-slate-500 font-semibold">Percentage</span>
                <p className="text-base font-black text-blue-700">{activeResult.percentage}%</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
                <span className="text-slate-500 font-semibold">Class Rank</span>
                <p className="text-base font-black text-indigo-700">Rank #{activeResult.rank || 1}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-slate-500 font-semibold">Result Decision</span>
                <p className="text-base font-black text-emerald-700">PASSED (FIRST DIV)</p>
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-8 flex items-center justify-between text-[11px] text-slate-600">
              <div className="text-center">
                <div className="w-36 border-b border-slate-400 mb-1"></div>
                <span className="font-semibold">Class Teacher Signature</span>
              </div>
              <div className="text-center">
                <div className="w-36 border-b border-slate-400 mb-1"></div>
                <span className="font-semibold">Principal Signature &amp; Seal</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowReportCardModal(false)}>Close</Button>
            <Button size="sm" variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>Print Official Report Card</Button>
          </div>
        </Modal>
      )}
    </PortalLayout>
  );
}
