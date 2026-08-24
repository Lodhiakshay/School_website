'use client';

import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  CheckCircle2,
  Phone,
  Search,
  Filter,
  Eye,
  Printer,
  Sparkles,
  Award,
  Calendar,
  X,
  FileCheck,
} from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Modal } from '../../components/ui/modal';
import { useToast } from '../../components/ui/toast';
import { apiClient } from '../../lib/api-client';

const fallbackApplications = [
  {
    _id: 'app_01',
    applicationNumber: 'APP-2026-0812',
    applicantName: 'Aryan Mishra',
    gender: 'Male',
    dob: '2010-04-15',
    targetClass: 'Class 11 (Science - PCM)',
    fatherName: 'Shri Rakesh Mishra',
    fatherOccupation: 'Government Officer',
    fatherPhone: '+91 9451234901',
    motherName: 'Smt. Kavita Mishra',
    address: 'Mohalla Katra, Shamsabad, Farrukhabad',
    previousSchool: 'Adarsh Vidya Mandir, Farrukhabad (88.4% in Class 10)',
    appliedDate: '24 Aug 2026',
    status: 'in_review',
  },
  {
    _id: 'app_02',
    applicationNumber: 'APP-2026-0813',
    applicantName: 'Shreya Tripathi',
    gender: 'Female',
    dob: '2012-08-22',
    targetClass: 'Class 9 (High School)',
    fatherName: 'Dr. Alok Tripathi',
    fatherOccupation: 'Medical Practitioner',
    fatherPhone: '+91 9451234902',
    motherName: 'Dr. Vandana Tripathi',
    address: 'Near Bus Stand, Shamsabad',
    previousSchool: 'St. Paul Convent (92.0% in Class 8)',
    appliedDate: '23 Aug 2026',
    status: 'approved',
  },
  {
    _id: 'app_03',
    applicationNumber: 'APP-2026-0814',
    applicantName: 'Utkarsh Singh',
    gender: 'Male',
    dob: '2014-11-10',
    targetClass: 'Class 6 (Middle Wing)',
    fatherName: 'Shri Devendra Singh',
    fatherOccupation: 'Business Entrepreneur',
    fatherPhone: '+91 9451234903',
    motherName: 'Smt. Sunita Singh',
    address: 'Civil Lines, Farrukhabad',
    previousSchool: 'Saraswati Shishu Mandir (85.6%)',
    appliedDate: '22 Aug 2026',
    status: 'admitted',
  },
  {
    _id: 'app_04',
    applicationNumber: 'APP-2026-0815',
    applicantName: 'Ananya Saxena',
    gender: 'Female',
    dob: '2021-02-18',
    targetClass: 'Nursery Wing',
    fatherName: 'Shri Mohit Saxena',
    fatherOccupation: 'Software Engineer',
    fatherPhone: '+91 9451234904',
    motherName: 'Smt. Priyanka Saxena',
    address: 'Thandi Sadak, Farrukhabad',
    previousSchool: 'First Time Admission',
    appliedDate: '21 Aug 2026',
    status: 'in_review',
  },
];

export default function AdmissionStaffDashboardPage() {
  const [applications, setApplications] = useState<any[]>(fallbackApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeApp, setActiveApp] = useState<any>(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [convertForm, setConvertForm] = useState({
    sectionName: 'A (Science)',
    rollNumber: 15,
  });
  const { toast } = useToast();

  useEffect(() => {
    apiClient
      .get('/admissions')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setApplications(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
    );
    toast.success(`Application marked as ${newStatus.toUpperCase()}`, 'Status Updated');
  };

  const handleConvertToStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApp) return;
    const admissionNo = `SGM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplications((prev) =>
      prev.map((app) =>
        app._id === activeApp._id ? { ...app, status: 'admitted', admissionNumber: admissionNo } : app
      )
    );
    setShowConvertModal(false);
    toast.success(
      `🎉 ${activeApp.applicantName} enrolled into ${activeApp.targetClass}! Permanent Admission No: ${admissionNo}`,
      'Enrollment Complete'
    );
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.targetClass && app.targetClass.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PortalLayout allowedRoles={['AdmissionStaff', 'SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <UserPlus className="w-5 h-5 text-blue-600" /> Admission Counselor &amp; Enrollment Hub
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review candidate applications, verify certificates, and generate permanent admission numbers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Admissions Report.', 'Report Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Pipeline
            </Button>
          </div>
        </div>

        {/* Pipeline Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Inquiries</span>
            <div className="text-xl font-black text-slate-900 mt-1">{applications.length} Applicants</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm">
            <span className="text-[10px] font-bold text-amber-700 uppercase">In Review</span>
            <div className="text-xl font-black text-amber-700 mt-1">
              {applications.filter((a) => a.status === 'in_review').length} Applications
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 shadow-sm">
            <span className="text-[10px] font-bold text-blue-700 uppercase">Approved</span>
            <div className="text-xl font-black text-blue-700 mt-1">
              {applications.filter((a) => a.status === 'approved').length} Ready to Enroll
            </div>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Admitted</span>
            <div className="text-xl font-black text-emerald-700 mt-1">
              {applications.filter((a) => a.status === 'admitted').length} Enrolled
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search applicant name, app #, or class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'in_review', 'approved', 'admitted'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {st === 'all'
                  ? 'All Inquiries'
                  : st === 'in_review'
                  ? 'In Review'
                  : st === 'approved'
                  ? 'Approved'
                  : 'Admitted'}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3.5">App Number</th>
                    <th className="px-4 py-3.5">Applicant Name</th>
                    <th className="px-4 py-3.5">Target Wing / Class</th>
                    <th className="px-4 py-3.5">Parent &amp; Phone</th>
                    <th className="px-4 py-3.5">Applied Date</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredApps.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-600">
                        {app.applicationNumber}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900">{app.applicantName}</div>
                        <div className="text-[10px] text-slate-400">{app.gender}</div>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-800">
                        {app.targetClass}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-800">{app.fatherName}</div>
                        <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-600" /> {app.fatherPhone}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">{app.appliedDate}</td>
                      <td className="px-4 py-3.5">
                        <Badge
                          size="sm"
                          variant={
                            app.status === 'admitted'
                              ? 'success'
                              : app.status === 'approved'
                              ? 'purple'
                              : 'warning'
                          }
                        >
                          {app.status === 'admitted'
                            ? 'Admitted'
                            : app.status === 'approved'
                            ? 'Approved'
                            : 'In Review'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setActiveApp(app);
                            setShowDetailsModal(true);
                          }}
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                        >
                          View
                        </Button>

                        {app.status === 'in_review' && (
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
                            onClick={() => handleUpdateStatus(app._id, 'approved')}
                          >
                            Approve
                          </Button>
                        )}

                        {app.status === 'approved' && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            onClick={() => {
                              setActiveApp(app);
                              setShowConvertModal(true);
                            }}
                            leftIcon={<FileCheck className="w-3.5 h-3.5" />}
                          >
                            Enroll
                          </Button>
                        )}

                        {app.status === 'admitted' && (
                          <span className="text-xs text-emerald-600 font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Application Details Modal */}
      {showDetailsModal && activeApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 font-serif">
                  Admission Inquiry Details
                </h3>
                <span className="text-[10px] font-mono text-blue-600 font-bold">
                  {activeApp.applicationNumber}
                </span>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl space-y-2.5 text-xs border border-slate-100">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400">Candidate:</span>
                  <p className="font-bold text-slate-900">{activeApp.applicantName}</p>
                </div>
                <div>
                  <span className="text-slate-400">Target Wing:</span>
                  <p className="font-bold text-blue-700">{activeApp.targetClass}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400">Father Name &amp; Work:</span>
                  <p className="font-semibold text-slate-800">
                    {activeApp.fatherName} ({activeApp.fatherOccupation})
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Helpline Contact:</span>
                  <p className="font-mono font-bold text-emerald-600">{activeApp.fatherPhone}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-400">Residential Address:</span>
                <p className="font-medium text-slate-800">{activeApp.address}</p>
              </div>

              <div>
                <span className="text-slate-400">Previous Academic Background:</span>
                <p className="font-medium text-slate-800">{activeApp.previousSchool}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
              {activeApp.status !== 'admitted' && (
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 font-bold"
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowConvertModal(true);
                  }}
                >
                  Proceed to Official Enrollment
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Convert to Student Modal */}
      {showConvertModal && activeApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" /> Execute Student Enrollment
              </h3>
              <button
                onClick={() => setShowConvertModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Enrolling <strong className="text-slate-900">{activeApp.applicantName}</strong> into{' '}
              <strong className="text-blue-700">{activeApp.targetClass}</strong>.
            </p>

            <form onSubmit={handleConvertToStudent} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign Classroom Section *</label>
                <select
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={convertForm.sectionName}
                  onChange={(e) => setConvertForm({ ...convertForm, sectionName: e.target.value })}
                >
                  <option value="A (Science)">Section A (Science Stream)</option>
                  <option value="B (General)">Section B (General Stream)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Class Roll Number *</label>
                <input
                  type="number"
                  required
                  value={convertForm.rollNumber}
                  onChange={(e) =>
                    setConvertForm({ ...convertForm, rollNumber: Number(e.target.value) })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold">
                  Generate Admission ID &amp; Enroll
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowConvertModal(false)}
                >
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
