'use client';

import React, { useState } from 'react';
import {
  Award,
  Save,
  CheckCircle2,
  Printer,
  Sparkles,
  Calculator,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

const initialStudentsMarks = [
  { roll: 1, name: 'Aarav Sharma', theory: 68, practical: 28, total: 96, grade: 'A1' },
  { roll: 2, name: 'Ananya Gupta', theory: 65, practical: 27, total: 92, grade: 'A1' },
  { roll: 3, name: 'Divyanshu Singh', theory: 62, practical: 26, total: 88, grade: 'A1' },
  { roll: 4, name: 'Harshit Dubey', theory: 59, practical: 25, total: 84, grade: 'A2' },
  { roll: 5, name: 'Ishita Verma', theory: 64, practical: 26, total: 90, grade: 'A1' },
  { roll: 6, name: 'Kavya Pandey', theory: 54, practical: 24, total: 78, grade: 'B1' },
  { roll: 7, name: 'Manish Kumar', theory: 58, practical: 25, total: 83, grade: 'A2' },
  { roll: 8, name: 'Nikhil Mishra', theory: 48, practical: 22, total: 70, grade: 'B2' },
  { roll: 9, name: 'Pooja Rathore', theory: 61, practical: 26, total: 87, grade: 'A1' },
  { roll: 10, name: 'Rohan Sharma', theory: 63, practical: 27, total: 90, grade: 'A1' },
];

export default function TeacherMarksEntryPage() {
  const [marksList, setMarksList] = useState(initialStudentsMarks);
  const { toast } = useToast();

  const handleScoreChange = (roll: number, field: 'theory' | 'practical', value: number) => {
    setMarksList(
      marksList.map((s) => {
        if (s.roll !== roll) return s;
        const theory = field === 'theory' ? Math.min(70, Math.max(0, value)) : s.theory;
        const practical = field === 'practical' ? Math.min(30, Math.max(0, value)) : s.practical;
        const total = theory + practical;
        const grade =
          total >= 91 ? 'A1' : total >= 81 ? 'A2' : total >= 71 ? 'B1' : total >= 61 ? 'B2' : 'C1';
        return { ...s, theory, practical, total, grade };
      })
    );
  };

  const handleSave = () => {
    toast.success(
      'Mathematics Half-Yearly marks saved and submitted to Controller of Examinations.',
      'Marksheet Synced'
    );
  };

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Award className="w-5 h-5 text-blue-600" /> Enter Class 10-A Marks &bull; Mathematics (103)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Subject Teacher: Shri Dinesh Gupta &bull; Maximum Marks: 70 Theory + 30 Practical = 100 Total
            </p>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Marks Entry Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5 text-center">Theory Score (Max 70)</th>
                    <th className="p-3.5 text-center">Practical (Max 30)</th>
                    <th className="p-3.5 text-center">Total / 100</th>
                    <th className="p-3.5 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {marksList.map((s) => (
                    <tr key={s.roll} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-mono font-black text-slate-900">{s.roll}</td>
                      <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          max={70}
                          min={0}
                          value={s.theory}
                          onChange={(e) => handleScoreChange(s.roll, 'theory', Number(e.target.value))}
                          className="w-20 p-1.5 rounded-lg border border-slate-300 font-mono font-bold text-center focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          max={30}
                          min={0}
                          value={s.practical}
                          onChange={(e) =>
                            handleScoreChange(s.roll, 'practical', Number(e.target.value))
                          }
                          className="w-20 p-1.5 rounded-lg border border-slate-300 font-mono font-bold text-center focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </td>
                      <td className="p-3.5 text-center font-mono font-black text-blue-700 text-sm">
                        {s.total} / 100
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {s.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
