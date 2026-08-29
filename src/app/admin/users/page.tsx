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
  Edit2,
  Trash2,
  Lock,
  UserCheck,
  UserX,
  Phone,
  Mail,
  ShieldAlert,
  Building,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { AvatarPicker } from '../../../components/ui/avatar-picker';
import { ConfirmDialog } from '../../../components/ui/confirm-dialog';
import { apiClient } from '../../../lib/api-client';

export const ERP_ROLES = [
  { value: 'SuperAdmin', label: 'Super Administrator', badge: 'purple', desc: 'Full System Root & IT Access' },
  { value: 'Admin', label: 'School Admin', badge: 'blue', desc: 'School Operations & Configuration' },
  { value: 'Principal', label: 'Principal / Director', badge: 'info', desc: 'Executive Academic Head' },
  { value: 'Teacher', label: 'Faculty / Educator', badge: 'success', desc: 'Class, Attendance & Marks Entry' },
  { value: 'Student', label: 'Student Scholar', badge: 'default', desc: 'Student Portal & Learning' },
  { value: 'Parent', label: 'Parent / Guardian', badge: 'warning', desc: 'Fee, Attendance & Progress Desk' },
  { value: 'Accountant', label: 'Accounts & Bursar', badge: 'info', desc: 'Fee Invoicing & Payment Books' },
  { value: 'Librarian', label: 'Library Curator', badge: 'default', desc: 'Library Catalog & Circulation' },
  { value: 'AdmissionStaff', label: 'Admissions Officer', badge: 'success', desc: 'Inquiries & Scholar Enrollment' },
  { value: 'TransportStaff', label: 'Transport Coordinator', badge: 'warning', desc: 'Buses, Routes & GPS Operations' },
];

const fallbackUsers = [
  {
    _id: 'usr_01',
    name: 'Administrative IT Control',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    email: 'superadmin@sarswati.edu',
    phone: '+91 9451234500',
    role: 'SuperAdmin',
    department: 'Central Administration',
    status: 'active',
    lastLogin: 'Today, 10:14 AM',
  },
  {
    _id: 'usr_02',
    name: 'School Admin Operations',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    email: 'admin@sarswati.edu',
    phone: '+91 9451234501',
    role: 'Admin',
    department: 'School Operations',
    status: 'active',
    lastLogin: 'Today, 09:30 AM',
  },
  {
    _id: 'usr_03',
    name: 'Dr. Ramesh Kumar Sharma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    email: 'principal@sarswati.edu',
    phone: '+91 9451234502',
    role: 'Principal',
    department: 'Executive Office',
    status: 'active',
    lastLogin: 'Today, 08:45 AM',
  },
  {
    _id: 'usr_04',
    name: 'Shri Dinesh Gupta',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    email: 'teacher@sarswati.edu',
    phone: '+91 9451234503',
    role: 'Teacher',
    department: 'Mathematics & Class 10A Incharge',
    status: 'active',
    lastLogin: 'Today, 09:12 AM',
  },
  {
    _id: 'usr_05',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    email: 'student@sarswati.edu',
    phone: '+91 9451234504',
    role: 'Student',
    department: 'Class 10 (Section A)',
    status: 'active',
    lastLogin: 'Yesterday, 07:20 PM',
  },
  {
    _id: 'usr_06',
    name: 'Shri Rajesh Sharma',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    email: 'parent@sarswati.edu',
    phone: '+91 9451234505',
    role: 'Parent',
    department: 'Parent Guardian (Aarav & Ananya)',
    status: 'active',
    lastLogin: 'Yesterday, 08:40 PM',
  },
  {
    _id: 'usr_07',
    name: 'Shri Manoj Mishra',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    email: 'accountant@sarswati.edu',
    phone: '+91 9451234506',
    role: 'Accountant',
    department: 'Bursar & Accounts Desk',
    status: 'active',
    lastLogin: 'Today, 10:05 AM',
  },
  {
    _id: 'usr_08',
    name: 'Smt. Geeta Dixit',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    email: 'librarian@sarswati.edu',
    phone: '+91 9451234507',
    role: 'Librarian',
    department: 'Central Knowledge Library',
    status: 'active',
    lastLogin: 'Today, 08:50 AM',
  },
  {
    _id: 'usr_09',
    name: 'Smt. Pooja Verma',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    email: 'admission@sarswati.edu',
    phone: '+91 9451234508',
    role: 'AdmissionStaff',
    department: 'Admissions & Counseling Desk',
    status: 'active',
    lastLogin: 'Today, 09:40 AM',
  },
];

const LOCAL_STORAGE_USERS_KEY = 'erp_users_roster_v2';

export default function UsersAdminPage() {
  const [users, setUsers] = useState<any[]>(fallbackUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<any | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState('School@123');
  const { toast } = useToast();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    avatar: '',
    role: 'Teacher',
    department: 'Academics',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length >= 0) {
          setUsers(parsed);
        }
      }
    } catch {}

    apiClient
      .get('/users')
      .then((res) => {
        if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setUsers(res.data.data);
          try {
            localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(res.data.data));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  // Create User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newUser.email.trim();
    if (!cleanEmail) return;

    const created = {
      _id: 'usr_' + Date.now(),
      name: newUser.name,
      email: cleanEmail,
      phone: newUser.phone || '+91 9451234999',
      role: newUser.role,
      department: newUser.department || 'General Administration',
      avatar:
        newUser.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: newUser.status,
      lastLogin: 'Never',
    };

    try {
      await apiClient.post('/users', {
        name: newUser.name,
        email: cleanEmail,
        phone: newUser.phone,
        username: newUser.username || cleanEmail.split('@')[0],
        password: newUser.password || 'School@123',
        avatar: newUser.avatar,
        role: newUser.role,
        status: newUser.status,
      });
    } catch {
      // Local state fallback
    }

    const updatedList = [created, ...users];
    setUsers(updatedList);
    try {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedList));
    } catch {}

    setShowAddModal(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      avatar: '',
      role: 'Teacher',
      department: 'Academics',
      status: 'active',
    });
    toast.success(`User Account "${created.email}" provisioned!`, 'User Provisioned');
  };

  // Update User
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await apiClient.put(`/users/${editingUser._id}`, editingUser);
    } catch {
      // Local state fallback
    }

    const updatedList = users.map((u) => (u._id === editingUser._id ? editingUser : u));
    setUsers(updatedList);
    try {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedList));
    } catch {}

    setEditingUser(null);
    toast.success(`User Account "${editingUser.name}" updated successfully!`, 'Account Updated');
  };

  // Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPasswordUser) return;

    try {
      await apiClient.post(`/users/${resetPasswordUser._id}/reset-password`, {
        password: newPasswordValue,
      });
    } catch {
      // Local state fallback
    }

    setResetPasswordUser(null);
    toast.success(`Password for ${resetPasswordUser.email} has been updated to "${newPasswordValue}".`, 'Password Reset');
  };

  // Toggle Status
  const handleToggleStatus = async (user: any) => {
    const nextStatus = user.status === 'active' ? 'inactive' : 'active';
    const updated = { ...user, status: nextStatus };

    try {
      await apiClient.put(`/users/${user._id}`, { status: nextStatus });
    } catch {
      // Local state fallback
    }

    const updatedList = users.map((u) => (u._id === user._id ? updated : u));
    setUsers(updatedList);
    try {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedList));
    } catch {}

    toast.info(`Account status for ${user.name} changed to ${nextStatus.toUpperCase()}`, 'Status Updated');
  };

  const [deletingUser, setDeletingUser] = useState<{ id: string; name: string } | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Delete User
  const handleDeleteUser = (id: string, name: string) => {
    setDeletingUser({ id, name });
  };

  const handleConfirmDeleteUser = async () => {
    if (!deletingUser) return;
    const targetId = deletingUser.id;
    const targetName = deletingUser.name;
    setIsDeletingUser(true);
    try {
      await apiClient.delete(`/users/${targetId}`);
    } catch {
      // Local state fallback
    }

    const updatedList = users.filter((u) => String(u._id) !== String(targetId));
    setUsers(updatedList);
    try {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedList));
    } catch {}

    toast.success(`User account "${targetName}" has been removed.`, 'Account Removed');
    setIsDeletingUser(false);
    setDeletingUser(null);
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.phone && u.phone.includes(searchQuery));
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <ShieldCheck className="w-5 h-5 text-blue-600" /> User Accounts &amp; RBAC Access Matrix
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Provision ERP user credentials, configure profile avatars, manage security roles, and monitor audit telemetry.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable User Accounts roster.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Roster
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold shadow-sm"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Provision New User
            </Button>
          </div>
        </div>

        {/* Role Quick Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {[
            { label: 'Total Users', count: users.length, icon: UserCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active Faculty', count: users.filter((u) => u.role === 'Teacher').length, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Scholars & Parents', count: users.filter((u) => u.role === 'Student' || u.role === 'Parent').length, icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Admin Staff', count: users.filter((u) => ['SuperAdmin', 'Admin', 'Principal'].includes(u.role)).length, icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Accounts & Library', count: users.filter((u) => ['Accountant', 'Librarian', 'AdmissionStaff'].includes(u.role)).length, icon: Building, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                <div className="text-base font-black text-slate-900">{stat.count}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search user name, email, phone, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  roleFilter === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Roles
              </button>
              {['SuperAdmin', 'Principal', 'Teacher', 'Student', 'Parent', 'Accountant', 'Librarian'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    roleFilter === r ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active Accounts</option>
              <option value="inactive">Inactive / Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden rounded-3xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[860px]">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3.5 whitespace-nowrap">User Profile</th>
                    <th className="p-3.5 whitespace-nowrap">Official Contact / Email</th>
                    <th className="p-3.5 whitespace-nowrap">Role &amp; Permissions</th>
                    <th className="p-3.5 whitespace-nowrap">Department / Incharge</th>
                    <th className="p-3.5 whitespace-nowrap">Status</th>
                    <th className="p-3.5 whitespace-nowrap">Last Telemetry</th>
                    <th className="p-3.5 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((u) => {
                    const roleMeta = ERP_ROLES.find((r) => r.value === u.role);
                    return (
                      <tr key={u._id} className="hover:bg-blue-50/40 transition group">
                        {/* Profile Avatar & Name */}
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-xs shrink-0">
                              {u.avatar ? (
                                <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 font-black text-sm">
                                  {u.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-xs">{u.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">ID: {u._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>

                        {/* Contact info */}
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="space-y-0.5">
                            <div className="font-mono font-bold text-blue-600 flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {u.email}
                            </div>
                            {u.phone && (
                              <div className="text-[10.5px] text-slate-500 flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {u.phone}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Role */}
                        <td className="p-3.5 whitespace-nowrap">
                          <div className="space-y-1">
                            <Badge
                              size="sm"
                              variant={
                                u.role === 'SuperAdmin'
                                  ? 'purple'
                                  : u.role === 'Principal' || u.role === 'Admin'
                                  ? 'info'
                                  : u.role === 'Teacher'
                                  ? 'success'
                                  : u.role === 'Parent'
                                  ? 'warning'
                                  : 'default'
                              }
                            >
                              {u.role}
                            </Badge>
                            <div className="text-[9.5px] text-slate-400 font-normal">{roleMeta?.desc}</div>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="p-3.5 text-slate-700">{u.department || 'General'}</td>

                        {/* Status Toggle */}
                        <td className="p-3.5 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(u)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black border transition inline-flex items-center gap-1 ${
                              u.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                            }`}
                            title="Click to toggle account status"
                          >
                            {u.status === 'active' ? (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Active
                              </>
                            ) : (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                Inactive
                              </>
                            )}
                          </button>
                        </td>

                        {/* Telemetry */}
                        <td className="p-3.5 font-mono text-[10.5px] text-slate-400 whitespace-nowrap">
                          {u.lastLogin || 'Never'}
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setResetPasswordUser(u);
                                setNewPasswordValue('School@123');
                              }}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 transition shadow-2xs"
                              title="Reset Password"
                            >
                              <Key className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingUser({ ...u })}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition shadow-2xs"
                              title="Edit User Details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u._id, u.name)}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition shadow-2xs"
                              title="Revoke / Delete User"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provision User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border border-slate-200 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
                <Plus className="w-4 h-4 text-blue-600" /> Provision New ERP User Account
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5 text-xs">
              {/* Profile Photo / Avatar Picker */}
              <AvatarPicker
                label="Profile Picture / User Avatar"
                value={newUser.avatar}
                onChange={(url) => setNewUser({ ...newUser, avatar: url })}
                helperText="Upload official photograph or pick from institutional faculty/student presets."
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Full Name *"
                  required
                  placeholder="e.g. Acharya Rakesh Mishra"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <Input
                  label="Official Email *"
                  required
                  type="email"
                  placeholder="e.g. rakesh.mishra@sarswati.edu"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Contact Phone"
                  placeholder="+91 9451234500"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
                <Input
                  label="Initial Password"
                  type="password"
                  placeholder="Default: School@123"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Security Role *</label>
                  <select
                    className="w-full p-2.5 rounded-2xl border border-slate-200 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    {ERP_ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label} ({r.value})
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Department / Assigned Unit"
                  placeholder="e.g. Science Department"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 font-bold rounded-2xl">
                  Provision User Account
                </Button>
                <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border border-slate-200 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
                <Edit2 className="w-4 h-4 text-blue-600" /> Edit User Account: {editingUser.name}
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-3.5 text-xs">
              <AvatarPicker
                label="Update Profile Picture"
                value={editingUser.avatar}
                onChange={(url) => setEditingUser({ ...editingUser, avatar: url })}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Full Name *"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <Input
                  label="Official Email *"
                  required
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Contact Phone"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                />
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
                  <select
                    className="w-full p-2.5 rounded-2xl border border-slate-200 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  >
                    {ERP_ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Department / Description"
                  value={editingUser.department || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                />
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Account Status</label>
                  <select
                    className="w-full p-2.5 rounded-2xl border border-slate-200 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive / Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 font-bold rounded-2xl">
                  Save Changes
                </Button>
                <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setEditingUser(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetPasswordUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5 font-serif">
                <Key className="w-4 h-4 text-amber-600" /> Reset User Credentials
              </h3>
              <button onClick={() => setResetPasswordUser(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-[11px] text-amber-900 space-y-1">
              <div className="font-bold">{resetPasswordUser.name}</div>
              <div className="font-mono text-[10px] text-amber-700">{resetPasswordUser.email}</div>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-3 text-xs">
              <Input
                label="New Password *"
                required
                type="text"
                value={newPasswordValue}
                onChange={(e) => setNewPasswordValue(e.target.value)}
                placeholder="Enter new password"
              />

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl">
                  Confirm Reset
                </Button>
                <Button type="button" variant="outline" className="rounded-2xl" onClick={() => setResetPasswordUser(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Production Grade Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingUser)}
        onClose={() => !isDeletingUser && setDeletingUser(null)}
        onConfirm={handleConfirmDeleteUser}
        title="Revoke & Remove User Account"
        description="Are you sure you want to revoke system access and remove this staff/user account from the ERP portal?"
        itemName={deletingUser?.name}
        confirmText="Yes, Remove Account"
        cancelText="Keep Account"
        isLoading={isDeletingUser}
        variant="danger"
      />
    </PortalLayout>
  );
}

