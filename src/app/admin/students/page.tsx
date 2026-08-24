'use client';

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Eye,
  ArrowUpRight,
  Printer,
  Sparkles,
  X,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackStudents = [
  {
    _id: 'stu_01',
    admissionNumber: 'SGM-2026-1001',
    firstName: 'Aarav',
    lastName: 'Sharma',
    gender: 'male',
    dob: '2010-08-12',
    currentRollNumber: 1,
    currentClassId: { _id: 'cls_10', name: 'Class 10' },
    currentSectionId: { _id: 'sec_10a', name: 'A' },
    parentId: { fatherName: 'Shri Rajesh Sharma', fatherPhone: '+91 9451234501' },
    status: 'active',
  },
  {
    _id: 'stu_02',
    admissionNumber: 'SGM-2026-1002',
    firstName: 'Ananya',
    lastName: 'Gupta',
    gender: 'female',
    dob: '2010-11-05',
    currentRollNumber: 2,
    currentClassId: { _id: 'cls_10', name: 'Class 10' },
    currentSectionId: { _id: 'sec_10a', name: 'A' },
    parentId: { fatherName: 'Shri Suresh Gupta', fatherPhone: '+91 9451234502' },
    status: 'active',
  },
  {
    _id: 'stu_03',
    admissionNumber: 'SGM-2026-1003',
    firstName: 'Divyanshu',
    lastName: 'Singh',
    gender: 'male',
    dob: '2010-04-19',
    currentRollNumber: 3,
    currentClassId: { _id: 'cls_10', name: 'Class 10' },
    currentSectionId: { _id: 'sec_10a', name: 'A' },
    parentId: { fatherName: 'Shri Ram Singh', fatherPhone: '+91 9451234503' },
    status: 'active',
  },
  {
    _id: 'stu_04',
    admissionNumber: 'SGM-2026-1004',
    firstName: 'Harshit',
    lastName: 'Dubey',
    gender: 'male',
    dob: '2010-06-22',
    currentRollNumber: 1,
    currentClassId: { _id: 'cls_10', name: 'Class 10' },
    currentSectionId: { _id: 'sec_10b', name: 'B' },
    parentId: { fatherName: 'Shri Vinod Dubey', fatherPhone: '+91 9451234504' },
    status: 'active',
  },
  {
    _id: 'stu_05',
    admissionNumber: 'SGM-2026-1005',
    firstName: 'Ishita',
    lastName: 'Verma',
    gender: 'female',
    dob: '2010-09-14',
    currentRollNumber: 2,
    currentClassId: { _id: 'cls_10', name: 'Class 10' },
    currentSectionId: { _id: 'sec_10b', name: 'B' },
    parentId: { fatherName: 'Shri Manoj Verma', fatherPhone: '+91 9451234505' },
    status: 'active',
  },
  {
    _id: 'stu_06',
    admissionNumber: 'SGM-2026-1201',
    firstName: 'Rohan',
    lastName: 'Sharma',
    gender: 'male',
    dob: '2008-03-29',
    currentRollNumber: 1,
    currentClassId: { _id: 'cls_12', name: 'Class 12' },
    currentSectionId: { _id: 'sec_12a', name: 'PCM' },
    parentId: { fatherName: 'Shri Devendra Sharma', fatherPhone: '+91 9451234506' },
    status: 'active',
  },
  {
    _id: 'stu_07',
    admissionNumber: 'SGM-2026-1202',
    firstName: 'Sneha',
    lastName: 'Tripathi',
    gender: 'female',
    dob: '2008-07-18',
    currentRollNumber: 2,
    currentClassId: { _id: 'cls_12', name: 'Class 12' },
    currentSectionId: { _id: 'sec_12b', name: 'PCB' },
    parentId: { fatherName: 'Dr. Alok Tripathi', fatherPhone: '+91 9451234507' },
    status: 'active',
  },
  {
    _id: 'stu_08',
    admissionNumber: 'SGM-2026-1101',
    firstName: 'Yash',
    lastName: 'Vardhan',
    gender: 'male',
    dob: '2009-02-11',
    currentRollNumber: 1,
    currentClassId: { _id: 'cls_11', name: 'Class 11' },
    currentSectionId: { _id: 'sec_11a', name: 'PCM' },
    parentId: { fatherName: 'Shri Ramesh Vardhan', fatherPhone: '+91 9451234508' },
    status: 'active',
  },
  {
    _id: 'stu_09',
    admissionNumber: 'SGM-2026-0901',
    firstName: 'Manish',
    lastName: 'Kumar',
    gender: 'male',
    dob: '2011-05-15',
    currentRollNumber: 1,
    currentClassId: { _id: 'cls_09', name: 'Class 9' },
    currentSectionId: { _id: 'sec_09a', name: 'A' },
    parentId: { fatherName: 'Shri Satish Kumar', fatherPhone: '+91 9451234509' },
    status: 'active',
  },
  {
    _id: 'stu_10',
    admissionNumber: 'SGM-2026-0902',
    firstName: 'Pooja',
    lastName: 'Rathore',
    gender: 'female',
    dob: '2011-10-30',
    currentRollNumber: 2,
    currentClassId: { _id: 'cls_09', name: 'Class 9' },
    currentSectionId: { _id: 'sec_09b', name: 'B' },
    parentId: { fatherName: 'Shri Devendra Singh Rathore', fatherPhone: '+91 9451234510' },
    status: 'active',
  },
];

export default function StudentsAdminPage() {
  const [students, setStudents] = useState<any[]>(fallbackStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    dob: '2010-01-01',
    className: 'Class 10',
    sectionName: 'A',
    fatherName: '',
    fatherPhone: '',
    residentialAddress: 'Shamsabad, Farrukhabad (UP)',
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'stu_' + Date.now(),
      admissionNumber: `SGM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      gender: newStudent.gender,
      dob: newStudent.dob,
      currentRollNumber: students.length + 1,
      currentClassId: { _id: 'cls_custom', name: newStudent.className },
      currentSectionId: { _id: 'sec_custom', name: newStudent.sectionName },
      parentId: { fatherName: newStudent.fatherName, fatherPhone: newStudent.fatherPhone },
      status: 'active',
    };

    setStudents([created, ...students]);
    setShowAddModal(false);
    toast.success(`Enrolled student ${created.firstName} ${created.lastName}!`, 'Admission Completed');
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parentId?.fatherPhone?.includes(searchTerm);
    const matchClass = selectedClass === 'all' || s.currentClassId?.name === selectedClass;
    return matchSearch && matchClass;
  });

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff']}>
      <div className="space-y-6 pt-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <GraduationCap className="w-5 h-5 text-blue-600" /> Student Information System (SIS)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              1,248 Enrolled Scholars &bull; Manage student profiles, print royal identity badges, and record admissions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Student Roster.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Roster
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              New Student Admission
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by student name, admission number, or father's phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full sm:w-48 p-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">All Classes (Nursery - 12)</option>
            <option value="Class 10">Class 10 (Board)</option>
            <option value="Class 12">Class 12 (Board)</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 9">Class 9</option>
          </select>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 sm:hidden px-1">
          <span>👉 Swipe table sideways to view contacts &amp; actions</span>
        </div>

        {/* Students Table with Horizontal Scroll */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-extrabold tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3.5">Admission No</th>
                    <th className="px-4 py-3.5">Student Name</th>
                    <th className="px-4 py-3.5">Class &amp; Section</th>
                    <th className="px-4 py-3.5">Roll No</th>
                    <th className="px-4 py-3.5">Father Contact</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Identity Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((stu) => (
                    <tr key={stu._id} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {stu.admissionNumber}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">
                        {stu.firstName} {stu.lastName}
                      </td>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap">
                        {stu.currentClassId?.name} ({stu.currentSectionId?.name})
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {stu.currentRollNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{stu.parentId?.fatherName}</div>
                        <div className="font-mono text-[10px] text-slate-400">{stu.parentId?.fatherPhone}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {stu.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Printer className="w-3.5 h-3.5 text-slate-600" />}
                          onClick={() => {
                            setActiveStudent(stu);
                            setShowIdCardModal(true);
                          }}
                        >
                          Print ID Card
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

      {/* Royal Navy & Gold ID Card Modal */}
      {showIdCardModal && activeStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border-2 border-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 font-mono">
                OFFICIAL INSTITUTIONAL ID CARD
              </span>
              <button onClick={() => setShowIdCardModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ID Badge Card */}
            <div className="bg-white border-2 border-[#002060] rounded-2xl overflow-hidden shadow-lg text-center font-sans">
              <div className="bg-[#002060] text-white p-3 border-b-2 border-amber-400">
                <h3 className="font-serif font-black text-sm text-amber-300">सरस्वती ज्ञान मन्दिर</h3>
                <p className="text-[9px] uppercase tracking-wider text-slate-200">INTERMEDIATE COLLEGE &bull; SHAMSABAD</p>
              </div>

              <div className="p-4 space-y-3">
                <div className="w-20 h-20 rounded-2xl border-2 border-[#002060] mx-auto overflow-hidden bg-slate-100 p-0.5 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
                    alt={activeStudent.firstName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div>
                  <h4 className="font-black text-base text-slate-900 font-serif">
                    {activeStudent.firstName} {activeStudent.lastName}
                  </h4>
                  <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-black px-2.5 py-0.5 rounded-full mt-0.5">
                    {activeStudent.currentClassId?.name} - Section {activeStudent.currentSectionId?.name}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Adm No:</span>
                    <span className="font-mono font-bold text-blue-700">{activeStudent.admissionNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Roll No:</span>
                    <span className="font-mono font-bold text-slate-900">{activeStudent.currentRollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parent:</span>
                    <span className="font-semibold text-slate-800">{activeStudent.parentId?.fatherName}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-100">
                  <span>Valid: 2026-2027</span>
                  <span className="font-bold text-slate-700">Principal Signature</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-xs"
                onClick={() => {
                  window.print();
                  toast.success('Generated printable Student ID Card.', 'Print Ready');
                }}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print ID Card
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowIdCardModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* New Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> New Student Enrollment
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name *"
                  required
                  placeholder="e.g. Aarav"
                  value={newStudent.firstName}
                  onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                />
                <Input
                  label="Last Name *"
                  required
                  placeholder="e.g. Sharma"
                  value={newStudent.lastName}
                  onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Class</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newStudent.className}
                    onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                  >
                    <option value="Class 10">Class 10</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 9">Class 9</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Section</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newStudent.sectionName}
                    onChange={(e) => setNewStudent({ ...newStudent, sectionName: e.target.value })}
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="PCM">PCM Stream</option>
                    <option value="PCB">PCB Stream</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Father Name *"
                  required
                  placeholder="e.g. Shri Rajesh Sharma"
                  value={newStudent.fatherName}
                  onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                />
                <Input
                  label="Father Mobile *"
                  required
                  placeholder="+91 9451234567"
                  value={newStudent.fatherPhone}
                  onChange={(e) => setNewStudent({ ...newStudent, fatherPhone: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Enroll Student
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
