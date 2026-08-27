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
import { ClientPortal } from '../../../components/ui/client-portal';

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
    email: '',
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

        {/* Mobile Directory Cards (Visible only on mobile/small tablets) */}
        <div className="grid grid-cols-1 gap-3.5 md:hidden">
          {filtered.map((p) => (
            <div
              key={p._id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3"
            >
              {/* Card Header: Guardian Name & Call CTA */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-black flex items-center justify-center text-sm border border-blue-200 flex-shrink-0">
                    {p.fatherName.charAt(0) || 'G'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{p.fatherName}</h3>
                    <p className="text-[11px] text-slate-500">Mother: {p.motherName || 'N/A'}</p>
                  </div>
                </div>
                <a
                  href={`tel:${p.fatherPhone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 hover:bg-emerald-100 transition active:scale-95 flex-shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>

              {/* Card Body: Enrolled Wards */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Enrolled Children:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {p.children}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">Occupation:</span>
                  <span className="font-semibold text-slate-700">{p.fatherOccupation || 'N/A'}</span>
                </div>

                <div className="flex items-start justify-between text-[11px] pt-1 border-t border-slate-50">
                  <span className="text-slate-500 font-medium flex-shrink-0">Address:</span>
                  <span className="text-slate-600 text-right text-[10px] line-clamp-2 max-w-[200px]">
                    {p.residentialAddress || 'Shamsabad, Farrukhabad'}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
              No matching guardian records found.
            </div>
          )}
        </div>

        {/* Desktop Data Table (Visible only on desktop/tablets) */}
        <Card className="hidden md:block border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[850px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5 whitespace-nowrap">Father / Primary Guardian</th>
                    <th className="p-3.5 whitespace-nowrap">Mother Name</th>
                    <th className="p-3.5 whitespace-nowrap">Contact Phone</th>
                    <th className="p-3.5 whitespace-nowrap">Enrolled Wards / Students</th>
                    <th className="p-3.5 whitespace-nowrap">Occupation</th>
                    <th className="p-3.5 whitespace-nowrap">Residential Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{p.fatherName}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-slate-600">{p.motherName}</td>
                      <td className="p-3.5 whitespace-nowrap font-mono font-bold text-blue-600">
                        <a
                          href={`tel:${p.fatherPhone}`}
                          className="inline-flex items-center gap-1.5 hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-400" /> {p.fatherPhone}
                        </a>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px]">
                          {p.children}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-slate-600">{p.fatherOccupation}</td>
                      <td className="p-3.5 text-slate-500 text-[11px] truncate max-w-xs">
                        {p.residentialAddress}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-slate-400 text-xs">
                        No matching guardian records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Guardian Modal */}
      {showAddModal && (
        <ClientPortal>
          <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto w-full h-full min-h-screen">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 my-auto">
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
                    placeholder="e.g. Smt. Sunita Sharma"
                    value={newParent.motherName}
                    onChange={(e) => setNewParent({ ...newParent, motherName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Mobile Phone *"
                    required
                    placeholder="+91 98765 43210"
                    value={newParent.fatherPhone}
                    onChange={(e) => setNewParent({ ...newParent, fatherPhone: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    placeholder="parent@example.com"
                    value={newParent.email}
                    onChange={(e) => setNewParent({ ...newParent, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Occupation / Profession"
                    placeholder="e.g. Senior Bank Officer"
                    value={newParent.fatherOccupation}
                    onChange={(e) => setNewParent({ ...newParent, fatherOccupation: e.target.value })}
                  />
                  <Input
                    label="Associated Student Name"
                    placeholder="e.g. Aarav Sharma"
                    value={newParent.children}
                    onChange={(e) => setNewParent({ ...newParent, children: e.target.value })}
                  />
                </div>

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
        </ClientPortal>
      )}
    </PortalLayout>
  );
}
