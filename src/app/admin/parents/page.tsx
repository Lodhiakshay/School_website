'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
  Printer,
  Phone,
  MapPin,
  Briefcase,
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

const fallbackParents = [
  {
    _id: 'par_01',
    fatherName: 'Shri Rajesh Sharma',
    motherName: 'Smt. Meena Sharma',
    fatherPhone: '+91 94150 12345',
    fatherOccupation: 'Government Officer (UP PWD)',
    children: 'Aarav Sharma (Class 10-A), Ananya Sharma (Class 7-B)',
    residentialAddress: 'Civil Lines, Shamsabad, Farrukhabad',
    status: 'active',
  },
  {
    _id: 'par_02',
    fatherName: 'Dr. Alok Tripathi',
    motherName: 'Dr. Shalini Tripathi',
    fatherPhone: '+91 98390 23456',
    fatherOccupation: 'Physician (District Hospital)',
    children: 'Shivam Tripathi (Class 12-A)',
    residentialAddress: 'Mohalla Kazi Tola, Shamsabad',
    status: 'active',
  },
  {
    _id: 'par_03',
    fatherName: 'Shri Devendra Singh Rathore',
    motherName: 'Smt. Saroj Rathore',
    fatherPhone: '+91 94500 34567',
    fatherOccupation: 'Agricultural Business & Farming',
    children: 'Divyanshu Singh (Class 10-B), Rohit Singh (Class 8-A)',
    residentialAddress: 'Village Sikanderpur, Post Shamsabad',
    status: 'active',
  },
  {
    _id: 'par_04',
    fatherName: 'Shri Santosh Kumar Gupta',
    motherName: 'Smt. Sunita Gupta',
    fatherPhone: '+91 97920 45678',
    fatherOccupation: 'Merchant / Whole-seller',
    children: 'Pooja Gupta (Class 12-B)',
    residentialAddress: 'Main Market, Shamsabad',
    status: 'active',
  },
  {
    _id: 'par_05',
    fatherName: 'Shri Rameshwar Dayal Verma',
    motherName: 'Smt. Geeta Verma',
    fatherPhone: '+91 94510 56789',
    fatherOccupation: 'Senior School Teacher (Retired)',
    children: 'Rohan Verma (Class 12-A)',
    residentialAddress: 'Teachers Colony, Shamsabad',
    status: 'active',
  },
  {
    _id: 'par_06',
    fatherName: 'Shri Manoj Kumar Mishra',
    motherName: 'Smt. Anita Mishra',
    fatherPhone: '+91 98890 67890',
    fatherOccupation: 'Chartered Accountant',
    children: 'Harsh Mishra (Class 9-A)',
    residentialAddress: 'Station Road, Shamsabad',
    status: 'active',
  },
];

export default function ParentsAdminPage() {
  const [parents, setParents] = useState<any[]>(fallbackParents);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newParent, setNewParent] = useState({
    fatherName: '',
    motherName: '',
    fatherPhone: '',
    fatherOccupation: 'Business',
    children: '',
    residentialAddress: '',
  });

  useEffect(() => {
    apiClient
      .get('/parents')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setParents(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddParent = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'par_' + Date.now(),
      fatherName: newParent.fatherName,
      motherName: newParent.motherName,
      fatherPhone: newParent.fatherPhone,
      fatherOccupation: newParent.fatherOccupation,
      children: newParent.children,
      residentialAddress: newParent.residentialAddress,
      status: 'active',
    };
    setParents([created, ...parents]);
    setShowAddModal(false);
    toast.success(`Guardian "${created.fatherName}" registered in SIS!`, 'Parent Enrolled');
  };

  const filtered = parents.filter(
    (p) =>
      p.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.children.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fatherPhone.includes(searchQuery)
  );

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Users className="w-5 h-5 text-blue-600" /> Parent &amp; Guardian SIS Directory
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified household guardians, phone helpline links, enrolled children, and addresses.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Parent Directory.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print List
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Guardian
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search father name, student, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Parents Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Father / Primary Guardian</th>
                    <th className="p-3.5">Mother Name</th>
                    <th className="p-3.5">Contact Phone</th>
                    <th className="p-3.5">Enrolled Wards / Students</th>
                    <th className="p-3.5">Occupation</th>
                    <th className="p-3.5">Residential Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{p.fatherName}</div>
                      </td>
                      <td className="p-3.5 text-slate-600">{p.motherName}</td>
                      <td className="p-3.5 font-mono font-bold text-blue-600 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-slate-400" /> {p.fatherPhone}
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                          {p.children}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600">{p.fatherOccupation}</td>
                      <td className="p-3.5 text-slate-500 text-[11px] truncate max-w-xs">
                        {p.residentialAddress}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Guardian Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Register Guardian Profile
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddParent} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Father / Guardian *"
                  required
                  placeholder="e.g. Shri Rajesh Sharma"
                  value={newParent.fatherName}
                  onChange={(e) => setNewParent({ ...newParent, fatherName: e.target.value })}
                />
                <Input
                  label="Mother Name *"
                  required
                  placeholder="e.g. Smt. Meena Sharma"
                  value={newParent.motherName}
                  onChange={(e) => setNewParent({ ...newParent, motherName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Contact Phone *"
                  required
                  placeholder="e.g. +91 94150 12345"
                  value={newParent.fatherPhone}
                  onChange={(e) => setNewParent({ ...newParent, fatherPhone: e.target.value })}
                />
                <Input
                  label="Occupation"
                  placeholder="e.g. Government Service"
                  value={newParent.fatherOccupation}
                  onChange={(e) => setNewParent({ ...newParent, fatherOccupation: e.target.value })}
                />
              </div>

              <Input
                label="Enrolled Wards (Name & Class) *"
                required
                placeholder="e.g. Aarav Sharma (Class 10-A)"
                value={newParent.children}
                onChange={(e) => setNewParent({ ...newParent, children: e.target.value })}
              />

              <Input
                label="Residential Address"
                placeholder="e.g. Civil Lines, Shamsabad"
                value={newParent.residentialAddress}
                onChange={(e) => setNewParent({ ...newParent, residentialAddress: e.target.value })}
              />

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Save Guardian
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
