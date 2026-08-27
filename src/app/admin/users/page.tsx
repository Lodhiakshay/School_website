'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCircle,
  Plus,
  Search,
  Printer,
  ShieldCheck,
  Key,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackUsers = [
  {
    _id: 'usr_01',
    name: 'Administrative IT Control',
    email: 'superadmin@sarswati.edu',
    role: 'SuperAdmin',
    department: 'Central Administration',
    status: 'active',
    lastLogin: 'Today, 10:14 AM',
  },
  {
    _id: 'usr_02',
    name: 'School Admin Operations',
    email: 'admin@sarswati.edu',
    role: 'Admin',
    department: 'School Operations',
    status: 'active',
    lastLogin: 'Today, 09:30 AM',
  },
  {
    _id: 'usr_03',
    name: 'Dr. Ramesh Kumar Sharma',
    email: 'principal@sarswati.edu',
    role: 'Principal',
    department: 'Executive Office',
    status: 'active',
    lastLogin: 'Today, 08:45 AM',
  },
  {
    _id: 'usr_04',
    name: 'Shri Dinesh Gupta',
    email: 'teacher@sarswati.edu',
    role: 'Teacher',
    department: 'Mathematics & Class 10A Incharge',
    status: 'active',
    lastLogin: 'Today, 09:12 AM',
  },
  {
    _id: 'usr_05',
    name: 'Aarav Sharma',
    email: 'student@sarswati.edu',
    role: 'Student',
    department: 'Class 10 (Section A)',
    status: 'active',
    lastLogin: 'Yesterday, 07:20 PM',
  },
  {
    _id: 'usr_06',
    name: 'Shri Rajesh Sharma',
    email: 'parent@sarswati.edu',
    role: 'Parent',
    department: 'Parent Guardian (Aarav & Ananya)',
    status: 'active',
    lastLogin: 'Yesterday, 08:40 PM',
  },
  {
    _id: 'usr_07',
    name: 'Shri Manoj Mishra',
    email: 'accountant@sarswati.edu',
    role: 'Accountant',
    department: 'Bursar & Accounts Desk',
    status: 'active',
    lastLogin: 'Today, 10:05 AM',
  },
  {
    _id: 'usr_08',
    name: 'Smt. Geeta Dixit',
    email: 'librarian@sarswati.edu',
    role: 'Librarian',
    department: 'Central Knowledge Library',
    status: 'active',
    lastLogin: 'Today, 08:50 AM',
  },
  {
    _id: 'usr_09',
    name: 'Smt. Pooja Verma',
    email: 'admission@sarswati.edu',
    role: 'AdmissionStaff',
    department: 'Admissions & Counseling',
    status: 'active',
    lastLogin: 'Today, 09:40 AM',
  },
];

export default function UsersAdminPage() {
  const [users, setUsers] = useState<any[]>(fallbackUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Teacher',
    department: 'Academics',
  });

  useEffect(() => {
    apiClient
      .get('/users')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setUsers(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'usr_' + Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: 'active',
      lastLogin: 'Just Registered',
    };
    setUsers([...users, created]);
    setShowAddModal(false);
    toast.success(`User Account "${created.email}" created with role ${created.role}!`, 'User Provisioned');
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <UserCircle className="w-5 h-5 text-blue-600" /> User Accounts &amp; RBAC Permissions
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage system authentication, multi-role security assignments, and access logs.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable User Accounts directory.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Roster
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Create User
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search user name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'SuperAdmin', 'Principal', 'Teacher', 'Student', 'Parent', 'Accountant', 'Librarian'].map(
              (r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    roleFilter === r
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r === 'all' ? 'All Roles' : r}
                </button>
              )
            )}
          </div>
        </div>

        {/* Users Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[800px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5 whitespace-nowrap">Full Name</th>
                    <th className="p-3.5 whitespace-nowrap">Official Email / Username</th>
                    <th className="p-3.5 whitespace-nowrap">Role Permission</th>
                    <th className="p-3.5 whitespace-nowrap">Department / Description</th>
                    <th className="p-3.5 whitespace-nowrap">Status</th>
                    <th className="p-3.5 whitespace-nowrap">Last Login Telemetry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{u.name}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap font-mono font-bold text-blue-600">{u.email}</td>
                      <td className="p-3.5">
                        <Badge
                          size="sm"
                          variant={
                            u.role === 'SuperAdmin'
                              ? 'purple'
                              : u.role === 'Principal'
                              ? 'info'
                              : u.role === 'Teacher'
                              ? 'success'
                              : 'default'
                          }
                        >
                          {u.role}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-slate-600">{u.department}</td>
                      <td className="p-3.5">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                          Active
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-400">{u.lastLogin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Provision ERP User Account
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <Input
                label="Full Name *"
                required
                placeholder="e.g. Shri Anand Mishra"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <Input
                label="Official Email *"
                required
                type="email"
                placeholder="e.g. anand.mishra@sarswati.edu"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Librarian">Librarian</option>
                    <option value="AdmissionStaff">Admission Staff</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <Input
                  label="Department / Incharge"
                  placeholder="e.g. Science Dept"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Provision User
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
