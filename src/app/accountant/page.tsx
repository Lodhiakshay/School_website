'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, Plus, Receipt, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { MetricCard } from '../../components/ui/metric-card';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { apiClient } from '../../lib/api-client';
import { formatCurrency } from '../../lib/utils';

export default function AccountantDashboardPage() {
  const [stats, setStats] = useState<any>({
    todayCollection: 18500,
    totalCollected: 4250000,
    totalDues: 380000,
  });

  useEffect(() => {
    apiClient.get('/dashboard/admin').then((res) => {
      if (res.data?.data?.overview) {
        setStats(res.data.data.overview);
      }
    });
  }, []);

  return (
    <PortalLayout allowedRoles={['Accountant', 'SuperAdmin', 'Admin', 'Principal']}>
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bursar &amp; Accounts Desk</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Financial &amp; Fee Collection POS
        </h1>
        <p className="text-xs text-slate-300 max-w-xl">
          Welcome Manoj Mishra. Collect counter cash, record UPI/NEFT references, and print official fee vouchers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <MetricCard
          title="Today's Collection"
          value={formatCurrency(stats.todayCollection || 18500)}
          subtitle="Counter Cash & UPI"
          icon={<CreditCard className="w-5 h-5" />}
          color="emerald"
        />
        <MetricCard
          title="Total Collected (Session)"
          value={formatCurrency(stats.totalCollected || 4250000)}
          subtitle="Academic Session 2026-27"
          icon={<TrendingUp className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          title="Pending Student Dues"
          value={formatCurrency(stats.totalDues || 380000)}
          subtitle="Across all classes"
          icon={<Receipt className="w-5 h-5" />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/fees" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">Fee POS Collection Desk</h3>
          <p className="text-xs text-slate-500">Collect fee installments, apply discounts, and generate official stamped payment receipts.</p>
        </Link>

        <Link href="/admin/reports" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Receipt className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600">Export Financial Ledgers</h3>
          <p className="text-xs text-slate-500">Generate daily cash register statements and statutory balance sheets.</p>
        </Link>
      </div>
    </PortalLayout>
  );
}

