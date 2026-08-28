'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Printer,
  Upload,
  Download,
  Mail,
  Phone,
  BookOpen,
  Award,
  X,
  Sparkles,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';
import { downloadElementAsPdf, downloadElementAsImage, printIsolatedDocument } from '../../../lib/pdf-download';
import { ClientPortal } from '../../../components/ui/client-portal';

const fallbackTeachers = [
  {
    _id: 't_01',
    employeeId: 'EMP-1999-001',
    name: 'Dr. Ramesh Kumar Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    designation: 'Principal & Senior Physics Lecturer',
    department: 'Physics',
    qualification: 'M.Sc. (Physics), M.Ed., Ph.D.',
    experience: '28 Years',
    phone: '+91 9451234501',
    email: 'principal@sarswati.edu',
    status: 'active',
    assignedClass: 'Class 12-A',
  },
  {
    _id: 't_02',
    employeeId: 'EMP-2004-012',
    name: 'Shri Dinesh Gupta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    designation: 'Head of Department (Mathematics)',
    department: 'Mathematics',
    qualification: 'M.Sc. (Mathematics), B.Ed.',
    experience: '20 Years',
    phone: '+91 9451234502',
    email: 'dinesh.gupta@sarswati.edu',
    status: 'active',
    assignedClass: 'Class 10-A',
  },
  {
    _id: 't_03',
    employeeId: 'EMP-2008-024',
    name: 'Smt. Sunita Verma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    designation: 'Vice Principal & Chemistry Lecturer',
    department: 'Chemistry',
    qualification: 'M.Sc. (Chemistry), B.Ed.',
    experience: '18 Years',
    phone: '+91 9451234503',
    email: 'sunita.verma@sarswati.edu',
    status: 'active',
    assignedClass: 'Class 12-B',
  },
  {
    _id: 't_04',
    employeeId: 'EMP-2012-038',
    name: 'Dr. Anand Prakash Tiwari',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    designation: 'Senior Biology Lecturer',
    department: 'Biology',
    qualification: 'M.Sc. (Botany), Ph.D., B.Ed.',
    experience: '15 Years',
    phone: '+91 9451234504',
    email: 'anand.tiwari@sarswati.edu',
    status: 'active',
    assignedClass: 'Class 11-B',
  },
  {
    _id: 't_05',
    employeeId: 'EMP-2015-052',
    name: 'Acharya Raghavendra Dixit',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    designation: 'Senior Sanskrit & Vedic Studies Educator',
    department: 'Sanskrit',
    qualification: 'Acharya (Sanskrit), M.A., B.Ed.',
    experience: '16 Years',
    phone: '+91 9451234505',
    email: 'raghavendra.dixit@sarswati.edu',
    status: 'active',
    assignedClass: 'Class 9-A',
  },
  {
    _id: 't_06',
    employeeId: 'EMP-2018-067',
    name: 'Mrs. Priya Mishra',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    designation: 'Head of English Department',
    department: 'English',
    qualification: 'M.A. (English Lit), B.Ed.',
    experience: '11 Years',
    phone: '+91 9451234506',
    email: 'priya.mishra@sarswati.edu',
    status: 'active',
    assignedClass: 'Class 10-B',
  },
  {
    _id: 't_07',
    employeeId: 'EMP-2020-081',
    name: 'Er. Rajeshwar Singh',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    designation: 'Computer Science & AI In-Charge',
    department: 'Computer Science',
    qualification: 'B.Tech (CSE), MCA',
    experience: '8 Years',
    phone: '+91 9451234507',
    email: 'rajeshwar.singh@sarswati.edu',
    status: 'active',
    assignedClass: 'Class 11-A',
  },
];

export default function TeachersAdminPage() {
  const [teachers, setTeachers] = useState<any[]>(fallbackTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [activeTeacherModal, setActiveTeacherModal] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownloadTeacherIdImage = async () => {
    if (!activeTeacherModal) return;
    setIsDownloading(true);
    toast.success(`Exporting HD Badge Image for ${activeTeacherModal.name}...`, 'Preparing ID Image');
    try {
      const fileName = `Faculty_ID_${activeTeacherModal.employeeId}_${activeTeacherModal.name.replace(/\s+/g, '_')}.png`;
      const ok = await downloadElementAsImage('faculty-id-card-inner', fileName);
      if (ok) {
        toast.success(`Downloaded ${fileName} in HD image format!`, 'ID Image Ready');
      } else {
        printIsolatedDocument('faculty-id-card-inner');
      }
    } catch {
      printIsolatedDocument('faculty-id-card-inner');
    } finally {
      setIsDownloading(false);
    }
  };

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    department: 'Physics',
    designation: 'Senior Lecturer',
    qualification: 'M.Sc., B.Ed.',
    phone: '',
    email: '',
    assignedClass: 'Class 10-A',
  });

  useEffect(() => {
    apiClient
      .get('/teachers')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          const mapped = res.data.data.map((t: any) => ({
            ...t,
            avatar:
              t.photoUrl ||
              t.avatar ||
              (t.gender === 'female'
                ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
                : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'),
          }));
          setTeachers(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 't_' + Date.now(),
      employeeId: `EMP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      name: newTeacher.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      designation: newTeacher.designation,
      department: newTeacher.department,
      qualification: newTeacher.qualification,
      experience: '5+ Years',
      phone: newTeacher.phone || '+91 9451234999',
      email: newTeacher.email || `${newTeacher.name.toLowerCase().replace(/\s+/g, '.')}@sarswati.edu`,
      status: 'active',
      assignedClass: newTeacher.assignedClass,
    };
    setTeachers([created, ...teachers]);
    setIsAddModalOpen(false);
    toast.success(`Faculty member ${created.name} added successfully!`, 'Faculty Enrolled');
  };

  const handleBulkUpload = () => {
    setIsBulkModalOpen(false);
    toast.success('Successfully imported 14 faculty members from CSV.', 'Bulk Upload Completed');
  };

  const filteredTeachers = teachers.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = selectedDept === 'all' || t.department === selectedDept;
    return matchSearch && matchDept;
  });

  const departments = ['all', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'Sanskrit', 'English', 'Computer Science'];

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <UserCheck className="w-5 h-5 text-blue-600" /> Faculty &amp; Teacher Directory
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage school educators, academic wing assignments, qualifications, and faculty ID badges.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBulkModalOpen(true)}
              leftIcon={<Upload className="w-4 h-4" />}
            >
              Bulk Import
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Educator
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search faculty name, ID, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedDept === d
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {d === 'all' ? 'All Departments' : d}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTeachers.map((t) => (
            <Card
              key={t._id}
              className="overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-100 flex-shrink-0 shadow-sm relative">
                    <img
                      src={
                        t.photoUrl ||
                        t.avatar ||
                        (t.gender === 'female'
                          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
                          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80')
                      }
                      alt={t.name}
                      onError={(e: any) => {
                        e.currentTarget.src =
                          t.gender === 'female'
                            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
                            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        {t.employeeId}
                      </span>
                      <Badge size="sm" variant="success">
                        {t.status}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mt-1 truncate">{t.name}</h3>
                    <p className="text-xs text-slate-500 font-medium truncate">{t.designation}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Department:</span>
                    <span className="font-bold text-slate-800">{t.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Qualifications:</span>
                    <span className="font-semibold text-slate-800">{t.qualification}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Class Incharge:</span>
                    <span className="font-bold text-blue-700">{t.assignedClass}</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-emerald-600" /> {t.phone}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setActiveTeacherModal(t)}
                    leftIcon={<Printer className="w-3.5 h-3.5 text-amber-600" />}
                  >
                    ID Badge
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Faculty ID Card Modal */}
      {activeTeacherModal && (
        <ClientPortal>
          <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 overflow-y-auto w-full h-full min-h-screen">
            <div className="bg-white rounded-2xl max-w-[300px] w-full p-2.5 shadow-2xl space-y-1.5 animate-in zoom-in-95 duration-150 border border-slate-200 my-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                <span className="text-[9px] font-black uppercase tracking-wider font-mono text-blue-700">
                  FACULTY IDENTITY CARD
                </span>
                <button
                  onClick={() => setActiveTeacherModal(null)}
                  className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-lg transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* ID Card Wrapper for HD Image Export (Ultra-Compact Fit) */}
              <div
                id="faculty-id-card-inner"
                className="printable-document bg-white border-2 border-[#002060] rounded-2xl overflow-hidden shadow-xl text-center font-sans w-full max-w-[280px] mx-auto border-t-4 border-t-[#002060]"
              >
                {/* Lanyard Punch Slot */}
                <div className="pt-1 pb-0.5 bg-slate-100 flex items-center justify-center border-b border-slate-200">
                  <div className="w-10 h-1.5 rounded-full bg-slate-300 border border-slate-400 shadow-inner"></div>
                </div>

                {/* ID Card Front Header (Centered Symmetric Layout) */}
                <div className="bg-gradient-to-r from-[#001848] via-[#002060] to-[#001848] text-white p-2 border-b-2 border-amber-400 text-center">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-sm mx-auto mb-0.5 ring-1 ring-amber-400/40">
                    <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-serif font-black text-[11px] text-amber-300 leading-tight tracking-wider uppercase">
                    सरस्वती ज्ञान मन्दिर
                  </h3>
                  <p className="text-[7px] uppercase tracking-widest text-slate-200 font-bold mt-0.5">
                    INTERMEDIATE COLLEGE &bull; SHAMSABAD
                  </p>
                  <div className="mt-0.5 bg-blue-950 text-amber-300 text-[7px] font-black uppercase tracking-widest px-2 py-0.2 rounded-full border border-blue-800 inline-block font-mono shadow-xs">
                    FACULTY IDENTITY CARD &bull; ACADEMIC STAFF
                  </div>
                </div>

                <div className="p-2 text-center space-y-1 bg-gradient-to-b from-white to-slate-50">
                  {/* Faculty Portrait Photo (Restored Compact Size) */}
                  <div className="w-13 h-13 rounded-xl overflow-hidden border-2 border-blue-700 mx-auto shadow-sm relative bg-slate-100 p-0.5 ring-1 ring-amber-400">
                    <img
                      src={
                        activeTeacherModal.photoUrl ||
                        activeTeacherModal.avatar ||
                        (activeTeacherModal.gender === 'female'
                          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
                          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80')
                      }
                      alt={activeTeacherModal.name}
                      onError={(e: any) => {
                        e.currentTarget.src =
                          activeTeacherModal.gender === 'female'
                            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
                            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
                      }}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div>
                    <h4 className="text-[11px] font-black text-slate-950 font-serif tracking-wide uppercase leading-tight">{activeTeacherModal.name}</h4>
                    <p className="text-[9.5px] font-bold text-blue-900 mt-0.2">{activeTeacherModal.designation}</p>
                    <span className="inline-block bg-blue-100 text-blue-900 font-mono font-bold text-[7.5px] px-2 py-0.2 rounded-full mt-0.5 border border-blue-200">
                      EMP ID: {activeTeacherModal.employeeId}
                    </span>
                  </div>

                  {/* Demographic Matrix */}
                  <div className="bg-white p-1.5 rounded-xl text-left text-[9px] space-y-0.5 border border-slate-200 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase text-[7.5px]">Department:</span>
                      <span className="font-bold text-slate-800">{activeTeacherModal.department}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase text-[7.5px]">Qualification:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[130px]">{activeTeacherModal.qualification}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase text-[7.5px]">Official Phone:</span>
                      <span className="font-mono font-bold text-slate-900">{activeTeacherModal.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold uppercase text-[7.5px]">Blood Group &bull; Status:</span>
                      <span className="font-mono font-bold text-rose-700">B+ &bull; Regular Faculty</span>
                    </div>
                  </div>

                  {/* Barcode & Security Strip */}
                  <div className="bg-slate-100 py-0.5 px-2 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div className="font-mono font-black text-[7.5px] text-slate-600 tracking-wider">
                      |||||| | |||| || ||| | |||
                    </div>
                    <span className="text-[7px] font-bold text-slate-500 uppercase font-mono">STAFF BADGE</span>
                  </div>

                  {/* Stamped Seals & Principal Signature */}
                  <div className="pt-0.5 pb-0.5 flex items-end justify-between text-[7px] text-slate-400 border-t border-slate-200 px-0.5">
                    <div className="text-left space-y-0.2">
                      <img
                        src="/images/stamps/principal-round-seal.png"
                        alt="Round Seal"
                        className="w-7 h-7 object-contain drop-shadow-xs transform -rotate-3 filter contrast-125"
                      />
                      <span className="font-mono text-[6.5px] block font-bold text-slate-700">Valid: 2026-2027</span>
                    </div>
                    <div className="text-center">
                      <img
                        src="/images/stamps/principal-signature.png"
                        alt="Principal Sig"
                        className="w-16 h-6 object-contain mx-auto filter contrast-150"
                      />
                      <span className="text-[6.5px] font-bold text-slate-700 block uppercase">Head of Institution</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5 pt-0.5">
                <Button
                  size="sm"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold text-xs h-8 shadow-sm"
                  onClick={handleDownloadTeacherIdImage}
                  disabled={isDownloading}
                  leftIcon={isDownloading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />}
                >
                  {isDownloading ? 'Saving...' : 'Download ID Card'}
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-700 hover:bg-blue-800 font-bold text-xs h-8 px-2.5"
                  onClick={() => {
                    printIsolatedDocument('faculty-id-card-inner');
                    toast.success('Sent Faculty ID Card to printer.', 'Print Ready');
                  }}
                  leftIcon={<Printer className="w-3 h-3" />}
                >
                  Print
                </Button>
                <Button size="sm" variant="ghost" className="h-8 px-2 text-xs" onClick={() => setActiveTeacherModal(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </ClientPortal>
      )}

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <ClientPortal>
          <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto w-full h-full min-h-screen">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 my-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-600" /> Enroll New Faculty Member
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddTeacher} className="space-y-3.5 text-xs">
                <Input
                  label="Full Name *"
                  required
                  placeholder="e.g. Acharya Rakesh Mishra"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Department *</label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white focus:bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:outline-none transition cursor-pointer shadow-sm"
                        value={newTeacher.department}
                        onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                      >
                        <option value="Physics">Physics</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="Sanskrit">Sanskrit</option>
                        <option value="English">English</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Class Incharge</label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white focus:bg-white text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:outline-none transition cursor-pointer shadow-sm"
                        value={newTeacher.assignedClass}
                        onChange={(e) => setNewTeacher({ ...newTeacher, assignedClass: e.target.value })}
                      >
                        <option value="Class 9-A">Class 9-A</option>
                        <option value="Class 10-A">Class 10-A</option>
                        <option value="Class 11-A (PCM)">Class 11-A (PCM)</option>
                        <option value="Class 12-A (PCM)">Class 12-A (PCM)</option>
                        <option value="Class 12-B (PCB)">Class 12-B (PCB)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <Input
                  label="Qualifications *"
                  required
                  placeholder="e.g. M.Sc. (Physics), B.Ed."
                  value={newTeacher.qualification}
                  onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Phone Number"
                    placeholder="+91 9876543210"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    placeholder="teacher@sarswati.edu"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 pt-3">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                    Save &amp; Generate ID Badge
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ClientPortal>
      )}

      {/* Bulk Upload Modal */}
      {isBulkModalOpen && (
        <ClientPortal>
          <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto w-full h-full min-h-screen">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 my-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" /> Bulk Import Faculty CSV
                </h3>
                <button onClick={() => setIsBulkModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-2 bg-slate-50">
                <Upload className="w-8 h-8 text-blue-600 mx-auto" />
                <p className="text-xs font-bold text-slate-800">Drag &amp; Drop Faculty CSV File</p>
                <p className="text-[10px] text-slate-500">Supports .csv, .xlsx formatted roster files</p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleBulkUpload}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700"
                  >
                    Select &amp; Upload Demo CSV
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Need the standard template?</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info('Downloading faculty_import_sample.csv', 'Template Download');
                  }}
                  className="text-blue-600 font-bold underline inline-flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Sample Template
                </a>
              </div>
            </div>
          </div>
        </ClientPortal>
      )}
    </PortalLayout>
  );
}
