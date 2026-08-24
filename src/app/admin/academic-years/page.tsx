'use client';

import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Plus,
  Calendar,
  CheckCircle2,
  Printer,
  Sparkles,
  Clock,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackYears = [
  {
    _id: 'ay_01',
    name: 'Academic Session 2026-2027',
    code: 'SESS-2026-27',
    startDate: '01 Apr 2026',
    endDate: '31 Mar 2027',
    isCurrent: true,
    status: 'active',
    totalWorkingDays: 220,
    termCount: 2,
  },
  {
    _id: 'ay_02',
    name: 'Academic Session 2025-2026',
    code: 'SESS-2025-26',
    startDate: '01 Apr 2025',
    endDate: '31 Mar 2026',
    isCurrent: false,
    status: 'completed',
    totalWorkingDays: 218,
    termCount: 2,
  },
  {
    _id: 'ay_03',
    name: 'Academic Session 2027-2028',
    code: 'SESS-2027-28',
    startDate: '01 Apr 2027',
    endDate: '31 Mar 2028',
    isCurrent: false,
    status: 'planning',
    totalWorkingDays: 222,
    termCount: 2,
  },
];

export default function AcademicYearsPage() {
  const [years, setYears] = useState<any[]>(fallbackYears);
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newYear, setNewYear] = useState({
    name: 'Academic Session 2027-2028',
    startDate: '2027-04-01',
    endDate: '2028-03-31',
    totalWorkingDays: '220',
  });

  useEffect(() => {
    apiClient
      .get('/academics/years')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setYears(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddYear = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'ay_' + Date.now(),
      name: newYear.name,
      code: 'SESS-' + newYear.name.slice(-9),
      startDate: newYear.startDate,
      endDate: newYear.endDate,
      isCurrent: false,
      status: 'planning',
      totalWorkingDays: Number(newYear.totalWorkingDays) || 220,
      termCount: 2,
    };
    setYears([...years, created]);
    setShowAddModal(false);
    toast.success(`Academic Session "${created.name}" created!`, 'Session Configured');
  };

  const handleSetActive = (id: string, name: string) => {
    setYears(
      years.map((y) => ({
        ...y,
        isCurrent: y._id === id,
        status: y._id === id ? 'active' : y.status === 'active' ? 'completed' : y.status,
      }))
    );
    toast.success(`"${name}" is now set as the active institutional session.`, 'Active Session Updated');
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <CalendarCheck className="w-5 h-5 text-blue-600" /> Academic Sessions &amp; Term Terms
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage annual school calendar sessions, active term markers, and working day quotas.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Session Calendar.', 'Print Ready');
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
              Add Session
            </Button>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {years.map((y) => (
            <Card
              key={y._id}
              className={`border shadow-sm overflow-hidden flex flex-col justify-between transition hover:shadow-md ${
                y.isCurrent ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10' : 'border-slate-200 bg-white'
              }`}
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      y.isCurrent
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : y.status === 'completed'
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-amber-100 text-amber-800 border-amber-200'
                    }`}
                  >
                    {y.isCurrent ? '● Active Session' : y.status}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">{y.code || 'SESS'}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900 font-serif leading-snug">{y.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" /> {y.startDate} &mdash; {y.endDate}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Working Days</span>
                    <p className="font-black text-slate-900">{y.totalWorkingDays} Days</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Terms</span>
                    <p className="font-bold text-blue-700">2 (Half / Final)</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  {y.isCurrent ? (
                    <div className="text-center text-xs font-bold text-emerald-700 py-1 bg-emerald-50 rounded-xl border border-emerald-200">
                      ✓ Currently Active in ERP
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleSetActive(y._id, y.name)}
                    >
                      Set as Active Session
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Create Academic Session
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddYear} className="space-y-3.5 text-xs">
              <Input
                label="Session Name *"
                required
                placeholder="e.g. Academic Session 2027-2028"
                value={newYear.name}
                onChange={(e) => setNewYear({ ...newYear, name: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Start Date *"
                  type="date"
                  required
                  value={newYear.startDate}
                  onChange={(e) => setNewYear({ ...newYear, startDate: e.target.value })}
                />
                <Input
                  label="End Date *"
                  type="date"
                  required
                  value={newYear.endDate}
                  onChange={(e) => setNewYear({ ...newYear, endDate: e.target.value })}
                />
              </div>

              <Input
                label="Estimated Working Days"
                type="number"
                value={newYear.totalWorkingDays}
                onChange={(e) => setNewYear({ ...newYear, totalWorkingDays: e.target.value })}
              />

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Save Session
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
