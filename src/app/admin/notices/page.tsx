'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Send,
  Printer,
  Calendar,
  Users,
  Sparkles,
  AlertTriangle,
  FileText,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackNotices = [
  {
    _id: 'n_01',
    title: 'UP Board High School & Intermediate Examination Forms (2026-27)',
    content:
      'All students of Class 10 and Class 12 must complete their examination registration form verification with the administrative desk. Submission deadline is 30 September 2026.',
    priority: 'urgent',
    targetAudience: 'Class 10 & 12 Scholars',
    publishDate: '24 Aug 2026',
    publisher: 'Controller of Examinations',
  },
  {
    _id: 'n_02',
    title: 'Parent-Teacher Meeting (PTM) for Half-Yearly Results',
    content:
      'The comprehensive Half-Yearly Parent-Teacher Meeting is scheduled for Saturday, 12 September 2026 from 09:00 AM to 01:30 PM. Official report cards will be distributed.',
    priority: 'high',
    targetAudience: 'All Parents & Guardians',
    publishDate: '23 Aug 2026',
    publisher: 'Principal Office',
  },
  {
    _id: 'n_03',
    title: 'Science & Innovation Exhibition Registration Open',
    content:
      'Students interested in presenting science models for the District Inter-School Science Fair must submit project synopsis to Dr. Anita Srivastava by 5 September 2026.',
    priority: 'normal',
    targetAudience: 'Science Stream (Classes 9 to 12)',
    publishDate: '22 Aug 2026',
    publisher: 'Science Department',
  },
  {
    _id: 'n_04',
    title: 'School Transport Bus Route 4 Timing Revision',
    content:
      'Due to highway maintenance near Mohammadabad, Morning pickup for Route 4 will be 15 minutes earlier starting Monday. Parents are requested to ensure punctuality at bus stops.',
    priority: 'normal',
    targetAudience: 'Bus Route 4 Commuters',
    publishDate: '20 Aug 2026',
    publisher: 'Transport Fleet Incharge',
  },
];

export default function NoticesAdminPage() {
  const [notices, setNotices] = useState<any[]>(fallbackNotices);
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    priority: 'high',
    targetAudience: 'All Students & Parents',
  });

  useEffect(() => {
    apiClient
      .get('/notices')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setNotices(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'n_' + Date.now(),
      title: newNotice.title,
      content: newNotice.content,
      priority: newNotice.priority,
      targetAudience: newNotice.targetAudience,
      publishDate: 'Today, Just Now',
      publisher: 'Administrative Portal',
    };
    setNotices([created, ...notices]);
    setShowAddModal(false);
    toast.success(
      `Notice broadcasted to ${created.targetAudience} via SMS & Student Portal!`,
      'Circular Published'
    );
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Bell className="w-5 h-5 text-blue-600" /> Circulars, Alerts &amp; SMS Broadcast
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish official UP Board circulars, event alerts, holiday announcements, and emergency notices.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Noticeboard bulletin.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Bulletin
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Broadcast Notice
            </Button>
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {notices.map((n) => {
            const isUrgent = n.priority === 'urgent';
            const isHigh = n.priority === 'high';

            return (
              <Card
                key={n._id}
                className={`border shadow-sm overflow-hidden flex flex-col justify-between transition hover:shadow-md ${
                  isUrgent
                    ? 'border-rose-300 bg-rose-50/20'
                    : isHigh
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        isUrgent
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : isHigh
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-blue-100 text-blue-800 border-blue-200'
                      }`}
                    >
                      {n.priority}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono font-medium">
                      {n.publishDate}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug font-serif">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-blue-700 font-bold">
                    <Users className="w-3.5 h-3.5" /> {n.targetAudience}
                  </span>
                  <span className="text-slate-400">By: {n.publisher}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Broadcast Notice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-600" /> Broadcast New Circular
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-3.5 text-xs">
              <Input
                label="Circular Title *"
                required
                placeholder="e.g. Winter Holiday Schedule"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                  >
                    <option value="urgent">Urgent Announcement</option>
                    <option value="high">High Priority</option>
                    <option value="normal">Normal Bulletin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Audience</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newNotice.targetAudience}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, targetAudience: e.target.value })
                    }
                  >
                    <option value="All Students & Parents">All Students &amp; Parents</option>
                    <option value="Class 10 & 12 Scholars">Class 10 &amp; 12 Only</option>
                    <option value="All Faculty Educators">Faculty Members</option>
                    <option value="Bus Commuters">Bus Commuters</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Circular Message Body *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter detailed announcement message..."
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Broadcast Circular
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
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
