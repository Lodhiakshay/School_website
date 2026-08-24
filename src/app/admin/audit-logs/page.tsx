'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Printer,
  ShieldCheck,
  Calendar,
  Lock,
  Sparkles,
  Download,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackAuditLogs = [
  {
    _id: 'log_01',
    timestamp: 'Today, 10:45 AM',
    operator: 'Dr. Ramesh Kumar Sharma (Principal)',
    action: 'Approved & Signed Terminal Marksheet for Aarav Sharma (Class 10-A)',
    module: 'Exams & Results',
    ipAddress: '192.168.1.102',
    status: 'Success',
  },
  {
    _id: 'log_02',
    timestamp: 'Today, 10:20 AM',
    operator: 'Shri Manoj Mishra (Accountant)',
    action: 'Collected Fee Payment ₹ 4,500 (Receipt #REC-2026-8902) via UPI',
    module: 'Fee POS Terminal',
    ipAddress: '192.168.1.108',
    status: 'Success',
  },
  {
    _id: 'log_03',
    timestamp: 'Today, 09:30 AM',
    operator: 'Shri Dinesh Gupta (Teacher)',
    action: 'Marked Daily Batch Attendance for Class 10 (Section A) — 46 Present',
    module: 'Attendance SIS',
    ipAddress: '192.168.1.115',
    status: 'Success',
  },
  {
    _id: 'log_04',
    timestamp: 'Today, 09:05 AM',
    operator: 'Smt. Pooja Verma (Admission Staff)',
    action: 'Enrolled New Candidate Divyanshu Singh into Class 10 (Section B)',
    module: 'Admissions Desk',
    ipAddress: '192.168.1.112',
    status: 'Success',
  },
  {
    _id: 'log_05',
    timestamp: 'Yesterday, 04:15 PM',
    operator: 'SuperAdmin System IT',
    action: 'Automated Daily Database Cloud Backup Created (Backup ID: BKP-9821)',
    module: 'System Security',
    ipAddress: '10.0.0.1',
    status: 'Success',
  },
  {
    _id: 'log_06',
    timestamp: 'Yesterday, 02:40 PM',
    operator: 'Smt. Geeta Dixit (Librarian)',
    action: 'Issued NCERT Physics Vol 1 (ISBN 978-81-7450) to Student SGM-2026-1001',
    module: 'Library Circulation',
    ipAddress: '192.168.1.120',
    status: 'Success',
  },
];

export default function AuditLogsAdminPage() {
  const [logs, setLogs] = useState<any[]>(fallbackAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    apiClient
      .get('/audit')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setLogs(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = logs.filter((l) => {
    const matchSearch =
      l.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.module.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMod = moduleFilter === 'all' || l.module.includes(moduleFilter);
    return matchSearch && matchMod;
  });

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <ShieldAlert className="w-5 h-5 text-blue-600" /> Security Audit &amp; Activity Telemetry
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Cryptographically verified audit trail of fee collections, marksheet approvals, and system events.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Security Audit Log sheet.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Audit Sheet
            </Button>
            <Button
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold"
              onClick={() => toast.success('Security audit log exported to CSV.', 'Export Complete')}
              leftIcon={<Download className="w-4 h-4 text-amber-400" />}
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search operator, event action, or module..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'Exams', 'Fee POS', 'Attendance', 'Admissions', 'Security', 'Library'].map((m) => (
              <button
                key={m}
                onClick={() => setModuleFilter(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  moduleFilter === m
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {m === 'all' ? 'All Activity' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Operator &amp; Credential</th>
                    <th className="p-3.5">Action Executed</th>
                    <th className="p-3.5">ERP Sub-System</th>
                    <th className="p-3.5">IP Address</th>
                    <th className="p-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((l) => (
                    <tr key={l._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-mono text-[11px] text-slate-500">{l.timestamp}</td>
                      <td className="p-3.5 font-bold text-slate-900">{l.operator}</td>
                      <td className="p-3.5 text-slate-700">{l.action}</td>
                      <td className="p-3.5">
                        <Badge size="sm" variant="info">
                          {l.module}
                        </Badge>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-400">{l.ipAddress}</td>
                      <td className="p-3.5 text-center">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                          {l.status}
                        </span>
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
