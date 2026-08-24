'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { apiClient } from '../../../lib/api-client';

export default function SchoolSettingsPage() {
  const [profile, setProfile] = useState<any>({
    name: 'Sarswati Gyan Mandir',
    tagline: 'Excellence in Education, Culture & Character Building',
    affiliationCode: 'UP-FBD-2026-SGM-089',
    board: 'UP State Board of High School and Intermediate Education',
    address: {
      street: 'Main Road, Near Bus Stand',
      city: 'Shamsabad',
      district: 'Farrukhabad',
      state: 'Uttar Pradesh',
      pincode: '209503',
      country: 'India',
    },
    contact: {
      phone: '+91 9451234567',
      email: 'info@sarswatigyanmandir.edu.in',
    },
    principal: {
      name: 'Dr. Ramesh Kumar Sharma',
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    apiClient.get('/school').then((res) => {
      if (res.data?.data) setProfile(res.data.data);
    }).catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.put('/school', profile);
      setSaveSuccess(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" /> School Configuration &amp; Profile
          </h1>
        </div>
        <Button size="sm" variant="primary" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
          Save Settings
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>School profile saved!</span>
        </div>
      )}

      <Card>
        <CardContent className="p-6 space-y-4">
          <Input label="School Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <Input label="Affiliation Code" value={profile.affiliationCode} onChange={(e) => setProfile({ ...profile, affiliationCode: e.target.value })} />
          <Input label="Board" value={profile.board} onChange={(e) => setProfile({ ...profile, board: e.target.value })} />
        </CardContent>
      </Card>
    </PortalLayout>
  );
}
