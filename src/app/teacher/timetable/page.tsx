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

export default function TeacherTimetablePage() {
  const { toast } = useToast();

  const facultySchedule = [
    {
      day: 'Monday',
      periods: [
        { num: 1, time: '09:00 - 09:45 AM', subject: 'Mathematics (103)', classVenue: 'Class 10-A (Room 101)' },
        { num: 3, time: '10:30 - 11:15 AM', subject: 'Mathematics (103)', classVenue: 'Class 9-A (Room 103)' },
        { num: 5, time: '12:30 - 01:15 PM', subject: 'Mathematics (103)', classVenue: 'Class 10-B (Room 102)' },
      ],
    },
    {
      day: 'Tuesday',
      periods: [
        { num: 2, time: '09:45 - 10:30 AM', subject: 'Mathematics (103)', classVenue: 'Class 10-A (Room 101)' },
        { num: 4, time: '11:45 - 12:30 PM', subject: 'Mathematics (103)', classVenue: 'Class 9-B (Room 104)' },
        { num: 6, time: '01:15 - 02:00 PM', subject: 'Class Teacher Mentoring', classVenue: 'Class 10-A (Room 101)' },
      ],
    },
    {
      day: 'Wednesday',
      periods: [
        { num: 1, time: '09:00 - 09:45 AM', subject: 'Mathematics (103)', classVenue: 'Class 10-A (Room 101)' },
        { num: 3, time: '10:30 - 11:15 AM', subject: 'Mathematics (103)', classVenue: 'Class 9-A (Room 103)' },
        { num: 5, time: '12:30 - 01:15 PM', subject: 'Maths Lab Activity', classVenue: 'Mathematics Lab' },
      ],
    },
    {
      day: 'Thursday',
      periods: [
        { num: 2, time: '09:45 - 10:30 AM', subject: 'Mathematics (103)', classVenue: 'Class 10-A (Room 101)' },
        { num: 4, time: '11:45 - 12:30 PM', subject: 'Mathematics (103)', classVenue: 'Class 10-B (Room 102)' },
      ],
    },
    {
      day: 'Friday',
      periods: [
        { num: 1, time: '09:00 - 09:45 AM', subject: 'Mathematics (103)', classVenue: 'Class 10-A (Room 101)' },
        { num: 3, time: '10:30 - 11:15 AM', subject: 'Mathematics (103)', classVenue: 'Class 9-A (Room 103)' },
        { num: 5, time: '12:30 - 01:15 PM', subject: 'Remedial Doubt Class', classVenue: 'Room 101' },
      ],
    },
    {
      day: 'Saturday',
      periods: [
        { num: 1, time: '08:30 - 09:15 AM', subject: 'Weekly Unit Assessment', classVenue: 'Class 10-A (Room 101)' },
        { num: 3, time: '10:00 - 10:45 AM', subject: 'Mathematics Doubt Clearing', classVenue: 'Class 10-A (Room 101)' },
      ],
    },
  ];

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Clock className="w-5 h-5 text-blue-600" /> Educator Weekly Teaching Schedule
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Faculty: Shri Dinesh Gupta &bull; Department: Mathematics &bull; Weekly Workload: 18 Periods
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.print();
              toast.success('Generated printable Faculty Schedule.', 'Print Ready');
            }}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print Schedule
          </Button>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {facultySchedule.map((dayPlan) => (
            <Card key={dayPlan.day} className="border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
                <span className="font-serif font-black text-xs uppercase tracking-wide text-amber-300">
                  {dayPlan.day}
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-semibold">
                  {dayPlan.periods.length} Lecture Slots
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
                    <div className="text-[11px] text-slate-500 font-medium">{p.classVenue}</div>
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
