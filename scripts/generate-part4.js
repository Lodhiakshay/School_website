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

// 1. Admin Pages
writeFile('src/app/admin/page.tsx', `
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  UserCheck,
  CreditCard,
  CalendarCheck,
  Sparkles,
  ArrowRight,
  Bell,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { apiClient } from '../../lib/api-client';
import { formatCurrency, formatDate } from '../../lib/utils';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    overview: {
      totalStudents: 1248,
      totalTeachers: 42,
      totalParents: 980,
      totalClasses: 15,
      pendingAdmissions: 6,
      attendancePercentage: 96,
      todayCollection: 18500,
      totalCollected: 4250000,
      totalDues: 380000,
    },
    upcomingExams: [],
    recentNotices: [],
  });

  useEffect(() => {
    apiClient.get('/dashboard/admin').then((res) => {
      if (res.data?.data) {
        setStats(res.data.data);
      }
    }).catch(() => {});
  }, []);

  const overview = stats?.overview || {};

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sarswati Gyan Mandir Administration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Central Administrative Operations Dashboard
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Real-time telemetry across academic sessions, student enrollments, daily classroom attendance, examination marks, and fee collections.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/admin/students">
            <Button size="sm" variant="primary" leftIcon={<GraduationCap className="w-3.5 h-3.5" />}>
              + Add Student
            </Button>
          </Link>
          <Link href="/admin/fees">
            <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Collect Fees
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Active Students"
          value={overview.totalStudents || 1248}
          subtitle="Across Nursery to Class 12"
          icon={<GraduationCap className="w-5 h-5" />}
          color="blue"
          trend={{ value: '+4.2%', isPositive: true }}
        />
        <MetricCard
          title="Faculty & Teachers"
          value={overview.totalTeachers || 42}
          subtitle="PGT & TGT Instructors"
          icon={<UserCheck className="w-5 h-5" />}
          color="emerald"
        />
        <MetricCard
          title="Today's Attendance"
          value={\`\${overview.attendancePercentage || 96}%\`}
          subtitle="Daily Present Roster"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="indigo"
          trend={{ value: 'Normal', isPositive: true }}
        />
        <MetricCard
          title="Today's Fee Collection"
          value={formatCurrency(overview.todayCollection || 18500)}
          subtitle={\`Total Dues: \${formatCurrency(overview.totalDues || 380000)}\`}
          icon={<CreditCard className="w-5 h-5" />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary &amp; Collection Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Collected</span>
                  <div className="text-lg font-bold text-emerald-600 mt-1">
                    {formatCurrency(overview.totalCollected || 4250000)}
                  </div>
                  <span className="text-[10px] text-slate-400">Current Session</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Pending Invoices</span>
                  <div className="text-lg font-bold text-amber-600 mt-1">
                    {formatCurrency(overview.totalDues || 380000)}
                  </div>
                  <span className="text-[10px] text-slate-400">Outstanding balance</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">New Inquiries</span>
                  <div className="text-lg font-bold text-blue-600 mt-1">
                    {overview.pendingAdmissions || 6}
                  </div>
                  <span className="text-[10px] text-slate-400">Awaiting review</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" /> Active School Notices
              </CardTitle>
              <Link href="/admin/notices" className="text-xs text-blue-600 font-semibold hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Independence Day Celebrations</span>
                  <Badge size="sm" variant="info">High</Badge>
                </div>
                <p className="text-slate-500 text-[11px]">All students and teachers are cordially invited for flag hoisting ceremony.</p>
                <span className="text-[10px] text-slate-400">15 Aug 2026</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/admin/school-settings/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { apiClient } from '../../../lib/api-client';

export default function SchoolSettingsPage() {
  const [profile, setProfile] = useState<any>({
    name: 'Sarswati Gyan Mandir',
    tagline: 'Excellence in Education, Culture & Character Building',
    affiliationCode: 'UP-FBD-2026-SGM-089',
    board: 'UP State Board of High School and Intermediate Education',
    address: {
      street: 'Main Road, Near Bus Stand',
      city: 'Shamsabad',
      district: 'Farrukhabad',
      state: 'Uttar Pradesh',
      pincode: '209503',
      country: 'India',
    },
    contact: {
      phone: '+91 9451234567',
      email: 'info@sarswatigyanmandir.edu.in',
    },
    principal: {
      name: 'Dr. Ramesh Kumar Sharma',
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    apiClient.get('/school').then((res) => {
      if (res.data?.data) setProfile(res.data.data);
    }).catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.put('/school', profile);
      setSaveSuccess(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" /> School Configuration &amp; Profile
          </h1>
        </div>
        <Button size="sm" variant="primary" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
          Save Settings
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>School profile saved!</span>
        </div>
      )}

      <Card>
        <CardContent className="p-6 space-y-4">
          <Input label="School Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <Input label="Affiliation Code" value={profile.affiliationCode} onChange={(e) => setProfile({ ...profile, affiliationCode: e.target.value })} />
          <Input label="Board" value={profile.board} onChange={(e) => setProfile({ ...profile, board: e.target.value })} />
        </CardContent>
      </Card>
    </PortalLayout>
  );
}
`);

writeFile('src/app/admin/academic-years/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, Plus, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function AcademicYearsPage() {
  const [years, setYears] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/academics/years').then((res) => {
      setYears(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" /> Academic Sessions
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
                  <th className="p-3">Session Name</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">End Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {years.map((y) => (
                  <tr key={y._id}>
                    <td className="p-3 font-bold">{y.name} {y.isCurrent && '(Active)'}</td>
                    <td className="p-3">{formatDate(y.startDate)}</td>
                    <td className="p-3">{formatDate(y.endDate)}</td>
                    <td className="p-3"><Badge size="sm" variant={y.status === 'active' ? 'success' : 'default'}>{y.status}</Badge></td>
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

writeFile('src/app/admin/classes/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function ClassesAdminPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/academics/classes').then((res) => {
      setClasses(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-600" /> Classes &amp; Sections
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
                  <th className="p-3">Class Name</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Sections</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {classes.map((cls) => (
                  <tr key={cls._id}>
                    <td className="p-3 font-bold">{cls.name}</td>
                    <td className="p-3 font-mono text-blue-600">{cls.code}</td>
                    <td className="p-3">{cls.sections?.map((s: any) => \`Sec \${s.name}\`).join(', ') || 'A'}</td>
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

writeFile('src/app/admin/subjects/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { BookMarked } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function SubjectsAdminPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/academics/subjects').then((res) => {
      setSubjects(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-blue-600" /> Subjects Catalog
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
                  <th className="p-3">Subject</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Max Marks</th>
                  <th className="p-3">Passing Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {subjects.map((s) => (
                  <tr key={s._id}>
                    <td className="p-3 font-bold">{s.name}</td>
                    <td className="p-3 font-mono text-blue-600">{s.code}</td>
                    <td className="p-3">{s.maxMarks}</td>
                    <td className="p-3 text-emerald-600">{s.passingMarks}</td>
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

writeFile('src/app/admin/students/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Search, Eye, ArrowUpRight, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { Student } from '../../../types';

export default function StudentsAdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/students');
      setStudents(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" /> Student Information System (SIS)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student rosters, multi-year enrollments, and academic promotions.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner label="Loading student directory..." />
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Admission No</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Class</th>
                  <th className="p-3.5">Roll No</th>
                  <th className="p-3.5">Parent Contact</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {students.map((stu: any) => (
                  <tr key={stu._id} className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-mono font-bold text-blue-600">{stu.admissionNumber}</td>
                    <td className="p-3.5 font-bold text-slate-900">{stu.firstName} {stu.lastName}</td>
                    <td className="p-3.5">{stu.currentClassId?.name || 'Class 10'} ({stu.currentSectionId?.name || 'A'})</td>
                    <td className="p-3.5 font-bold">{stu.currentRollNumber || 1}</td>
                    <td className="p-3.5">{stu.parentId?.fatherPhone || '9839000000'}</td>
                    <td className="p-3.5"><Badge size="sm" variant={stu.status === 'active' ? 'success' : 'warning'}>{stu.status}</Badge></td>
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

writeFile('src/app/admin/parents/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function ParentsAdminPage() {
  const [parents, setParents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/parents').then((res) => {
      setParents(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" /> Parent &amp; Guardian Directory
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
                  <th className="p-3">Father Name</th>
                  <th className="p-3">Mother Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {parents.map((p) => (
                  <tr key={p._id}>
                    <td className="p-3 font-bold">{p.fatherName}</td>
                    <td className="p-3">{p.motherName}</td>
                    <td className="p-3 font-mono text-blue-600">{p.fatherPhone}</td>
                    <td className="p-3">{p.residentialAddress}</td>
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

writeFile('src/app/admin/teachers/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { UserCheck } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function TeachersAdminPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/teachers').then((res) => {
      setTeachers(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-blue-600" /> Faculty &amp; Teacher Directory
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
                  <th className="p-3">Employee ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Designation &amp; Dept</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {teachers.map((t) => (
                  <tr key={t._id}>
                    <td className="p-3 font-mono font-bold text-blue-600">{t.employeeId}</td>
                    <td className="p-3 font-bold">{t.name}</td>
                    <td className="p-3">{t.designation} ({t.department})</td>
                    <td className="p-3">{t.phone}</td>
                    <td className="p-3"><Badge size="sm" variant="success">{t.status}</Badge></td>
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

writeFile('src/app/admin/users/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function UsersAdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/users').then((res) => {
      setUsers(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <UserCircle className="w-6 h-6 text-blue-600" /> User Accounts &amp; Roles
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
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="p-3 font-bold">{u.name}</td>
                    <td className="p-3 text-blue-600 font-mono">{u.email}</td>
                    <td className="p-3"><Badge size="sm" variant="info">{u.role}</Badge></td>
                    <td className="p-3"><Badge size="sm" variant={u.status === 'active' ? 'success' : 'default'}>{u.status}</Badge></td>
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

writeFile('src/app/admin/attendance/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { CalendarCheck, Save } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function AttendanceAdminPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiClient.get('/academics/classes'), apiClient.get('/academics/sections')]).then(([resC, resS]) => {
      const c = resC.data?.data || [];
      const s = resS.data?.data || [];
      setClasses(c);
      setSections(s);
      if (c.length > 0) setSelectedClass(c[0]._id);
      if (s.length > 0) setSelectedSection(s[0]._id);
    });
  }, []);

  const loadSheet = async () => {
    if (!selectedClass || !selectedSection) return;
    setIsLoading(true);
    try {
      const res = await apiClient.get('/attendance/class-sheet', {
        params: { classId: selectedClass, sectionId: selectedSection, date },
      });
      setRecords(res.data?.data?.records || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSheet();
  }, [selectedClass, selectedSection, date]);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Teacher']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" /> Daily Attendance Sheet
        </h1>
      </div>
      <Card>
        <CardContent className="p-4 grid grid-cols-3 gap-3">
          <Select label="Class" options={classes.map((c) => ({ value: c._id, label: c.name }))} value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} />
          <Select label="Section" options={sections.map((s) => ({ value: s._id, label: \`Section \${s.name}\` }))} value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} />
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </CardContent>
      </Card>
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
                  <th className="p-3">Name</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {records.map((r) => (
                  <tr key={r.studentId}>
                    <td className="p-3 font-bold">{r.rollNumber}</td>
                    <td className="p-3 font-mono text-blue-600">{r.admissionNumber}</td>
                    <td className="p-3 font-bold">{r.name}</td>
                    <td className="p-3 uppercase font-bold text-emerald-600">{r.status}</td>
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

writeFile('src/app/admin/timetable/page.tsx', `
'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';

export default function TimetableAdminPage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" /> Class Timetables
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map((d) => (
          <Card key={d} className="p-4 space-y-2">
            <h4 className="font-bold text-xs uppercase">{d}</h4>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">08:00 AM - 08:40 AM: Mathematics (Class 10A)</div>
            <div className="p-2.5 bg-slate-50 rounded border text-xs">08:40 AM - 09:20 AM: Science (Class 10A)</div>
          </Card>
        ))}
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/admin/homework/page.tsx', `
'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';

export default function HomeworkAdminPage() {
  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Homework &amp; LMS
        </h1>
      </div>
      <Card className="p-6">
        <p className="text-xs text-slate-600">Homework and digital study assignments roster.</p>
      </Card>
    </PortalLayout>
  );
}
`);

writeFile('src/app/admin/exams/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function ExamsAdminPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/exams').then((res) => {
      setExams(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-blue-600" /> Examination Schedules
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
                  <th className="p-3">Exam Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Start Date</th>
                  <th className="p-3">End Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {exams.map((e) => (
                  <tr key={e._id}>
                    <td className="p-3 font-bold">{e.name}</td>
                    <td className="p-3 uppercase font-semibold text-blue-600">{e.examType}</td>
                    <td className="p-3">{formatDate(e.startDate)}</td>
                    <td className="p-3">{formatDate(e.endDate)}</td>
                    <td className="p-3"><Badge size="sm" variant="info">{e.status}</Badge></td>
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

writeFile('src/app/admin/results/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Award, Printer, Sparkles } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function ResultsAdminPage() {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/results').then((res) => {
      setResults(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" /> Examination Results &amp; Report Cards
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
                  <th className="p-3">Rank</th>
                  <th className="p-3">Roll</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Total Marks</th>
                  <th className="p-3">Percentage</th>
                  <th className="p-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {results.map((r) => (
                  <tr key={r._id}>
                    <td className="p-3 font-bold text-blue-600">#{r.rank || 1}</td>
                    <td className="p-3">{r.studentId?.currentRollNumber || 1}</td>
                    <td className="p-3 font-bold">{r.studentId?.firstName} {r.studentId?.lastName}</td>
                    <td className="p-3">{r.grandTotal} / {r.maxGrandTotal}</td>
                    <td className="p-3 font-bold text-blue-700">{r.percentage}%</td>
                    <td className="p-3 font-bold text-emerald-700">{r.grade}</td>
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

writeFile('src/app/admin/fees/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatCurrency } from '../../../lib/utils';

export default function FeesAdminPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/fees/invoices').then((res) => {
      setInvoices(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Accountant']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-blue-600" /> Fees, Invoicing &amp; Collection POS
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
                  <th className="p-3">Invoice No</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Billed</th>
                  <th className="p-3">Paid</th>
                  <th className="p-3">Balance</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {invoices.map((inv) => (
                  <tr key={inv._id}>
                    <td className="p-3 font-mono font-bold text-blue-600">{inv.invoiceNumber}</td>
                    <td className="p-3 font-bold">{inv.studentId?.firstName} {inv.studentId?.lastName}</td>
                    <td className="p-3">{inv.title}</td>
                    <td className="p-3 font-bold">{formatCurrency(inv.totalAmount)}</td>
                    <td className="p-3 text-emerald-600 font-semibold">{formatCurrency(inv.paidAmount)}</td>
                    <td className="p-3 font-bold text-rose-600">{formatCurrency(inv.balanceAmount)}</td>
                    <td className="p-3"><Badge size="sm" variant={inv.status === 'paid' ? 'success' : 'warning'}>{inv.status}</Badge></td>
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

writeFile('src/app/admin/admissions/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function AdmissionsAdminPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/admissions').then((res) => {
      setApps(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'AdmissionStaff']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-blue-600" /> Admissions Inquiries &amp; Pipeline
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
                  <th className="p-3">App No</th>
                  <th className="p-3">Applicant</th>
                  <th className="p-3">Target Class</th>
                  <th className="p-3">Father Phone</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {apps.map((a) => (
                  <tr key={a._id}>
                    <td className="p-3 font-mono font-bold text-blue-600">{a.applicationNumber}</td>
                    <td className="p-3 font-bold">{a.applicantName}</td>
                    <td className="p-3">{a.targetClassId?.name || 'Class'}</td>
                    <td className="p-3 font-mono">{a.fatherPhone}</td>
                    <td className="p-3"><Badge size="sm" variant={a.status === 'admitted' ? 'success' : 'info'}>{a.status}</Badge></td>
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

writeFile('src/app/admin/notices/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function NoticesAdminPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/notices').then((res) => {
      setNotices(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-600" /> Noticeboard &amp; Alerts
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          notices.map((n) => (
            <Card key={n._id} className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <Badge size="sm" variant="info">{n.priority}</Badge>
                <span className="text-[10px] text-slate-400">{formatDate(n.publishDate)}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-600">{n.content}</p>
            </Card>
          ))
        )}
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/admin/library/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Library } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function LibraryAdminPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/library/books').then((res) => {
      setBooks(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Librarian']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Library className="w-6 h-6 text-blue-600" /> Central Library Books
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
                  <th className="p-3">ISBN</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Author</th>
                  <th className="p-3">Available Copies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {books.map((b) => (
                  <tr key={b._id}>
                    <td className="p-3 font-mono font-bold text-blue-600">{b.isbn}</td>
                    <td className="p-3 font-bold">{b.title}</td>
                    <td className="p-3">{b.author}</td>
                    <td className="p-3 font-bold text-emerald-600">{b.availableCopies} / {b.totalCopies}</td>
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

writeFile('src/app/admin/transport/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { Bus } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function TransportAdminPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/transport/vehicles').then((res) => {
      setVehicles(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Bus className="w-6 h-6 text-blue-600" /> Transportation &amp; Fleet
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
                  <th className="p-3">Reg. Number</th>
                  <th className="p-3">Vehicle Model</th>
                  <th className="p-3">Driver</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {vehicles.map((v) => (
                  <tr key={v._id}>
                    <td className="p-3 font-mono font-bold text-blue-600">{v.registrationNumber}</td>
                    <td className="p-3">{v.vehicleModel} ({v.capacity} Seats)</td>
                    <td className="p-3 font-bold">{v.driverName} ({v.driverPhone})</td>
                    <td className="p-3"><Badge size="sm" variant="success">{v.status}</Badge></td>
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

writeFile('src/app/admin/certificates/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { FileCheck2, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function CertificatesAdminPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/certificates').then((res) => {
      setCerts(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FileCheck2 className="w-6 h-6 text-blue-600" /> Certificates &amp; Attestations
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
                  <th className="p-3">Certificate No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Issued Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {certs.map((c) => (
                  <tr key={c._id}>
                    <td className="p-3 font-mono font-bold text-blue-600">{c.certificateNumber}</td>
                    <td className="p-3 font-bold">{c.studentId?.firstName} {c.studentId?.lastName}</td>
                    <td className="p-3 uppercase"><Badge size="sm" variant="purple">{c.type}</Badge></td>
                    <td className="p-3">{formatDate(c.issueDate)}</td>
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

writeFile('src/app/admin/documents/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { FolderLock } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function DocumentsAdminPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/documents').then((res) => {
      setDocs(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FolderLock className="w-6 h-6 text-blue-600" /> Secure Document Vault
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
                  <th className="p-3">Category</th>
                  <th className="p-3">File Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {docs.map((d) => (
                  <tr key={d._id}>
                    <td className="p-3 font-bold">{d.title}</td>
                    <td className="p-3"><Badge size="sm" variant="info">{d.category}</Badge></td>
                    <td className="p-3 font-mono">{d.fileName}</td>
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

writeFile('src/app/admin/reports/page.tsx', `
'use client';

import React from 'react';
import { BarChart3, Download, Printer } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export default function ReportsAdminPage() {
  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" /> Central Reports &amp; Ledgers
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5 space-y-3">
          <h3 className="font-bold text-sm">Student Enrollment Master Ledger</h3>
          <p className="text-xs text-slate-500">Export student registrations and class roll-lists.</p>
          <Button size="sm" variant="outline" leftIcon={<Printer className="w-3.5 h-3.5" />} onClick={() => window.print()}>Print Ledger</Button>
        </Card>
        <Card className="p-5 space-y-3">
          <h3 className="font-bold text-sm">Fee Collection &amp; Cash Statement</h3>
          <p className="text-xs text-slate-500">Export financial payments and outstanding dues.</p>
          <Button size="sm" variant="outline" leftIcon={<Printer className="w-3.5 h-3.5" />} onClick={() => window.print()}>Print Ledger</Button>
        </Card>
      </div>
    </PortalLayout>
  );
}
`);

writeFile('src/app/admin/audit-logs/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function AuditLogsAdminPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/audit').then((res) => {
      setLogs(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-blue-600" /> Security Audit Logs
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
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Operator</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Module</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {logs.map((l) => (
                  <tr key={l._id}>
                    <td className="p-3 font-mono">{formatDate(l.createdAt)}</td>
                    <td className="p-3 font-bold">{l.userId?.name || 'Admin'}</td>
                    <td className="p-3">{l.action}</td>
                    <td className="p-3"><Badge size="sm" variant="info">{l.module}</Badge></td>
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

console.log('Admin pages written.');

