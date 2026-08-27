'use client';

import React, { useState } from 'react';
import {
  Settings,
  Save,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/toast';

export default function SchoolSettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    nameHindi: 'सरस्वती ज्ञान मन्दिर इण्टर कॉलेज',
    nameEnglish: 'Sarswati Gyan Mandir Intermediate College',
    tagline: 'तमसो मा ज्योतिर्गमय — Lead Us From Darkness Unto Light',
    affiliationCode: 'UP-FBD-2026-SGM-089',
    examinationCenterCode: 'FBD-CENT-1089',
    board: 'UP State Board of High School and Intermediate Education (Prayagraj)',
    establishedYear: '1999',
    principalName: 'Dr. Ramesh Kumar Sharma',
    principalQualifications: 'M.Sc., M.Ed., Ph.D.',
    phone: '+91 9876543210',
    email: 'principal@sarswati.edu',
    website: 'https://school-website-ecru-pi.vercel.app',
    address: 'Main Road, Near Bus Stand, Shamsabad, District Farrukhabad',
    pincode: '209503',
    state: 'Uttar Pradesh',
    activeAcademicYear: '2026-2027',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(
        'Institutional profile and UP Board credentials updated successfully.',
        'School Settings Saved'
      );
    }, 600);
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Settings className="w-5 h-5 text-blue-600" /> Institution Profile &amp; Master Configuration
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage school credentials, UP Board affiliation codes, principal leadership, and contact data.
            </p>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 font-bold"
            isLoading={isSaving}
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Profile Settings
          </Button>
        </div>

        {/* Master Form Card */}
        <form onSubmit={handleSave} className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5">
              <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" /> Institutional Identity &amp; Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Institution Name (Hindi) *"
                  value={profile.nameHindi}
                  onChange={(e) => setProfile({ ...profile, nameHindi: e.target.value })}
                />
                <Input
                  label="Institution Name (English) *"
                  value={profile.nameEnglish}
                  onChange={(e) => setProfile({ ...profile, nameEnglish: e.target.value })}
                />
              </div>

              <Input
                label="Institutional Motto / Tagline"
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="UP Board Affiliation Code *"
                  value={profile.affiliationCode}
                  onChange={(e) => setProfile({ ...profile, affiliationCode: e.target.value })}
                />
                <Input
                  label="Exam Center Code"
                  value={profile.examinationCenterCode}
                  onChange={(e) =>
                    setProfile({ ...profile, examinationCenterCode: e.target.value })
                  }
                />
                <Input
                  label="Established Year"
                  value={profile.establishedYear}
                  onChange={(e) => setProfile({ ...profile, establishedYear: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5">
              <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Principal &amp; Campus Leadership
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Principal Full Name *"
                  value={profile.principalName}
                  onChange={(e) => setProfile({ ...profile, principalName: e.target.value })}
                />
                <Input
                  label="Principal Academic Qualifications"
                  value={profile.principalQualifications}
                  onChange={(e) =>
                    setProfile({ ...profile, principalQualifications: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5">
              <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" /> Campus Address &amp; Official Helpline
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-xs">
              <Input
                label="Campus Physical Address *"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="District &amp; State"
                  value={`${profile.state} (Farrukhabad)`}
                  readOnly
                />
                <Input
                  label="Postal PIN Code"
                  value={profile.pincode}
                  onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                />
                <Input
                  label="Helpline Phone *"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Official Support Email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <Input
                  label="Live Portal URL"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </PortalLayout>
  );
}
