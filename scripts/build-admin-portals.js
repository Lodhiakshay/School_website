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
  console.log('Generated:', relPath);
}

// 1. Admin Master Dashboard
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
  TrendingUp,
  FileCheck2,
  Bus,
  Library,
  BookOpen,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { apiClient } from '../../lib/api-client';
import { formatCurrency } from '../../lib/utils';

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
  });

  useEffect(() => {
    apiClient.get('/dashboard/admin').then((res) => {
      if (res.data?.data) setStats(res.data.data);
    }).catch(() => {});
  }, []);

  const overview = stats.overview;

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold bg-blue-500/20 text-blue-300 px-3.5 py-1 rounded-full border border-blue-400/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Master Control Hub • Super Admin</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Sarswati Gyan Mandir Operations &amp; SIS
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl font-medium">
            Centralized telemetry for Academic Session 2026-2027. Manage student admissions, multi-year classes, teacher allocations, fee collections, and examination report cards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/students">
            <Button size="sm" variant="primary" className="font-bold shadow-md shadow-blue-600/30" leftIcon={<GraduationCap className="w-4 h-4" />}>
              + Enroll Student
            </Button>
          </Link>
          <Link href="/admin/fees">
            <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold">
              Fee POS Desk
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Active Students"
          value={overview.totalStudents}
          subtitle="Nursery to Class 12"
          icon={<GraduationCap className="w-5 h-5" />}
          color="blue"
          trend={{ value: '+4.8% YoY', isPositive: true }}
        />
        <MetricCard
          title="Faculty Instructors"
          value={overview.totalTeachers}
          subtitle="Full-Time Educators"
          icon={<UserCheck className="w-5 h-5" />}
          color="emerald"
        />
        <MetricCard
          title="Today's Attendance"
          value={`${overview.attendancePercentage}%`}
          subtitle="Campus Present Rate"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="indigo"
          trend={{ value: 'Optimal', isPositive: true }}
        />
        <MetricCard
          title="Fee Collection (Today)"
          value={formatCurrency(overview.todayCollection)}
          subtitle={`Session: ${formatCurrency(overview.totalCollected)}`}
          icon={<CreditCard className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Operations Quick Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/students" className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 group">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-600">Student Directory (SIS)</h3>
          <p className="text-xs text-slate-500">Student dossiers, parent linkage, multi-year history, and printable Student ID Cards.</p>
        </Link>

        <Link href="/admin/results" className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-600">Exams &amp; Report Cards</h3>
          <p className="text-xs text-slate-500">Mark calculations, terminal positions, and official signed printable report cards.</p>
        </Link>

        <Link href="/admin/certificates" className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 group">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-600">Certificates &amp; TC Desk</h3>
          <p className="text-xs text-slate-500">Generate Transfer Certificates (TC), Character Certificates, and Bonafide letters with serial numbers.</p>
        </Link>
      </div>
    </PortalLayout>
  );
}
`);

// 2. Students SIS & Printable ID Card
writeFile('src/app/admin/students/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Search, Eye, ArrowUpRight, Printer, Sparkles, X } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';

export default function StudentsAdminPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    dob: '2010-01-01',
    classId: '',
    sectionId: '',
    fatherName: '',
    fatherPhone: '',
    residentialAddress: 'Shamsabad, Farrukhabad (UP)',
  });

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const [resStu, resCls, resSec] = await Promise.all([
        apiClient.get('/students'),
        apiClient.get('/academics/classes'),
        apiClient.get('/academics/sections'),
      ]);
      setStudents(resStu.data?.data || []);
      setClasses(resCls.data?.data || []);
      setSections(resSec.data?.data || []);
      if (resCls.data?.data?.length > 0) setNewStudent((p) => ({ ...p, classId: resCls.data.data[0]._id }));
      if (resSec.data?.data?.length > 0) setNewStudent((p) => ({ ...p, sectionId: resSec.data.data[0]._id }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/students', newStudent);
      alert('🎉 Student enrolled successfully!');
      setShowAddModal(false);
      fetchStudents();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to enroll student');
    }
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = selectedClass === 'all' || s.currentClassId?._id === selectedClass;
    return matchSearch && matchClass;
  });

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" /> Student Information System (SIS)
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage student registrations, multi-year enrollments, class promotions, and printable ID Cards.
          </p>
        </div>

        <Button size="sm" variant="primary" className="font-bold shadow-md shadow-blue-600/30" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          New Student Admission
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or admission number (e.g. SGM-2026-0001)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Students Data Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner label="Loading student directory..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-4 py-3.5">Admission No</th>
                    <th className="px-4 py-3.5">Student Name</th>
                    <th className="px-4 py-3.5">Class &amp; Section</th>
                    <th className="px-4 py-3.5">Roll No</th>
                    <th className="px-4 py-3.5">Father Contact</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Student ID Card</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((stu) => (
                    <tr key={stu._id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{stu.admissionNumber}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{stu.firstName} {stu.lastName}</td>
                      <td className="px-4 py-3 font-semibold">{stu.currentClassId?.name || 'Class 10'} ({stu.currentSectionId?.name || 'A'})</td>
                      <td className="px-4 py-3 font-bold">{stu.currentRollNumber || 1}</td>
                      <td className="px-4 py-3 font-mono">{stu.parentId?.fatherPhone || '9839000000'}</td>
                      <td className="px-4 py-3">
                        <Badge size="sm" variant={stu.status === 'active' ? 'success' : 'warning'}>
                          {stu.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Printer className="w-3.5 h-3.5" />}
                          onClick={() => {
                            setActiveStudent(stu);
                            setShowIdCardModal(true);
                          }}
                        >
                          Print ID
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

      {/* Printable ID Card Modal */}
      {activeStudent && (
        <Modal isOpen={showIdCardModal} onClose={() => setShowIdCardModal(false)} title="Student Identity Card" maxWidth="md">
          <div className="p-6 bg-gradient-to-tr from-blue-900 via-indigo-900 to-slate-900 rounded-3xl text-white shadow-2xl space-y-4 border border-blue-500/40">
            <div className="text-center border-b border-blue-700/60 pb-3">
              <h3 className="text-sm font-black tracking-widest uppercase">SARSWATI GYAN MANDIR</h3>
              <p className="text-[10px] text-blue-300">Shamsabad, Farrukhabad (UP) • Student Identity Card</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-xl font-black">
                {activeStudent.firstName?.charAt(0)}
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="text-base font-black text-white">{activeStudent.firstName} {activeStudent.lastName}</h4>
                <p className="text-blue-300 font-mono text-[11px]">Adm No: {activeStudent.admissionNumber}</p>
                <p className="text-slate-200">Class: <strong>{activeStudent.currentClassId?.name || 'Class 10'} ({activeStudent.currentSectionId?.name || 'A'})</strong> | Roll: <strong>{activeStudent.currentRollNumber || 1}</strong></p>
              </div>
            </div>
            <div className="pt-2 border-t border-blue-800 text-[10px] text-blue-300 flex justify-between">
              <span>Valid for Session: 2026-2027</span>
              <span>Principal Sign: Validated</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowIdCardModal(false)}>Close</Button>
            <Button size="sm" variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>Print Card</Button>
          </div>
        </Modal>
      )}

      {/* Add Student Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="New Student Registration (SIS)" maxWidth="lg">
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" required value={newStudent.firstName} onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })} />
            <Input label="Last Name" required value={newStudent.lastName} onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Gender" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} value={newStudent.gender} onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })} />
            <Input label="Date of Birth" type="date" required value={newStudent.dob} onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Father's Name" required value={newStudent.fatherName} onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })} />
            <Input label="Father's Mobile Number" required value={newStudent.fatherPhone} onChange={(e) => setNewStudent({ ...newStudent, fatherPhone: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Confirm Admission</Button>
          </div>
        </form>
      </Modal>
    </PortalLayout>
  );
}
`);

console.log('Admin portals generated.');

