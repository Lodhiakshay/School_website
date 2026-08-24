'use client';

import React from 'react';
import {
  Clock,
  Printer,
  Calendar,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

export default function StudentTimetablePage() {
  const { toast } = useToast();

  const daysPlan = [
    {
      day: 'Monday',
      periods: [
        { num: 1, time: '09:00 - 09:45 AM', subject: 'Mathematics (103)', teacher: 'Shri Dinesh Gupta', room: 'Room 101' },
        { num: 2, time: '09:45 - 10:30 AM', subject: 'Physics Science (104)', teacher: 'Dr. Anita Srivastava', room: 'Physics Lab' },
        { num: 3, time: '10:30 - 11:15 AM', subject: 'Hindi Sahitya (101)', teacher: 'Smt. Geeta Dixit', room: 'Room 101' },
        { num: 4, time: '11:45 - 12:30 PM', subject: 'English Core (102)', teacher: 'Shri Vikramaditya Singh', room: 'Room 101' },
        { num: 5, time: '12:30 - 01:15 PM', subject: 'Social Science (105)', teacher: 'Shri Manoj Pathak', room: 'Room 101' },
        { num: 6, time: '01:15 - 02:00 PM', subject: 'Computer Applications', teacher: 'Shri Amit Verma', room: 'IT Lab' },
      ],
    },
    {
      day: 'Tuesday',
      periods: [
        { num: 1, time: '09:00 - 09:45 AM', subject: 'Chemistry Science (104)', teacher: 'Dr. Anand Tiwari', room: 'Chem Lab' },
        { num: 2, time: '09:45 - 10:30 AM', subject: 'Mathematics (103)', teacher: 'Shri Dinesh Gupta', room: 'Room 101' },
        { num: 3, time: '10:30 - 11:15 AM', subject: 'Sanskrit Vyakaran (106)', teacher: 'Acharya R. Dixit', room: 'Room 101' },
        { num: 4, time: '11:45 - 12:30 PM', subject: 'English Core (102)', teacher: 'Shri Vikramaditya Singh', room: 'Room 101' },
        { num: 5, time: '12:30 - 01:15 PM', subject: 'Biology Science (104)', teacher: 'Smt. Sunita Verma', room: 'Bio Lab' },
        { num: 6, time: '01:15 - 02:00 PM', subject: 'Physical Education & Yoga', teacher: 'Shri R.K. Yadav', room: 'Ground' },
      ],
    },
    {
      day: 'Wednesday',
      periods: [
        { num: 1, time: '09:00 - 09:45 AM', subject: 'Mathematics (103)', teacher: 'Shri Dinesh Gupta', room: 'Room 101' },
        { num: 2, time: '09:45 - 10:30 AM', subject: 'Hindi Sahitya (101)', teacher: 'Smt. Geeta Dixit', room: 'Room 101' },
        { num: 3, time: '10:30 - 11:15 AM', subject: 'Physics Practical (104)', teacher: 'Dr. Anita Srivastava', room: 'Physics Lab' },
        { num: 4, time: '11:45 - 12:30 PM', subject: 'Social Science (105)', teacher: 'Shri Manoj Pathak', room: 'Room 101' },
        { num: 5, time: '12:30 - 01:15 PM', subject: 'English Grammar (102)', teacher: 'Shri Vikramaditya Singh', room: 'Room 101' },
        { num: 6, time: '01:15 - 02:00 PM', subject: 'Library & Reading', teacher: 'Smt. Geeta Dixit', room: 'Library' },
      ],
    },
    {
      day: 'Thursday',
      periods: [
        { num: 1, time: '09:00 - 09:45 AM', subject: 'Chemistry Practical (104)', teacher: 'Dr. Anand Tiwari', room: 'Chem Lab' },
        { num: 2, time: '09:45 - 10:30 AM', subject: 'Mathematics (103)', teacher: 'Shri Dinesh Gupta', room: 'Room 101' },
        { num: 3, time: '10:30 - 11:15 AM', subject: 'Social Science (105)', teacher: 'Shri Manoj Pathak', room: 'Room 101' },
        { num: 4, time: '11:45 - 12:30 PM', subject: 'Hindi Vyakaran (101)', teacher: 'Smt. Geeta Dixit', room: 'Room 101' },
        { num: 5, time: '12:30 - 01:15 PM', subject: 'Sanskrit (106)', teacher: 'Acharya R. Dixit', room: 'Room 101' },
        { num: 6, time: '01:15 - 02:00 PM', subject: 'Computer Applications', teacher: 'Shri Amit Verma', room: 'IT Lab' },
      ],
    },
    {
      day: 'Friday',
      periods: [
        { num: 1, time: '09:00 - 09:45 AM', subject: 'Mathematics (103)', teacher: 'Shri Dinesh Gupta', room: 'Room 101' },
        { num: 2, time: '09:45 - 10:30 AM', subject: 'Biology Science (104)', teacher: 'Smt. Sunita Verma', room: 'Bio Lab' },
        { num: 3, time: '10:30 - 11:15 AM', subject: 'English Core (102)', teacher: 'Shri Vikramaditya Singh', room: 'Room 101' },
        { num: 4, time: '11:45 - 12:30 PM', subject: 'Hindi Sahitya (101)', teacher: 'Smt. Geeta Dixit', room: 'Room 101' },
        { num: 5, time: '12:30 - 01:15 PM', subject: 'Social Science (105)', teacher: 'Shri Manoj Pathak', room: 'Room 101' },
        { num: 6, time: '01:15 - 02:00 PM', subject: 'Vedic Chanting & Moral Ed.', teacher: 'Acharya R. Dixit', room: 'Auditorium' },
      ],
    },
    {
      day: 'Saturday',
      periods: [
        { num: 1, time: '08:30 - 09:15 AM', subject: 'Weekly Unit Test / Quiz', teacher: 'All Faculty', room: 'Room 101' },
        { num: 2, time: '09:15 - 10:00 AM', subject: 'Science Practical Revision', teacher: 'Science Faculty', room: 'Labs' },
        { num: 3, time: '10:00 - 10:45 AM', subject: 'Mathematics Doubt Clearing', teacher: 'Shri Dinesh Gupta', room: 'Room 101' },
        { num: 4, time: '11:00 - 11:45 AM', subject: 'Sports, CCA & Debate Club', teacher: 'CCA Committee', room: 'Ground' },
      ],
    },
  ];

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Clock className="w-5 h-5 text-blue-600" /> Class 10-A Timetable &amp; Schedule
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Weekly 6-day lecture schedule &bull; Room: 101 &bull; Class Teacher: Shri Dinesh Gupta
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.print();
              toast.success('Generated printable Student Timetable.', 'Print Ready');
            }}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Schedule
          </Button>
        </div>

        {/* Timetable Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {daysPlan.map((dayPlan) => (
            <Card key={dayPlan.day} className="border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
                <span className="font-serif font-black text-xs uppercase tracking-wide text-amber-300">
                  {dayPlan.day}
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">
                  {dayPlan.periods.length} Periods
                </span>
              </div>

              <CardContent className="p-4 space-y-2.5">
                {dayPlan.periods.map((p) => (
                  <div
                    key={p.num}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition shadow-sm space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-blue-700">Period {p.num}</span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{p.time}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs">{p.subject}</div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{p.teacher}</span>
                      <span className="font-semibold text-slate-700">{p.room}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
