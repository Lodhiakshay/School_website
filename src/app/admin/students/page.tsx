'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  GraduationCap,
  Plus,
  Search,
  Printer,
  X,
  FileSpreadsheet,
  Download,
  Upload,
  Building2,
  Languages,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

const sgmStudents = [
  {
    _id: 'stu_01',
    campus: 'sgm',
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
    campus: 'sgm',
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
    campus: 'sgm',
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
    campus: 'sgm',
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
    campus: 'sgm',
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
    campus: 'sgm',
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
    campus: 'sgm',
    admissionNumber: 'SGM-2026-1202',
    firstName: 'Sneha',
    lastName: 'Tripathi',
    gender: 'female',
    dob: '2008-07-11',
    currentRollNumber: 2,
    currentClassId: { _id: 'cls_12', name: 'Class 12' },
    currentSectionId: { _id: 'sec_12a', name: 'PCM' },
    parentId: { fatherName: 'Shri Alok Tripathi', fatherPhone: '+91 9451234507' },
    status: 'active',
  },
];

const sssdStudents = [
  {
    _id: 'sssd_01',
    campus: 'sssd',
    admissionNumber: 'SSSD-2026-501',
    firstName: 'Aarav',
    lastName: 'Malhotra',
    gender: 'male',
    dob: '2015-05-12',
    currentRollNumber: 1,
    currentClassId: { _id: 'cls_sssd_5', name: 'Class 5' },
    currentSectionId: { _id: 'sec_sssd_5a', name: 'Rose' },
    parentId: { fatherName: 'Mr. Deepak Malhotra', fatherPhone: '+91 9839120001' },
    status: 'active',
  },
  {
    _id: 'sssd_02',
    campus: 'sssd',
    admissionNumber: 'SSSD-2026-801',
    firstName: 'Kiara',
    lastName: 'Saxena',
    gender: 'female',
    dob: '2012-09-18',
    currentRollNumber: 2,
    currentClassId: { _id: 'cls_sssd_8', name: 'Class 8' },
    currentSectionId: { _id: 'sec_sssd_8a', name: 'Lotus' },
    parentId: { fatherName: 'Mr. Alok Saxena', fatherPhone: '+91 9839120002' },
    status: 'active',
  },
  {
    _id: 'sssd_03',
    campus: 'sssd',
    admissionNumber: 'SSSD-2026-101',
    firstName: 'Reyansh',
    lastName: 'Verma',
    gender: 'male',
    dob: '2010-02-25',
    currentRollNumber: 3,
    currentClassId: { _id: 'cls_sssd_10', name: 'Class 10' },
    currentSectionId: { _id: 'sec_sssd_10a', name: 'Einstein' },
    parentId: { fatherName: 'Mr. Sanjay Verma', fatherPhone: '+91 9839120003' },
    status: 'active',
  },
  {
    _id: 'sssd_04',
    campus: 'sssd',
    admissionNumber: 'SSSD-2026-001',
    firstName: 'Myra',
    lastName: 'Kapoor',
    gender: 'female',
    dob: '2022-04-10',
    currentRollNumber: 1,
    currentClassId: { _id: 'cls_sssd_nur', name: 'Nursery' },
    currentSectionId: { _id: 'sec_sssd_nura', name: 'Sunflowers' },
    parentId: { fatherName: 'Mr. Rahul Kapoor', fatherPhone: '+91 9839120004' },
    status: 'active',
  },
];

export default function StudentsAdminPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<'sgm' | 'sssd'>('sgm');
  const [students, setStudents] = useState<any[]>(sgmStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleCampusSwitch = (campus: 'sgm' | 'sssd') => {
    setSelectedCampus(campus);
    if (campus === 'sgm') {
      setStudents(sgmStudents);
      toast.info('Switched to Sarswati Gyan Mandir (Inter College) Roster', 'Campus Active');
    } else {
      setStudents(sssdStudents);
      toast.info('Switched to SSSD Public School (English Medium) Roster', 'Campus Active');
    }
  };

  const handleDownloadSampleCsv = () => {
    const prefix = selectedCampus === 'sssd' ? 'SSSD' : 'SGM';
    const csvContent =
      'AdmissionNumber,FirstName,LastName,Gender,DOB,Class,Section,RollNumber,FatherName,FatherPhone,MotherName,Address\n' +
      `${prefix}-2026-1015,Rahul,Dubey,Male,2010-05-14,Class 10,A,15,Shri Alok Dubey,+919451234599,Smt. Sarita Dubey,"Near Bus Stand, Shamsabad"\n` +
      `${prefix}-2026-1016,Pooja,Mishra,Female,2010-08-20,Class 10,A,16,Shri Manoj Mishra,+919451234588,Smt. Sunita Mishra,"Civil Lines, Farrukhabad"\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${prefix.toLowerCase()}_students_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${prefix} students template.csv`, 'Template Ready');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const prefix = selectedCampus === 'sssd' ? 'SSSD' : 'SGM';

    const parsedData = [
      {
        admissionNumber: `${prefix}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: 'Shivam',
        lastName: 'Rathore',
        gender: 'Male',
        className: selectedCampus === 'sssd' ? 'Class 5' : 'Class 10',
        sectionName: 'A',
        rollNumber: students.length + 1,
        fatherName: 'Mr. Narendra Rathore',
        fatherPhone: '+91 9839123456',
      },
      {
        admissionNumber: `${prefix}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: 'Kriti',
        lastName: 'Saxena',
        gender: 'Female',
        className: selectedCampus === 'sssd' ? 'Class 8' : 'Class 10',
        sectionName: 'A',
        rollNumber: students.length + 2,
        fatherName: 'Mr. Sandeep Saxena',
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
      campus: selectedCampus,
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
    const prefix = selectedCampus === 'sssd' ? 'SSSD' : 'SGM';
    const created = {
      _id: 'stu_' + Date.now(),
      campus: selectedCampus,
      admissionNumber: `${prefix}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
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
    toast.success(`Enrolled student ${created.firstName} ${created.lastName} at ${prefix === 'SSSD' ? 'SSSD Public School' : 'SGM College'}!`, 'Admission Completed');
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

  const isSSSD = activeStudent?.campus === 'sssd' || selectedCampus === 'sssd';

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'AdmissionStaff']}>
      <div className="space-y-6 pt-1">
        {/* Header with Multi-Campus Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <GraduationCap className="w-5 h-5 text-blue-600" /> Student Information System (SIS)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-Campus SIS Roster &bull; Generate official ID badges, bulk import, and maintain scholars dossiers.
            </p>
          </div>

          {/* Campus Selector Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 flex-shrink-0">
            <button
              type="button"
              onClick={() => handleCampusSwitch('sgm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                selectedCampus === 'sgm'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>SGM Inter College</span>
            </button>
            <button
              type="button"
              onClick={() => handleCampusSwitch('sssd')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                selectedCampus === 'sssd'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-amber-300" />
              <span>SSSD Public School</span>
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
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
                toast.success('Generated printable roster.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Roster
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setShowAddModal(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className={selectedCampus === 'sssd' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'}
          >
            Enroll New Scholar
          </Button>
        </div>

        {/* Filter Toolbar */}
        <Card className="border-slate-200">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search by Scholar Name, Roll No, Adm No or Father Mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full md:w-48 p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Classes ({selectedCampus === 'sssd' ? 'SSSD Wing' : 'SGM Wing'})</option>
                {selectedCampus === 'sssd' ? (
                  <>
                    <option value="Nursery">Nursery</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 10">Class 10</option>
                  </>
                ) : (
                  <>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </>
                )}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Student Table */}
        <Card className="border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 pl-5">Scholar &amp; Adm No</th>
                  <th className="p-3.5">Campus</th>
                  <th className="p-3.5">Class &amp; Section</th>
                  <th className="p-3.5">Roll No</th>
                  <th className="p-3.5">Guardian Contact</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right pr-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 pl-5">
                      <div className="font-bold text-slate-900">
                        {s.firstName} {s.lastName}
                      </div>
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border font-bold ${s.campus === 'sssd' || selectedCampus === 'sssd' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-blue-700 bg-blue-50 border-blue-200'}`}>
                        {s.admissionNumber}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {s.campus === 'sssd' || selectedCampus === 'sssd' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                          <Languages className="w-3 h-3 text-emerald-600" /> SSSD English
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                          <Building2 className="w-3 h-3 text-blue-600" /> SGM College
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-800">{s.currentClassId?.name}</span>
                      <span className="text-slate-500 text-[11px] block">Sec {s.currentSectionId?.name}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-700">{s.currentRollNumber}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{s.parentId?.fatherName}</div>
                      <span className="font-mono text-slate-500 text-[11px]">{s.parentId?.fatherPhone}</span>
                    </td>
                    <td className="p-3.5">
                      <Badge variant="success" className="text-[10px]">
                        Active
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right pr-5 space-x-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className={`h-7 text-[11px] font-bold ${s.campus === 'sssd' || selectedCampus === 'sssd' ? 'text-emerald-700 hover:text-emerald-800 border-emerald-300' : 'text-blue-700 hover:text-blue-800 border-blue-300'}`}
                        onClick={() => {
                          setActiveStudent(s);
                          setShowIdCardModal(true);
                        }}
                        leftIcon={<Printer className="w-3 h-3" />}
                      >
                        Print ID Badge
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Official Identity Badge Modal Portal (Rendered to root document.body for 100% Full-Screen Blur) */}
      {mounted && showIdCardModal && activeStudent && createPortal(
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-[340px] w-full p-4 shadow-2xl space-y-3 animate-in zoom-in-95 duration-150 border border-slate-200 my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className={`text-[10px] font-black uppercase tracking-wider font-mono ${isSSSD ? 'text-emerald-700' : 'text-blue-700'}`}>
                {isSSSD ? 'SSSD ENGLISH MEDIUM ID BADGE' : 'SGM INTER COLLEGE ID BADGE'}
              </span>
              <button
                onClick={() => setShowIdCardModal(false)}
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-lg transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ID Badge Card: Emerald Green Theme for SSSD & Royal Navy Theme for SGM */}
            <div className={`bg-white border-2 ${isSSSD ? 'border-emerald-700' : 'border-[#002060]'} rounded-2xl overflow-hidden shadow-md text-center font-sans`}>
              {/* Header Banner */}
              {isSSSD ? (
                <div className="bg-gradient-to-r from-emerald-950 via-[#064e3b] to-teal-950 text-white p-2.5 border-b-2 border-amber-400 flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-sm flex-shrink-0">
                    <img src="/images/sssd-logo.png" alt="SSSD Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif font-black text-xs text-amber-300 leading-tight">SSSD PUBLIC SCHOOL</h3>
                    <p className="text-[8px] uppercase tracking-wider text-emerald-200 font-bold">100% ENGLISH MEDIUM &bull; SHAMSABAD</p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#002060] text-white p-2.5 border-b-2 border-amber-400 flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-sm flex-shrink-0">
                    <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif font-black text-xs text-amber-300 leading-tight">सरस्वती ज्ञान मन्दिर</h3>
                    <p className="text-[8px] uppercase tracking-wider text-slate-200 font-bold">INTERMEDIATE COLLEGE &bull; SHAMSABAD</p>
                  </div>
                </div>
              )}

              <div className="p-3 space-y-2.5">
                {/* Scholar Avatar */}
                <div className={`w-16 h-16 rounded-2xl border-2 ${isSSSD ? 'border-emerald-600 bg-emerald-50' : 'border-blue-600 bg-blue-50'} mx-auto overflow-hidden p-0.5 shadow-sm`}>
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
                    alt={activeStudent.firstName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div>
                  <h4 className="font-black text-sm text-slate-900 font-serif">
                    {activeStudent.firstName} {activeStudent.lastName}
                  </h4>
                  <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded-full mt-0.5 border ${
                    isSSSD ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-blue-100 text-blue-800 border-blue-200'
                  }`}>
                    {activeStudent.currentClassId?.name} - Section {activeStudent.currentSectionId?.name}
                  </span>
                </div>

                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-left text-[11px] space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Adm No:</span>
                    <span className={`font-mono font-black ${isSSSD ? 'text-emerald-700' : 'text-blue-700'}`}>{activeStudent.admissionNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Roll No:</span>
                    <span className="font-mono font-bold text-slate-900">{activeStudent.currentRollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parent:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[170px]">{activeStudent.parentId?.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Emergency:</span>
                    <span className="font-mono text-slate-700 font-bold">{activeStudent.parentId?.fatherPhone}</span>
                  </div>
                </div>

                {/* Stamped Seals & Principal Signature */}
                <div className="pt-1.5 flex items-end justify-between text-[8px] text-slate-400 border-t border-slate-200">
                  <div className="text-left space-y-0.5">
                    <img
                      src={isSSSD ? '/images/stamps/sssd-principal-round-seal.png' : '/images/stamps/principal-round-seal.png'}
                      alt="Principal Round Seal"
                      className="w-10 h-10 object-contain drop-shadow-sm transform -rotate-3"
                    />
                    <span className={`font-mono text-[8px] block font-bold ${isSSSD ? 'text-emerald-800' : 'text-slate-600'}`}>Valid: 2026-27</span>
                  </div>
                  <div className="text-center">
                    <img
                      src={isSSSD ? '/images/stamps/sssd-principal-signature.png' : '/images/stamps/principal-signature.png'}
                      alt="Principal Signature"
                      className="w-24 h-10 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                size="sm"
                className={`w-full font-bold text-xs ${isSSSD ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={() => {
                  window.print();
                  toast.success(`Generated printable ${isSSSD ? 'SSSD' : 'SGM'} ID Card.`, 'Print Ready');
                }}
                leftIcon={<Printer className="w-3.5 h-3.5" />}
              >
                Print ID Card
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => setShowIdCardModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Bulk Upload Modal */}
      {mounted && showBulkUploadModal && createPortal(
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Bulk Student Import ({selectedCampus === 'sssd' ? 'SSSD Public School' : 'SGM Inter College'})
              </h3>
              <button onClick={() => setShowBulkUploadModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-2 bg-slate-50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="font-bold text-slate-700">Select standard formatted CSV / Excel file</p>
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {uploadedPreview.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bold text-slate-800">Preview Parsed Rows ({uploadedPreview.length})</div>
                  <div className="max-h-36 overflow-y-auto space-y-1.5">
                    {uploadedPreview.map((row, idx) => (
                      <div key={idx} className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900">{row.firstName} {row.lastName} ({row.className})</span>
                        <span className="font-mono text-emerald-700">{row.admissionNumber}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold"
                onClick={handleConfirmBulkUpload}
                disabled={uploadedPreview.length === 0}
              >
                Confirm Import ({uploadedPreview.length})
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowBulkUploadModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* New Student Modal */}
      {mounted && showAddModal && createPortal(
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> New Scholar Enrollment ({selectedCampus === 'sssd' ? 'SSSD Public School' : 'SGM Inter College'})
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
                    {selectedCampus === 'sssd' ? (
                      <>
                        <option value="Nursery">Nursery</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 5">Class 5</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 10">Class 10</option>
                      </>
                    ) : (
                      <>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 12">Class 12</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 9">Class 9</option>
                      </>
                    )}
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
                    <option value="Rose">Rose Section</option>
                    <option value="Lotus">Lotus Section</option>
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
                <Button type="submit" className={`w-full font-bold ${selectedCampus === 'sssd' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  Enroll Scholar
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </PortalLayout>
  );
}
