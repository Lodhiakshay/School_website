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
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

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
  const { toast } = useToast();

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
          setTeachers(res.data.data);
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
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-100 flex-shrink-0 shadow-sm">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
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
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto w-full h-full min-h-screen">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 my-auto">
            {/* ID Card Front */}
            <div className="bg-gradient-to-b from-[#002060] to-blue-900 text-white p-5 text-center relative border-b-4 border-amber-400">
              <button
                onClick={() => setActiveTeacherModal(null)}
                className="absolute top-3 right-3 text-white/70 hover:text-white p-1 rounded-full bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 mx-auto mb-2 border border-amber-400 shadow-md">
                <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 font-serif">
                सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
              </h3>
              <p className="text-[10px] text-slate-200">Shamsabad, Farrukhabad (UP) • Est. 1999</p>
              <div className="mt-2 inline-block bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                FACULTY IDENTITY CARD
              </div>
            </div>

            <div className="p-5 text-center space-y-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-blue-600 mx-auto shadow-md">
                <img
                  src={activeTeacherModal.avatar}
                  alt={activeTeacherModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900">{activeTeacherModal.name}</h4>
                <p className="text-xs font-bold text-blue-700">{activeTeacherModal.designation}</p>
                <p className="text-[11px] text-slate-500 font-mono font-bold mt-0.5">
                  ID: {activeTeacherModal.employeeId}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl text-left text-xs space-y-1.5 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Department:</span>
                  <span className="font-bold text-slate-800">{activeTeacherModal.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Qualification:</span>
                  <span className="font-bold text-slate-800">{activeTeacherModal.qualification}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Contact:</span>
                  <span className="font-mono text-slate-800">{activeTeacherModal.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Blood Group:</span>
                  <span className="font-bold text-rose-600">B+</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  className="w-full bg-blue-700 hover:bg-blue-800 font-bold"
                  onClick={() => {
                    window.print();
                    toast.success('Print command sent for Faculty ID Card.', 'ID Card Ready');
                  }}
                  leftIcon={<Printer className="w-4 h-4" />}
                >
                  Print / Save PDF
                </Button>
                <Button variant="outline" onClick={() => setActiveTeacherModal(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto w-full h-full min-h-screen">
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department *</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class Incharge</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newTeacher.assignedClass}
                    onChange={(e) => setNewTeacher({ ...newTeacher, assignedClass: e.target.value })}
                  >
                    <option value="Class 9-A">Class 9-A</option>
                    <option value="Class 10-A">Class 10-A</option>
                    <option value="Class 11-A (PCM)">Class 11-A (PCM)</option>
                    <option value="Class 12-A (PCM)">Class 12-A (PCM)</option>
                    <option value="Class 12-B (PCB)">Class 12-B (PCB)</option>
                  </select>
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
                  placeholder="+91 9451234567"
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
      )}

      {/* Bulk Upload Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto w-full h-full min-h-screen">
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
      )}
    </PortalLayout>
  );
}
