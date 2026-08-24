const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function writeFile(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Wrote:', relPath);
}

// 1. Principal Portal
writeFile('src/app/principal/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  UserCheck,
  CalendarCheck,
  Bell,
  Sparkles,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { apiClient } from '../../lib/api-client';

export default function PrincipalDashboardPage() {
  const [stats, setStats] = useState<any>({
    overview: {
      totalStudents: 1248,
      totalTeachers: 42,
      attendancePercentage: 96,
      pendingAdmissions: 6,
    },
  });

  useEffect(() => {
    apiClient.get('/dashboard/admin').then((res) => {
      if (res.data?.data) setStats(res.data.data);
    }).catch(() => {});
  }, []);

  return (
    <PortalLayout allowedRoles={['Principal', 'SuperAdmin']}>
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Principal &amp; Director Executive Office</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Academic Governance &amp; Institutional Oversight
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Enrolled Students" value={stats.overview?.totalStudents || 1248} subtitle="Nursery - Class 12" icon={<GraduationCap className="w-5 h-5" />} color="blue" />
        <MetricCard title="Faculty Instructors" value={stats.overview?.totalTeachers || 42} subtitle="Full-Time Teachers" icon={<UserCheck className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Today's Attendance" value={\`\${stats.overview?.attendancePercentage || 96}%\`} subtitle="Campus Present" icon={<CalendarCheck className="w-5 h-5" />} color="indigo" />
        <MetricCard title="Admission Inquiries" value={stats.overview?.pendingAdmissions || 6} subtitle="Awaiting Review" icon={<Award className="w-5 h-5" />} color="amber" />
      </div>
    </PortalLayout>
  );
}
`);

// 2. Teacher Portal
writeFile('src/app/teacher/page.tsx', `
'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, Clock, BookOpen, Award, Sparkles } from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';

export default function TeacherDashboardPage() {
  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Faculty &amp; Teacher Workspace</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Welcome, Shri Dinesh Chandra Gupta
        </h1>
        <p className="text-xs text-slate-300">
          Senior Teacher (Mathematics &amp; Science). Manage classroom attendance, timetable lectures, homework, and marks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/teacher/attendance" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" />
          <h3 className="text-sm font-bold">Mark Daily Attendance</h3>
          <p className="text-xs text-slate-500">Take batch attendance for Class 10A.</p>
        </Link>
        <Link href="/teacher/homework" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <h3 className="text-sm font-bold">Homework &amp; Tasks</h3>
          <p className="text-xs text-slate-500">Assign chapter exercises and problem sets.</p>
        </Link>
        <Link href="/teacher/marks" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
          <Award className="w-6 h-6 text-amber-600" />
          <h3 className="text-sm font-bold">Enter Exam Marks</h3>
          <p className="text-xs text-slate-500">Input student theory &amp; practical marks.</p>
        </Link>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/teacher/attendance/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, Save } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function TeacherAttendancePage() {
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/attendance/class-sheet', {
      params: { classId: '6a8c23b4696177c803396123', sectionId: '6a8c23b4696177c803396150', date: new Date().toISOString().split('T')[0] }
    }).then((res) => {
      setRecords(res.data?.data?.records || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" /> Class 10A Attendance Marker
        </h1>
      </div>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Admission No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {records.map((r) => (
                  <tr key={r.studentId}>
                    <td className="p-3 font-bold">{r.rollNumber}</td>
                    <td className="p-3 font-mono text-blue-600">{r.admissionNumber}</td>
                    <td className="p-3 font-bold">{r.name}</td>
                    <td className="p-3"><span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-bold uppercase">{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </PortalLayout>
  );
}
`);

writeFile('src/app/teacher/timetable/page.tsx', `
'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';

export default function TeacherTimetablePage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" /> My Teaching Schedule
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((d) => (
          <Card key={d} className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase">{d}</h4>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">Period 1: Mathematics (Class 10A) • 08:00 AM - 08:40 AM</div>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">Period 3: Mathematics (Class 9A) • 09:20 AM - 10:00 AM</div>
          </Card>
        ))}
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/teacher/homework/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function TeacherHomeworkPage() {
  const [hw, setHw] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/homework').then((res) => {
      setHw(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Assigned Homework Tasks
        </h1>
      </div>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {hw.map((h) => (
                  <tr key={h._id}>
                    <td className="p-3 font-bold">{h.title}</td>
                    <td className="p-3 text-blue-600">{h.subjectId?.name || 'Subject'}</td>
                    <td className="p-3">{formatDate(h.dueDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </PortalLayout>
  );
}
`);

writeFile('src/app/teacher/marks/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Award, Save } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function TeacherMarksEntryPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/students', { params: { classId: '6a8c23b4696177c803396123' } }).then((res) => {
      setStudents(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Enter Class 10A Mathematics Marks
        </h1>
        <Button size="sm" variant="primary" leftIcon={<Save className="w-4 h-4" />} onClick={() => alert('Marks saved!')}>Save Marks</Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Theory (Max 70)</th>
                  <th className="p-3">Practical (Max 30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {students.map((s) => (
                  <tr key={s._id}>
                    <td className="p-3 font-bold">{s.currentRollNumber || 1}</td>
                    <td className="p-3 font-bold">{s.firstName} {s.lastName}</td>
                    <td className="p-3"><input type="number" defaultValue={65} className="w-20 border rounded p-1" /></td>
                    <td className="p-3"><input type="number" defaultValue={20} className="w-20 border rounded p-1" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </PortalLayout>
  );
}
`);

writeFile('src/app/teacher/notices/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function TeacherNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/notices').then((res) => {
      setNotices(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Teacher', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" /> Faculty Circulars
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          notices.map((n) => (
            <Card key={n._id} className="p-5 space-y-2">
              <h3 className="font-bold text-sm">{n.title}</h3>
              <p className="text-xs text-slate-600">{n.content}</p>
            </Card>
          ))
        )}
      </div>
    </PortalLayout>
  );
}
`);

// 3. Student Portal
writeFile('src/app/student/page.tsx', `
'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, CalendarCheck, Award, BookOpen, Receipt, Sparkles } from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';

export default function StudentDashboardPage() {
  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Student Academic Desk • Session 2026-2027</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Welcome back, Aarav Sharma!
        </h1>
        <p className="text-xs text-slate-300">
          Admission No: <strong className="text-white font-mono">SGM-2026-0001</strong> • Class 10 (Section A) • Roll No: 01
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Attendance" value="96.0%" subtitle="Board Qualified" icon={<CalendarCheck className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Exam Rank" value="Rank #1" subtitle="87.33% (A1)" icon={<Award className="w-5 h-5" />} color="blue" />
        <MetricCard title="Homework" value="2 Tasks" subtitle="Active assignments" icon={<BookOpen className="w-5 h-5" />} color="indigo" />
        <MetricCard title="Fee Dues" value="₹ 0" subtitle="All dues cleared" icon={<Receipt className="w-5 h-5" />} color="amber" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/student/timetable" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
          <h3 className="font-bold text-sm">Class Timetable</h3>
          <p className="text-xs text-slate-500">View daily 6 lecture periods and rooms.</p>
        </Link>
        <Link href="/student/homework" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
          <h3 className="font-bold text-sm">Homework Tasks</h3>
          <p className="text-xs text-slate-500">Check chapter assignments &amp; submit solutions.</p>
        </Link>
        <Link href="/student/results" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
          <h3 className="font-bold text-sm">Report Cards</h3>
          <p className="text-xs text-slate-500">Download and print official marks cards.</p>
        </Link>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/student/timetable/page.tsx', `
'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';

export default function StudentTimetablePage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" /> Class 10A Timetable
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((d) => (
          <Card key={d} className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase">{d}</h4>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">Period 1: Mathematics (103) • 08:00 AM - 08:40 AM</div>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">Period 2: Science (104) • 08:40 AM - 09:20 AM</div>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">Period 3: Hindi Sahitya (101) • 09:20 AM - 10:00 AM</div>
          </Card>
        ))}
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/student/attendance/page.tsx', `
'use client';

import React from 'react';
import { CalendarCheck, ShieldCheck } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';

export default function StudentAttendancePage() {
  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" /> My Attendance Record
        </h1>
      </div>
      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
        <span className="text-xs font-semibold text-emerald-800 uppercase">Overall Attendance: 96.0%</span>
        <p className="text-xs text-emerald-700 flex items-center gap-1 mt-1"><ShieldCheck className="w-4 h-4" /> Fully Eligible for Board Exams</p>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/student/homework/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function StudentHomeworkPage() {
  const [hw, setHw] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/homework').then((res) => {
      setHw(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Homework &amp; Assignments Desk
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          hw.map((h) => (
            <Card key={h._id} className="p-5 space-y-2">
              <h3 className="font-bold text-sm">{h.title}</h3>
              <p className="text-xs text-slate-600">{h.description}</p>
              <span className="text-[10px] text-slate-400">Due: {formatDate(h.dueDate)}</span>
            </Card>
          ))
        )}
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/student/results/page.tsx', `
'use client';

import React from 'react';
import { Award, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Button } from '../../../components/ui/button';

export default function StudentResultsPage() {
  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Unit Test 1 Progress Report
        </h1>
        <Button size="sm" variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>Print</Button>
      </div>
      <div className="p-8 bg-white border-2 border-slate-800 rounded-2xl space-y-4">
        <div className="text-center">
          <h2 className="font-black text-sm uppercase">SARSWATI GYAN MANDIR</h2>
          <p className="text-xs text-slate-600">Unit Test 1 Report Card • Aarav Sharma (Class 10A)</p>
          <div className="text-lg font-black text-emerald-700 mt-2">Rank #1 • 87.33% (Grade A1)</div>
        </div>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/student/fees/page.tsx', `
'use client';

import React from 'react';
import { Receipt, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';

export default function StudentFeesPage() {
  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Receipt className="w-6 h-6 text-blue-600" /> Fee Vouchers &amp; Receipts
        </h1>
      </div>
      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        <div>
          <h3 className="font-bold text-sm text-emerald-900">Current Balance: ₹ 0 (Paid)</h3>
          <p className="text-xs text-emerald-700">Quarter 1 &amp; 2 tuition fees cleared.</p>
        </div>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/student/notices/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function StudentNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/notices').then((res) => {
      setNotices(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['Student', 'SuperAdmin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" /> Student Noticeboard
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          notices.map((n) => (
            <Card key={n._id} className="p-5 space-y-2">
              <h3 className="font-bold text-sm">{n.title}</h3>
              <p className="text-xs text-slate-600">{n.content}</p>
            </Card>
          ))
        )}
      </div>
    </PortalLayout>
  );
}
`);

// 4. Parent Portal
writeFile('src/app/parent/page.tsx', `
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, GraduationCap, CalendarCheck, Award, BookOpen, Receipt, Sparkles } from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';

export default function ParentDashboardPage() {
  const children = [
    { id: '1', name: 'Aarav Sharma', class: 'Class 10A', attendance: '96%', rank: '#1' },
    { id: '2', name: 'Ananya Sharma', class: 'Class 6A', attendance: '98%', rank: '#2' },
  ];
  const [active, setActive] = useState(children[0]);

  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black">Parent Portal &bull; Rajesh Sharma</h1>
            <p className="text-xs text-slate-300">Monitor academic performance for your enrolled children.</p>
          </div>
          <div className="flex gap-2">
            {children.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={\`px-3 py-1.5 rounded-lg text-xs font-bold \${active.id === c.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}\`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MetricCard title="Child Attendance" value={active.attendance} subtitle={active.name} icon={<CalendarCheck className="w-5 h-5" />} color="emerald" />
        <MetricCard title="Terminal Rank" value={active.rank} subtitle={active.class} icon={<Award className="w-5 h-5" />} color="blue" />
        <MetricCard title="Fee Status" value="₹ 0" subtitle="Paid" icon={<Receipt className="w-5 h-5" />} color="amber" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/parent/attendance" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h3 className="font-bold text-sm">Attendance Calendar</h3>
          <p className="text-xs text-slate-500">Check daily attendance.</p>
        </Link>
        <Link href="/parent/results" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h3 className="font-bold text-sm">Report Cards</h3>
          <p className="text-xs text-slate-500">View progress report cards.</p>
        </Link>
        <Link href="/parent/fees" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h3 className="font-bold text-sm">Fee Receipts</h3>
          <p className="text-xs text-slate-500">Inspect payment history.</p>
        </Link>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/parent/attendance/page.tsx', `
'use client';

import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';

export default function ParentAttendancePage() {
  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
      <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <CalendarCheck className="w-6 h-6 text-blue-600" /> Child Attendance Record
      </h1>
      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl mt-4">
        <span className="font-bold text-sm text-emerald-900">Aarav Sharma Attendance: 96.0% (Present)</span>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/parent/results/page.tsx', `
'use client';

import React from 'react';
import { Award, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Button } from '../../../components/ui/button';

export default function ParentResultsPage() {
  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Child Report Card
        </h1>
        <Button size="sm" variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>Print</Button>
      </div>
      <div className="p-6 bg-white border rounded-2xl mt-4 space-y-2">
        <h3 className="font-bold">Aarav Sharma &bull; Class 10A</h3>
        <p className="text-sm text-emerald-700 font-bold">Rank #1 (87.33% - Grade A1)</p>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/parent/fees/page.tsx', `
'use client';

import React from 'react';
import { Receipt, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';

export default function ParentFeesPage() {
  return (
    <PortalLayout allowedRoles={['Parent', 'SuperAdmin']}>
      <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <Receipt className="w-6 h-6 text-blue-600" /> Fee Receipts
      </h1>
      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl mt-4 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        <span className="text-sm font-bold text-emerald-900">All fees cleared for current term.</span>
      </div>
    </PortalLayout>
  );
}
`);

console.log('All remaining portals written.');

