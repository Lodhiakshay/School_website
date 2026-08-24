'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Search, Eye, ArrowUpRight, Printer, Sparkles, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
            <GraduationCap className="w-6 h-6 text-blue-700" /> Student Information System (SIS)
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage student registrations, multi-year enrollments, class promotions, and printable ID Cards.
          </p>
        </div>

        <Button size="sm" variant="primary" className="font-bold bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/30" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
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
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
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
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-extrabold tracking-wider">
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
                      <td className="px-4 py-3 font-mono font-bold text-blue-700">{stu.admissionNumber}</td>
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
                          className="font-bold border-blue-600 text-blue-700 hover:bg-blue-50"
                          leftIcon={<Printer className="w-3.5 h-3.5" />}
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
          )}
        </CardContent>
      </Card>

      {/* Printable Authentic Royal Blue & Gold ID Card */}
      {activeStudent && (
        <Modal isOpen={showIdCardModal} onClose={() => setShowIdCardModal(false)} title="Official Student Identity Card" maxWidth="md">
          <div
            id="printable-student-id"
            className="w-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-900 text-slate-900 font-sans"
            style={{ borderColor: '#002060' }}
          >
            {/* Navy Blue & Gold Header Ribbon */}
            <div
              className="px-4 py-3 flex items-center gap-3 text-white border-b-2 border-amber-400"
              style={{ backgroundColor: '#002060' }}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 bg-white shadow-md flex-shrink-0">
                <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black tracking-wide uppercase font-serif text-amber-300 leading-tight">
                  सरस्वती ज्ञान मन्दिर
                </h3>
                <p className="text-[10px] text-white font-extrabold tracking-wider uppercase leading-tight">
                  SARSWATI GYAN MANDIR
                </p>
                <p className="text-[9px] text-blue-200 font-semibold leading-tight">
                  शमसाबाद, फर्रुखाबाद (उ०प्र०) • UP Board
                </p>
              </div>
            </div>

            {/* Student ID Card Body */}
            <div className="p-5 bg-gradient-to-b from-blue-50/40 via-white to-amber-50/30 space-y-4">
              <div className="flex items-center gap-4">
                {/* Photo Placeholder */}
                <div
                  className="w-20 h-24 rounded-2xl border-2 border-blue-900 bg-blue-100/60 flex flex-col items-center justify-center shadow-inner text-blue-950 font-black text-2xl flex-shrink-0"
                  style={{ borderColor: '#002060' }}
                >
                  <span>{activeStudent.firstName?.charAt(0)}</span>
                  <span className="text-[9px] font-bold text-blue-700 uppercase tracking-tighter mt-1">Photo</span>
                </div>

                {/* Details */}
                <div className="space-y-1 text-xs">
                  <h4 className="text-base font-black text-blue-950 uppercase tracking-tight" style={{ color: '#002060' }}>
                    {activeStudent.firstName} {activeStudent.lastName}
                  </h4>
                  
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-400/80 font-mono">
                    Adm No: {activeStudent.admissionNumber || 'SGM-2026-0001'}
                  </div>

                  <p className="text-slate-800 font-bold pt-1">
                    Class: <span className="text-blue-900">{activeStudent.currentClassId?.name || 'Class 10'} ({activeStudent.currentSectionId?.name || 'A'})</span>
                  </p>
                  
                  <p className="text-slate-800 font-bold">
                    Roll No: <span className="text-blue-900 font-mono">{activeStudent.currentRollNumber || 1}</span>
                  </p>

                  <p className="text-slate-700 text-[11px]">
                    Father: <span className="font-semibold">{activeStudent.parentId?.fatherName || 'Shri Rajesh Sharma'}</span>
                  </p>
                </div>
              </div>

              {/* Extra Info Strip */}
              <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-[10px] space-y-0.5 text-slate-700">
                <p><strong>Emergency Contact:</strong> {activeStudent.parentId?.fatherPhone || '+91 9839000000'}</p>
                <p><strong>Address:</strong> Shamsabad, Farrukhabad, UP (209503)</p>
              </div>

              {/* Footer with Principal Stamp */}
              <div className="pt-2 border-t-2 border-dashed border-slate-300 flex items-center justify-between text-[10px]">
                <div className="text-blue-950 font-bold">
                  <span>Session: </span>
                  <span className="text-blue-800 font-black">2026-2027</span>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded bg-blue-900 text-white font-extrabold text-[9px] uppercase tracking-wider">
                    Authorized Signatory
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowIdCardModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition shadow-sm"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2 rounded-xl text-xs font-black text-white bg-blue-700 hover:bg-blue-800 transition shadow-md shadow-blue-700/30 flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Print Student ID Card
            </button>
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
