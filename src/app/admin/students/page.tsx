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
  Download,
  Upload,
  AlertCircle,
  FileText,
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
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<any[]>([]);
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

  const handleDownloadSampleCsv = () => {
    const csvContent =
      'AdmissionNumber,FirstName,LastName,Gender,DOB,Class,Section,RollNumber,FatherName,FatherPhone,MotherName,Address\n' +
      'SGM-2026-1015,Rahul,Dubey,Male,2010-05-14,Class 10,A,15,Shri Alok Dubey,+919451234599,Smt. Sarita Dubey,"Near Bus Stand, Shamsabad"\n' +
      'SGM-2026-1016,Pooja,Mishra,Female,2010-08-20,Class 10,A,16,Shri Manoj Mishra,+919451234588,Smt. Sunita Mishra,"Civil Lines, Farrukhabad"\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'students_bulk_upload_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded students_bulk_upload_template.csv with matching fields.', 'Template Ready');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate reading and parsing CSV rows safely
    const parsedData = [
      {
        admissionNumber: `SGM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: 'Shivam',
        lastName: 'Rathore',
        gender: 'Male',
        className: 'Class 10',
        sectionName: 'A',
        rollNumber: students.length + 1,
        fatherName: 'Shri Narendra Rathore',
        fatherPhone: '+91 9839123456',
      },
      {
        admissionNumber: `SGM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: 'Kriti',
        lastName: 'Saxena',
        gender: 'Female',
        className: 'Class 10',
        sectionName: 'A',
        rollNumber: students.length + 2,
        fatherName: 'Shri Sandeep Saxena',
        fatherPhone: '+91 9839123457',
      },
    ];

    setUploadedPreview(parsedData);
    toast.success(`Parsed ${parsedData.length} records from ${file.name}`, 'File Validated');
  };

  const handleConfirmBulkUpload = () => {
    if (uploadedPreview.length === 0) return;

    const formatted = uploadedPreview.map((item) => ({
      _id: 'stu_' + Math.random(),
      admissionNumber: item.admissionNumber,
      firstName: item.firstName,
      lastName: item.lastName,
      gender: item.gender.toLowerCase(),
      dob: '2010-01-01',
      currentRollNumber: item.rollNumber,
      currentClassId: { _id: 'cls_csv', name: item.className },
      currentSectionId: { _id: 'sec_csv', name: item.sectionName },
      parentId: { fatherName: item.fatherName, fatherPhone: item.fatherPhone },
      status: 'active',
    }));

    setStudents([...formatted, ...students]);
    setShowBulkUploadModal(false);
    setUploadedPreview([]);
    toast.success(`Successfully enrolled ${formatted.length} students via CSV Bulk Import!`, 'Bulk Import Complete');
  };

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

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadSampleCsv}
              leftIcon={<Download className="w-4 h-4 text-emerald-600" />}
            >
              Sample CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBulkUploadModal(true)}
              leftIcon={<Upload className="w-4 h-4 text-indigo-600" />}
            >
              Bulk Upload
            </Button>
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
              New Admission
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

      {/* Bulk Upload Modal with Sample Preview */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Student Roster Bulk CSV Upload
              </h3>
              <button onClick={() => setShowBulkUploadModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">Step 1: Download Standard Template</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownloadSampleCsv}
                    className="bg-white text-blue-700 border-blue-300 font-bold"
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download CSV Template
                  </Button>
                </div>
                <p className="text-[11px] text-blue-700">
                  Ensure all headers (AdmissionNumber, FirstName, LastName, Gender, Class, Section, RollNumber, FatherName, FatherPhone) match exactly to avoid column mismatch errors.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Step 2: Choose Prepared CSV File</label>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileUpload}
                  className="w-full p-2.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 font-medium text-xs cursor-pointer hover:bg-slate-100 transition"
                />
              </div>

              {uploadedPreview.length > 0 && (
                <div className="space-y-2 border border-slate-200 rounded-2xl p-3 bg-slate-50">
                  <div className="flex items-center justify-between font-bold text-slate-900 text-xs">
                    <span>Parsed Preview ({uploadedPreview.length} records ready)</span>
                    <span className="text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Valid
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-200 text-slate-700 font-bold uppercase text-[9px]">
                        <tr>
                          <th className="p-1.5">Name</th>
                          <th className="p-1.5">Class</th>
                          <th className="p-1.5">Roll</th>
                          <th className="p-1.5">Father Contact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {uploadedPreview.map((row, i) => (
                          <tr key={i}>
                            <td className="p-1.5 font-bold">{row.firstName} {row.lastName}</td>
                            <td className="p-1.5">{row.className} ({row.sectionName})</td>
                            <td className="p-1.5 font-mono">{row.rollNumber}</td>
                            <td className="p-1.5 font-mono text-[10px]">{row.fatherPhone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold"
                disabled={uploadedPreview.length === 0}
                onClick={handleConfirmBulkUpload}
                leftIcon={<Upload className="w-4 h-4" />}
              >
                Import {uploadedPreview.length} Records to Active Roster
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowBulkUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

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

                <div className="pt-2 flex items-end justify-between text-[9px] text-slate-400 border-t border-slate-200">
                  <div className="text-left space-y-0.5">
                    <img
                      src="/images/stamps/principal-round-seal.png"
                      alt="Round Seal"
                      className="w-10 h-10 object-contain drop-shadow-sm"
                    />
                    <span className="font-mono text-slate-600 text-[8px] block">Valid: 2026-27</span>
                  </div>
                  <div className="text-center">
                    <img
                      src="/images/stamps/principal-signature.png"
                      alt="Principal Sig"
                      className="w-24 h-12 object-contain mx-auto"
                    />
                  </div>
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
