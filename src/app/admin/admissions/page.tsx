'use client';

import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Search,
  Printer,
  Sparkles,
  Phone,
  CheckCircle2,
  Clock,
  UserCheck,
  X,
  Eye,
  Filter,
  Download,
  Calendar,
  MapPin,
  FileText,
  Trash2,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  AlertCircle,
  GraduationCap,
  RefreshCw,
  Edit,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';
import { ConfirmDialog } from '../../../components/ui/confirm-dialog';

export default function AdmissionsAdminPage() {
  const { toast } = useToast();
  const [apps, setApps] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    submitted: 0,
    underReview: 0,
    interviewScheduled: 0,
    approved: 0,
    admitted: 0,
    rejected: 0,
    pendingAction: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mediumFilter, setMediumFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Detail / Review Modal State
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    status: 'submitted',
    interviewDate: '',
    interviewVenue: 'School Administrative Office, Ground Floor',
    reviewerRemarks: '',
  });

  // Enroll Student Modal State
  const [enrollApp, setEnrollApp] = useState<any | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollForm, setEnrollForm] = useState({
    admissionNumber: '',
    rollNumber: 1,
    sectionName: 'Section A',
  });

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/admissions', {
        params: {
          search: searchQuery || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          medium: mediumFilter !== 'all' ? mediumFilter : undefined,
        },
      });
      if (res.data?.data) {
        setApps(res.data.data);
      }
      if (res.data?.meta?.stats) {
        setStats(res.data.meta.stats);
      }
    } catch {
      toast.error('Failed to load admission applications from server.', 'Load Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, mediumFilter]);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open Review Drawer / Modal
  const openReviewModal = (app: any) => {
    setSelectedApp(app);
    setReviewForm({
      status: app.status || 'submitted',
      interviewDate: app.interviewDate ? new Date(app.interviewDate).toISOString().slice(0, 16) : '',
      interviewVenue: app.interviewVenue || 'School Administrative Office, Ground Floor',
      reviewerRemarks: app.reviewerRemarks || '',
    });
    setIsReviewModalOpen(true);
  };

  // Save Status Update
  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setIsUpdatingStatus(true);
    try {
      const payload: any = {
        status: reviewForm.status,
        interviewVenue: reviewForm.interviewVenue,
        reviewerRemarks: reviewForm.reviewerRemarks,
      };
      if (reviewForm.interviewDate) {
        payload.interviewDate = new Date(reviewForm.interviewDate);
      }

      await apiClient.put(`/admissions/${selectedApp._id}/status`, payload);
      toast.success(
        `Application ${selectedApp.applicationNumber} updated to ${reviewForm.status.replace('_', ' ').toUpperCase()}`,
        'Status Updated'
      );

      // Update state locally
      setApps((prev) =>
        prev.map((a) => (a._id === selectedApp._id ? { ...a, ...payload } : a))
      );
      setIsReviewModalOpen(false);
    } catch {
      toast.error('Failed to update application status.', 'Update Error');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Open 1-Click Enroll Modal
  const openEnrollModal = (app: any) => {
    setEnrollApp(app);
    const yr = new Date().getFullYear();
    setEnrollForm({
      admissionNumber: `SGM-${yr}-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNumber: 1,
      sectionName: 'Section A',
    });
    setIsEnrollModalOpen(true);
  };

  // Confirm Enrollment into ERP
  const handleConfirmEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollApp) return;

    setIsEnrolling(true);
    try {
      await apiClient.post(`/admissions/${enrollApp._id}/admit`, enrollForm);
      toast.success(
        `Applicant ${enrollApp.applicantName} officially enrolled as Student ID: ${enrollForm.admissionNumber}`,
        'Student Enrolled!'
      );

      // Update local state
      setApps((prev) =>
        prev.map((a) =>
          a._id === enrollApp._id
            ? { ...a, status: 'admitted', convertedStudentId: { admissionNumber: enrollForm.admissionNumber } }
            : a
        )
      );
      setIsEnrollModalOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || 'Failed to enroll student. Please check Section assignment.',
        'Enrollment Failed'
      );
    } finally {
      setIsEnrolling(false);
    }
  };

  const [deletingApp, setDeletingApp] = useState<{ id: string; appNo: string } | null>(null);
  const [isDeletingApp, setIsDeletingApp] = useState(false);

  // Delete Application
  const handleDeleteApp = (id: string, appNo: string) => {
    setDeletingApp({ id, appNo });
  };

  const handleConfirmDeleteApp = async () => {
    if (!deletingApp) return;
    setIsDeletingApp(true);
    try {
      await apiClient.delete(`/admissions/${deletingApp.id}`);
      setApps((prev) => prev.filter((a) => a._id !== deletingApp.id));
      toast.success(`Application ${deletingApp.appNo} removed.`, 'Deleted');
    } catch {
      toast.error('Failed to delete application.', 'Delete Error');
    } finally {
      setIsDeletingApp(false);
      setDeletingApp(null);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (apps.length === 0) {
      toast.error('No applications to export.', 'Export Empty');
      return;
    }
    const headers = ['Application Number,Applicant Name,Gender,DOB,Class,Medium,Stream,Father Name,Father Phone,Status,Date'];
    const rows = apps.map((a) =>
      [
        `"${a.applicationNumber}"`,
        `"${a.applicantName}"`,
        `"${a.gender}"`,
        `"${a.dob ? new Date(a.dob).toLocaleDateString('en-IN') : ''}"`,
        `"${a.targetClass}"`,
        `"${a.medium === 'english_sssd' ? 'SSSD English' : 'SGM Hindi'}"`,
        `"${a.stream || ''}"`,
        `"${a.fatherName}"`,
        `"${a.fatherPhone}"`,
        `"${a.status}"`,
        `"${a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-IN') : ''}"`,
      ].join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SGM_Admissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded admissions CSV spreadsheet.', 'Export Completed');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'admitted':
        return <Badge variant="success">🎓 Admitted (Enrolled)</Badge>;
      case 'approved':
        return <Badge variant="success">✅ Approved</Badge>;
      case 'interview_scheduled':
        return <Badge variant="warning">📅 Counseling Scheduled</Badge>;
      case 'document_verified':
        return <Badge variant="info">📄 Verified</Badge>;
      case 'under_review':
        return <Badge variant="purple">🔍 Under Review</Badge>;
      case 'rejected':
        return <Badge variant="danger">❌ Rejected</Badge>;
      default:
        return <Badge variant="outline">📩 New Submission</Badge>;
    }
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'AdmissionStaff', 'Principal', 'Accountant']}>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" /> Admissions Desk &bull; Session 2026-27
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 font-serif">
              Online Admissions &amp; Enrollment Pipeline
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage public website inquiries, verify candidate documents, schedule counseling interviews, and enroll students into active ERP rosters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print Roster
            </Button>
            <Button
              size="sm"
              onClick={fetchApplications}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Analytics Telemetry KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Inquiries</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{stats.total || apps.length}</span>
            <span className="text-[10px] text-slate-400 block">All Registered Candidates</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 block">Pending Review</span>
            <span className="text-xl sm:text-2xl font-black text-amber-950 font-mono">
              {(stats.submitted || 0) + (stats.underReview || 0)}
            </span>
            <span className="text-[10px] text-amber-700 block">Awaiting Verification</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-800 block">Counseling Scheduled</span>
            <span className="text-xl sm:text-2xl font-black text-purple-950 font-mono">{stats.interviewScheduled || 0}</span>
            <span className="text-[10px] text-purple-700 block">Campus Visit Set</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-800 block">Approved</span>
            <span className="text-xl sm:text-2xl font-black text-blue-950 font-mono">{stats.approved || 0}</span>
            <span className="text-[10px] text-blue-700 block">Ready for Enrollment</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-sm space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Officially Enrolled</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-950 font-mono">{stats.admitted || 0}</span>
            <span className="text-[10px] text-emerald-700 block">In ERP Student Roster</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by student name, application number, father name, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchApplications()}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                className="p-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="submitted">New Submissions</option>
                <option value="under_review">Under Review</option>
                <option value="document_verified">Document Verified</option>
                <option value="interview_scheduled">Counseling Scheduled</option>
                <option value="approved">Approved</option>
                <option value="admitted">Officially Admitted</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                className="p-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                value={mediumFilter}
                onChange={(e) => setMediumFilter(e.target.value)}
              >
                <option value="all">All Wings &amp; Mediums</option>
                <option value="hindi">SGM (UP Board - Hindi)</option>
                <option value="english_sssd">SSSD (100% English)</option>
              </select>

              <Button size="sm" onClick={fetchApplications}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Applications List Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Showing {apps.length} Candidate Applications
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold">Loading admissions pipeline...</p>
            </div>
          ) : apps.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <UserPlus className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">No admission applications found.</p>
              <p className="text-[11px] text-slate-400">Applications submitted from the public website will appear here in real time.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Candidate</th>
                    <th className="py-3.5 px-4">Application ID</th>
                    <th className="py-3.5 px-4">Class &amp; Wing</th>
                    <th className="py-3.5 px-4">Parent Details</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Apply Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {apps.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/80 transition">
                      {/* Candidate Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center flex-shrink-0 overflow-hidden border border-blue-200">
                            {app.photoUrl ? (
                              <img src={app.photoUrl} alt={app.applicantName} className="w-full h-full object-cover" />
                            ) : (
                              <span>{(app.applicantName || 'S')[0]}</span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">{app.applicantName}</span>
                            <span className="text-[10px] text-slate-500">
                              {app.gender} &bull; {app.dob ? new Date(app.dob).toLocaleDateString('en-IN') : 'DOB N/A'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Application Number Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-blue-900 bg-blue-50/80 px-2 py-1 rounded-lg border border-blue-200 w-fit">
                          <span>{app.applicationNumber}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(app.applicationNumber)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Copy Application Number"
                          >
                            {copiedId === app.applicationNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>

                      {/* Class & Medium Column */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{app.targetClass}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                              app.medium === 'english_sssd'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {app.medium === 'english_sssd' ? 'SSSD English' : 'UP Hindi'}
                          </span>
                          {app.stream && <span className="text-[10px] text-slate-500">({app.stream})</span>}
                        </div>
                      </td>

                      {/* Parent Details Column */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-900 font-bold block">{app.fatherName}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={`tel:${app.fatherPhone}`}
                            className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-mono"
                          >
                            <Phone className="w-3 h-3" /> {app.fatherPhone}
                          </a>
                          {app.whatsappNumber && (
                            <a
                              href={`https://wa.me/${app.whatsappNumber.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-600 hover:text-emerald-700"
                              title="Message on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-3.5 px-4">{getStatusBadge(app.status)}</td>

                      {/* Date Column */}
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                      </td>

                      {/* Action Menu */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openReviewModal(app)}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1 transition"
                            title="Review Application & Set Interview"
                          >
                            <Eye className="w-3.5 h-3.5" /> Review
                          </button>

                          {app.status !== 'admitted' && (
                            <button
                              type="button"
                              onClick={() => openEnrollModal(app)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1 transition"
                              title="1-Click Enroll Student"
                            >
                              <GraduationCap className="w-3.5 h-3.5" /> Enroll
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeleteApp(app._id, app.applicationNumber)}
                            className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. REVIEW & STATUS UPDATE MODAL                                           */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={selectedApp ? `Review Application: ${selectedApp.applicationNumber}` : 'Application Review'}
        description="Verify candidate demographics, inspect uploaded certificates, and assign counseling / interview schedules."
        maxWidth="2xl"
      >
        {selectedApp && (
          <form onSubmit={handleStatusUpdate} className="space-y-5 text-xs">
            {/* Applicant Summary Header */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 font-black flex items-center justify-center overflow-hidden border border-blue-300 flex-shrink-0">
                  {selectedApp.photoUrl ? (
                    <img src={selectedApp.photoUrl} alt={selectedApp.applicantName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl">{(selectedApp.applicantName || 'S')[0]}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">{selectedApp.applicantName}</h3>
                  <p className="text-slate-500 text-[11px]">
                    {selectedApp.gender} &bull; DOB: {selectedApp.dob ? new Date(selectedApp.dob).toLocaleDateString('en-IN') : 'N/A'} &bull; Category: {selectedApp.category || 'GEN'}
                  </p>
                  <p className="text-blue-700 font-bold text-[11px] mt-0.5">
                    {selectedApp.targetClass} {selectedApp.stream ? `(${selectedApp.stream})` : ''} &bull; {selectedApp.medium === 'english_sssd' ? 'SSSD English Wing' : 'SGM Hindi Wing'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Current Status</span>
                {getStatusBadge(selectedApp.status)}
              </div>
            </div>

            {/* Parent & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Father&apos;s Info</span>
                <p className="font-bold text-slate-900">{selectedApp.fatherName} ({selectedApp.fatherOccupation || 'N/A'})</p>
                <p className="text-blue-700 font-mono text-xs">{selectedApp.fatherPhone}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Mother&apos;s Info</span>
                <p className="font-bold text-slate-900">{selectedApp.motherName} ({selectedApp.motherOccupation || 'N/A'})</p>
                <p className="text-slate-600 text-xs">{selectedApp.motherPhone || 'No Phone'}</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Residential Address
              </span>
              <p className="text-slate-800 font-medium">{selectedApp.address}</p>
            </div>

            {/* Previous School Record */}
            {selectedApp.previousSchool && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Previous School Standing</span>
                <p className="text-slate-800 font-bold">
                  {selectedApp.previousSchool} &bull; Marks: {selectedApp.previousMarksPercent ? `${selectedApp.previousMarksPercent}%` : 'N/A'}
                </p>
              </div>
            )}

            {/* Uploaded Documents Thumbnails */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 text-xs block">Uploaded Verification Documents:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-slate-800">Birth Certificate / TC</span>
                  </div>
                  {selectedApp.birthCertificateUrl ? (
                    <a
                      href={selectedApp.birthCertificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      View Scan <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Not Uploaded</span>
                  )}
                </div>

                <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">Previous Marksheet</span>
                  </div>
                  {selectedApp.marksheetUrl ? (
                    <a
                      href={selectedApp.marksheetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      View Marksheet <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Not Uploaded</span>
                  )}
                </div>
              </div>
            </div>

            {/* Status Update Form Controls */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-4 pt-4">
              <h4 className="font-black text-blue-950 text-xs uppercase tracking-wider">
                Update Admission Workflow Stage
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Application Status *</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                    value={reviewForm.status}
                    onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value })}
                  >
                    <option value="submitted">1. Submitted (New Registration)</option>
                    <option value="under_review">2. Under Verification</option>
                    <option value="document_verified">3. Documents Verified</option>
                    <option value="interview_scheduled">4. Counseling / Interview Scheduled</option>
                    <option value="approved">5. Approved for Admission</option>
                    <option value="rejected">6. Rejected / Ineligible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interview / Counseling Date &amp; Time</label>
                  <input
                    type="datetime-local"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500"
                    value={reviewForm.interviewDate}
                    onChange={(e) => setReviewForm({ ...reviewForm, interviewDate: e.target.value })}
                  />
                </div>
              </div>

              <Input
                label="Counseling Venue Location"
                value={reviewForm.interviewVenue}
                onChange={(e) => setReviewForm({ ...reviewForm, interviewVenue: e.target.value })}
                placeholder="e.g. Principal Office / Room 102, Ground Floor"
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Remarks (Displayed to Parent on Tracking Portal)
                </label>
                <textarea
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Bring original transfer certificate and 2 photos on 15 March 10:00 AM..."
                  value={reviewForm.reviewerRemarks}
                  onChange={(e) => setReviewForm({ ...reviewForm, reviewerRemarks: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsReviewModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 font-bold"
                isLoading={isUpdatingStatus}
                leftIcon={<Check className="w-4 h-4" />}
              >
                Save Status Changes
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* ========================================================================= */}
      {/* 2. 1-CLICK ENROLL STUDENT MODAL                                           */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        title={enrollApp ? `Enroll: ${enrollApp.applicantName}` : 'Enroll Student'}
        description="Convert this approved application directly into an active student record in the ERP class roster."
      >
        {enrollApp && (
          <form onSubmit={handleConfirmEnroll} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800">Target Class Assignment</span>
              <p className="font-bold text-emerald-950 text-sm">{enrollApp.targetClass} {enrollApp.stream ? `(${enrollApp.stream})` : ''}</p>
              <p className="text-emerald-700 text-xs">Medium: {enrollApp.medium === 'english_sssd' ? 'SSSD (100% English)' : 'SGM (UP Board - Hindi)'}</p>
            </div>

            <Input
              label="Permanent ERP Admission Number *"
              value={enrollForm.admissionNumber}
              onChange={(e) => setEnrollForm({ ...enrollForm, admissionNumber: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Class Section *</label>
                <select
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-emerald-500"
                  value={enrollForm.sectionName}
                  onChange={(e) => setEnrollForm({ ...enrollForm, sectionName: e.target.value })}
                >
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                  <option value="Section C">Section C</option>
                </select>
              </div>

              <Input
                label="Class Roll Number *"
                type="number"
                min={1}
                value={enrollForm.rollNumber}
                onChange={(e) => setEnrollForm({ ...enrollForm, rollNumber: parseInt(e.target.value, 10) || 1 })}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEnrollModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 font-bold"
                isLoading={isEnrolling}
                leftIcon={<GraduationCap className="w-4 h-4" />}
              >
                Confirm Official Enrollment
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Production Grade Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingApp)}
        onClose={() => !isDeletingApp && setDeletingApp(null)}
        onConfirm={handleConfirmDeleteApp}
        title="Delete Admission Application"
        description="Are you sure you want to delete this admission enquiry / application? This action cannot be reversed."
        itemName={deletingApp?.appNo}
        confirmText="Yes, Delete Application"
        cancelText="Keep Application"
        isLoading={isDeletingApp}
        variant="danger"
      />
    </PortalLayout>
  );
}
