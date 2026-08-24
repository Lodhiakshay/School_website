'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus, CheckCircle2, Phone } from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Modal } from '../../components/ui/modal';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { apiClient } from '../../lib/api-client';
import { formatDate } from '../../lib/utils';

export default function AdmissionStaffDashboardPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showConvertModal, setShowConvertModal] = useState(false);
  const [activeApp, setActiveApp] = useState<any>(null);
  const [convertForm, setConvertForm] = useState({
    sectionId: '',
    rollNumber: 1,
  });

  const fetchApps = async () => {
    setIsLoading(true);
    try {
      const [resApps, resSec] = await Promise.all([
        apiClient.get('/admissions'),
        apiClient.get('/academics/sections'),
      ]);
      setApplications(resApps.data?.data || []);
      setSections(resSec.data?.data || []);
      if (resSec.data?.data?.length > 0) {
        setConvertForm((prev) => ({ ...prev, sectionId: resSec.data.data[0]._id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await apiClient.put(`/admissions/${id}/status`, { status });
      fetchApps();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleConvertToStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApp) return;
    try {
      const res = await apiClient.post(`/admissions/${activeApp._id}/convert-to-student`, {
        sectionId: convertForm.sectionId,
        rollNumber: Number(convertForm.rollNumber),
      });
      alert(`🎉 Student enrolled! Admission No: ${res.data.data.student.admissionNumber}`);
      setShowConvertModal(false);
      fetchApps();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to convert application');
    }
  };

  return (
    <PortalLayout allowedRoles={['AdmissionStaff', 'SuperAdmin', 'Admin']}>
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-blue-600" /> Admission Counselor Desk
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review incoming student inquiries, verify certificates, and execute official student enrollment.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner label="Loading application pipeline..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3.5">App Number</th>
                    <th className="px-4 py-3.5">Applicant</th>
                    <th className="px-4 py-3.5">Target Class</th>
                    <th className="px-4 py-3.5">Father Contact</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{app.applicationNumber}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{app.applicantName}</td>
                      <td className="px-4 py-3">{app.targetClassId?.name || 'Class'}</td>
                      <td className="px-4 py-3">
                        {app.fatherName} ({app.fatherPhone})
                      </td>
                      <td className="px-4 py-3">
                        <Badge size="sm" variant={app.status === 'admitted' ? 'success' : 'info'}>
                          {app.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right space-x-1">
                        {app.status !== 'admitted' ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(app._id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => {
                                setActiveApp(app);
                                setShowConvertModal(true);
                              }}
                            >
                              Enroll
                            </Button>
                          </>
                        ) : (
                          <span className="text-xs text-emerald-600 font-bold flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {activeApp && (
        <Modal
          isOpen={showConvertModal}
          onClose={() => setShowConvertModal(false)}
          title="Convert to Enrolled Student"
          maxWidth="md"
        >
          <form onSubmit={handleConvertToStudent} className="space-y-4">
            <Select
              label="Assign Section"
              required
              options={sections.map((s) => ({ value: s._id, label: `Section ${s.name}` }))}
              value={convertForm.sectionId}
              onChange={(e) => setConvertForm({ ...convertForm, sectionId: e.target.value })}
            />
            <Input
              label="Initial Roll Number"
              type="number"
              required
              value={convertForm.rollNumber}
              onChange={(e) => setConvertForm({ ...convertForm, rollNumber: Number(e.target.value) })}
            />
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setShowConvertModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Confirm Enrollment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </PortalLayout>
  );
}

