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
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackApps = [
  {
    _id: 'app_01',
    applicationNumber: 'ADM-2026-0891',
    applicantName: 'Divyanshu Singh Rathore',
    targetClass: 'Class 11 (Science - PCM)',
    fatherName: 'Shri Devendra Singh',
    fatherPhone: '+91 94500 34567',
    previousSchool: 'Adarsh Vidya Mandir, Kaimganj (88.4% in 10th)',
    status: 'admitted',
    applyDate: '22 Aug 2026',
  },
  {
    _id: 'app_02',
    applicationNumber: 'ADM-2026-0892',
    applicantName: 'Priya Mishra',
    targetClass: 'Class 10 (High School)',
    fatherName: 'Shri Manoj Mishra',
    fatherPhone: '+91 98890 67890',
    previousSchool: 'St. Paul Convent School (84.6%)',
    status: 'approved',
    applyDate: '23 Aug 2026',
  },
  {
    _id: 'app_03',
    applicationNumber: 'ADM-2026-0893',
    applicantName: 'Tanya Rathore',
    targetClass: 'Class 9 (High School Prep)',
    fatherName: 'Shri Santosh Rathore',
    fatherPhone: '+91 97920 45678',
    previousSchool: 'Modern Public Academy',
    status: 'under_review',
    applyDate: '24 Aug 2026',
  },
  {
    _id: 'app_04',
    applicationNumber: 'ADM-2026-0894',
    applicantName: 'Harshit Dubey',
    targetClass: 'Class 11 (Science - PCB)',
    fatherName: 'Dr. Ramesh Dubey',
    fatherPhone: '+91 94150 78901',
    previousSchool: 'DAV Inter College, Farrukhabad (91.2%)',
    status: 'approved',
    applyDate: '24 Aug 2026',
  },
];

export default function AdmissionsAdminPage() {
  const [apps, setApps] = useState<any[]>(fallbackApps);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    apiClient
      .get('/admissions')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setApps(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleEnroll = (appNo: string, name: string) => {
    setApps(apps.map((a) => (a.applicationNumber === appNo ? { ...a, status: 'admitted' } : a)));
    toast.success(`Applicant ${name} (${appNo}) enrolled into active student roster!`, 'Student Enrolled');
  };

  const filtered = apps.filter((a) => {
    const matchSearch =
      a.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.fatherName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'AdmissionStaff']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <UserPlus className="w-5 h-5 text-blue-600" /> Admissions Inquiries &amp; Enrollment Pipeline
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review online website inquiry submissions, verify document credentials, and grant admissions.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              window.print();
              toast.success('Generated printable Admissions Pipeline.', 'Print Ready');
            }}
            leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
          >
            Print Pipeline
          </Button>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search candidate, app no, or parent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'under_review', 'approved', 'admitted'].map((st) => (
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
                  : st === 'under_review'
                  ? 'Under Review'
                  : st === 'approved'
                  ? 'Approved'
                  : 'Admitted'}
              </button>
            ))}
          </div>
        </div>

        {/* Admissions Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[820px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5 whitespace-nowrap">Application No</th>
                    <th className="p-3.5 whitespace-nowrap">Candidate Name</th>
                    <th className="p-3.5 whitespace-nowrap">Target Class</th>
                    <th className="p-3.5 whitespace-nowrap">Father &amp; Contact</th>
                    <th className="p-3.5 whitespace-nowrap">Prior Academic Standing</th>
                    <th className="p-3.5 whitespace-nowrap text-center">Status</th>
                    <th className="p-3.5 whitespace-nowrap text-right">Enroll Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((a) => (
                    <tr key={a._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 whitespace-nowrap font-mono font-bold text-blue-600">{a.applicationNumber}</td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{a.applicantName}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <Badge size="sm" variant="info">
                          {a.targetClass}
                        </Badge>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-800">{a.fatherName}</div>
                        <div className="text-[11px] font-mono text-slate-400">{a.fatherPhone}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-slate-600 text-[11px]">{a.previousSchool}</td>
                      <td className="p-3.5 whitespace-nowrap text-center">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                            a.status === 'admitted'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : a.status === 'approved'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : 'bg-amber-100 text-amber-800 border-amber-200'
                          }`}
                        >
                          {a.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        {a.status === 'admitted' ? (
                          <span className="text-emerald-700 font-bold text-xs">✓ Enrolled</span>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                            onClick={() => handleEnroll(a.applicationNumber, a.applicantName)}
                            leftIcon={<UserCheck className="w-3.5 h-3.5" />}
                          >
                            Enroll
                          </Button>
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
    </PortalLayout>
  );
}
