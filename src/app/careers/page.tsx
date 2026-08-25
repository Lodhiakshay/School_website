'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Building2,
  Users,
  Award,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  X,
  FileText,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { useToast } from '../../components/ui/toast';

interface JobPosition {
  id: string;
  title: string;
  department: 'science' | 'humanities' | 'primary' | 'admin' | 'technology';
  deptLabel: string;
  type: string;
  experience: string;
  qualification: string;
  vacancies: number;
  location: string;
  description: string;
  requirements: string[];
}

const jobOpenings: JobPosition[] = [
  {
    id: 'pgt-physics',
    title: 'PGT Physics (Class 11 & 12 Board)',
    department: 'science',
    deptLabel: 'Science & Senior Secondary',
    type: 'Full Time &bull; Permanent',
    experience: '3+ Years in UP Board / CBSE Senior Secondary',
    qualification: 'M.Sc. (Physics) with B.Ed. (First Division)',
    vacancies: 1,
    location: 'Campus, Shamsabad (Farrukhabad)',
    description:
      'Responsible for curriculum delivery of Senior Secondary Physics, supervising advanced optics/mechanics lab experiments, and mentoring students for competitive science examinations.',
    requirements: [
      'In-depth knowledge of UP Board 11th & 12th Physics syllabus',
      'Hands-on expertise in apparatus handling and practical lab demonstrations',
      'Strong Hindi & English bilingual communication skills',
    ],
  },
  {
    id: 'pgt-math',
    title: 'PGT Mathematics (Class 11 & 12)',
    department: 'science',
    deptLabel: 'Mathematics Department',
    type: 'Full Time &bull; Permanent',
    experience: '3+ Years Experience',
    qualification: 'M.Sc. (Mathematics) with B.Ed.',
    vacancies: 1,
    location: 'Campus, Shamsabad (Farrukhabad)',
    description:
      'Lead classroom instruction for Calculus, Vectors, 3D Geometry, and Probability for Intermediate Board examinations.',
    requirements: [
      'Proven track record of high student pass percentages in Board exams',
      'Ability to conduct problem-solving workshops and remedial tutoring',
    ],
  },
  {
    id: 'tgt-science',
    title: 'TGT General Science & Chemistry (Class 9 & 10)',
    department: 'science',
    deptLabel: 'High School Wing',
    type: 'Full Time',
    experience: '2+ Years Experience',
    qualification: 'B.Sc. (PCM/ZBC) / M.Sc. with B.Ed.',
    vacancies: 2,
    location: 'Campus, Shamsabad',
    description:
      'Teach foundational Physics, Chemistry, and Biology to High School students and organize the Annual Science Exhibition.',
    requirements: [
      'Passionate about hands-on experiential learning and model making',
      'Sound classroom discipline and continuous evaluation skills',
    ],
  },
  {
    id: 'pgt-hindi',
    title: 'PGT Hindi Sahitya & Sanskrit (Class 9 - 12)',
    department: 'humanities',
    deptLabel: 'Languages & Humanities',
    type: 'Full Time &bull; Permanent',
    experience: '4+ Years Teaching Experience',
    qualification: 'M.A. (Hindi Sahitya) with B.Ed. / M.Phil.',
    vacancies: 1,
    location: 'Campus, Shamsabad',
    description:
      'Deliver Hindi literature, poetry analysis, and grammar lessons while coordinating debate competitions and cultural literary assemblies.',
    requirements: [
      'Proficiency in Hindi classical literature and Sanskrit grammar',
      'Experience in directing school drama, elocution, and literary fests',
    ],
  },
  {
    id: 'prt-primary',
    title: 'PRT Mother Teacher / All Subjects (Primary Wing 1-5)',
    department: 'primary',
    deptLabel: 'Primary Education',
    type: 'Full Time',
    experience: '1-3 Years in reputed school',
    qualification: 'Graduation + D.El.Ed / B.Ed. (Early Childhood certified preferred)',
    vacancies: 3,
    location: 'Campus, Shamsabad',
    description:
      'Nurture foundational literacy, numeracy, and environmental awareness among young scholars with play-way methodology.',
    requirements: [
      'Patient, empathetic, and joyful teaching approach',
      'Skill in arts, crafts, and interactive storytelling',
    ],
  },
  {
    id: 'it-instructor',
    title: 'Computer Lab Instructor & IT Administrator',
    department: 'technology',
    deptLabel: 'Information Technology',
    type: 'Full Time',
    experience: '2+ Years in Lab Management / Networking',
    qualification: 'BCA / B.Sc. (CS) / B.Tech / DOEACC A-Level',
    vacancies: 1,
    location: 'Campus, Shamsabad',
    description:
      'Instruct Computer Applications classes, oversee 35+ networked workstation lab, manage ERP portals and campus Wi-Fi infrastructure.',
    requirements: [
      'Working knowledge of Python/C++, MS Office, and Linux/Windows OS',
      'Hardware troubleshooting, LAN setup, and biometric device maintenance',
    ],
  },
  {
    id: 'senior-accountant',
    title: 'Senior School Accountant & Bursar',
    department: 'admin',
    deptLabel: 'Administration & Finance',
    type: 'Full Time',
    experience: '4+ Years in Institutional Accounting',
    qualification: 'B.Com / M.Com with Tally Prime & Excel mastery',
    vacancies: 1,
    location: 'Campus, Shamsabad',
    description:
      'Manage daily student fee collections, bank reconciliations, staff payroll, PF/ESI compliance, and audit preparations.',
    requirements: [
      'High accuracy in bookkeeping, cash counter handling, and tally ledgers',
      'Proficiency with School ERP accounting modules',
    ],
  },
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [activeJob, setActiveJob] = useState<JobPosition | null>(null);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [appliedJobTitle, setAppliedJobTitle] = useState<string>('');
  const [applicationSuccess, setApplicationSuccess] = useState<string | null>(null);

  const [applicantForm, setApplicantForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: 'M.Sc. / B.Ed.',
    experienceYears: '3 Years',
    currentLocation: 'Farrukhabad, UP',
    coverNote: '',
  });

  const { toast } = useToast();

  const filteredJobs =
    selectedDept === 'all'
      ? jobOpenings
      : jobOpenings.filter((job) => job.department === selectedDept);

  const handleOpenApply = (job: JobPosition) => {
    setAppliedJobTitle(job.title);
    setShowApplyModal(true);
    setApplicationSuccess(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refNumber = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setApplicationSuccess(refNumber);
    toast.success(
      `Your application for ${appliedJobTitle} has been received (Ref: ${refNumber})!`,
      'Application Submitted'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Royal Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pb-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Careers &bull; शिक्षक एवं कर्मचारी भर्ती 2026-27</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Join Our Distinguished Faculty &amp; Staff
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Shape the future of young minds at Sarswati Gyan Mandir Intermediate College. We offer competitive remuneration, staff transport, research support, and an intellectually vibrant work environment.
          </p>
        </div>
      </section>

      {/* Floating Department Filter Tabs */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Openings (7)', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'science', label: 'Science & Math (3)', icon: <Award className="w-4 h-4" /> },
            { id: 'humanities', label: 'Languages & Arts (1)', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'primary', label: 'Primary Wing (1)', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'technology', label: 'IT & Labs (1)', icon: <Users className="w-4 h-4" /> },
            { id: 'admin', label: 'Accounts & Admin (1)', icon: <Building2 className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = selectedDept === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedDept(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#002060] text-amber-300 shadow-md shadow-blue-950/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Job Openings Grid & Institutional Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 w-full">
        {/* Vacancies Listing */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 font-serif">
                Current Openings ({filteredJobs.length} Positions Available)
              </h2>
              <p className="text-xs text-slate-500">
                Applications invited from qualified and dedicated educators for the upcoming academic session.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              ✓ Direct Walk-in &amp; Online Applications Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-5 group hover:border-[#002060]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        {job.deptLabel}
                      </span>
                      <h3 className="text-base font-black text-slate-900 font-serif mt-1.5 group-hover:text-blue-900 transition">
                        {job.title}
                      </h3>
                    </div>
                    <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-xl whitespace-nowrap border border-amber-200">
                      {job.vacancies} {job.vacancies > 1 ? 'Posts' : 'Post'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold text-[11px] truncate">{job.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="text-[11px] text-slate-600">{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-[11px]">{job.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <Button
                    size="sm"
                    className="flex-1 bg-[#002060] hover:bg-blue-900 font-bold text-xs"
                    onClick={() => handleOpenApply(job)}
                    leftIcon={<Send className="w-3.5 h-3.5 text-amber-400" />}
                  >
                    Apply For Position
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs font-bold"
                    onClick={() => setActiveJob(job)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Work With Us (Faculty Perks Grid) */}
        <div className="bg-gradient-to-br from-[#001845] to-[#002060] text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
              Faculty Welfare &amp; Growth
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif">
              Why Build Your Career At Sarswati Gyan Mandir?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              We value teacher empowerment, academic freedom, and holistic career progression.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Competitive Salary &amp; Perks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pay packages aligned with standard state scales, timely monthly bank disbursements, and performance-linked annual increments.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-400 text-slate-950 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Transport &amp; Quarters</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Free pickup/drop facility across Farrukhabad &amp; Shamsabad bus routes, plus residential quarters assistance for outstation teachers.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Professional Development</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sponsored participation in state teacher training summits, curriculum workshops, and modern digital pedagogical seminars.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400 text-slate-950 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">Supportive Work Culture</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Air-conditioned staff rooms, digital lesson planning workstations, cooperative leadership, and staff children tuition concessions.
              </p>
            </div>
          </div>
        </div>

        {/* Recruitment Helpdesk Box */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-black text-slate-900 font-serif">
              Have Specific Questions Regarding Recruitment?
            </h3>
            <p className="text-xs text-slate-500">
              Contact the Principal Secretariat or drop your CV directly at our administrative office.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:careers@sarswatigyanmandir.edu.in"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs hover:bg-blue-100 transition"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>careers@sarswatigyanmandir.edu.in</span>
            </a>
            <a
              href="tel:+919451234501"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs hover:bg-emerald-100 transition"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>+91 9451234501</span>
            </a>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {activeJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                POSITION OVERVIEW
              </span>
              <button
                onClick={() => setActiveJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {activeJob.deptLabel}
                </span>
                <h3 className="text-lg font-black text-slate-900 font-serif mt-1">
                  {activeJob.title}
                </h3>
                <p className="text-slate-500 text-[11px] font-mono mt-0.5">
                  Type: {activeJob.type} &bull; Vacancies: {activeJob.vacancies}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Job Description:</span>
                <p className="text-slate-600 leading-relaxed">{activeJob.description}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Required Qualifications &amp; Skills:</span>
                <ul className="space-y-1.5 pl-2">
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Academic Standing:</strong> {activeJob.qualification}</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Experience:</strong> {activeJob.experience}</span>
                  </li>
                  {activeJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                className="w-full bg-[#002060] hover:bg-blue-900 font-bold text-xs"
                onClick={() => {
                  const current = activeJob;
                  setActiveJob(null);
                  handleOpenApply(current);
                }}
                leftIcon={<Send className="w-4 h-4 text-amber-400" />}
              >
                Apply Online Now
              </Button>
              <Button variant="outline" onClick={() => setActiveJob(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Online Application Form Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                  ONLINE JOB APPLICATION
                </span>
                <h3 className="text-sm font-black text-slate-900 truncate">
                  {appliedJobTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {applicationSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-serif">
                  Application Received!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for applying. Your application dossier has been routed to the Selection Committee.
                </p>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-mono text-xs font-bold text-blue-900 inline-block">
                  Recruitment Reference: <span className="text-blue-700">{applicationSuccess}</span>
                </div>
                <div className="pt-2">
                  <Button onClick={() => setShowApplyModal(false)} className="bg-[#002060] font-bold">
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="overflow-y-auto flex-1 py-3 space-y-3.5 text-xs">
                <Input
                  label="Full Name of Candidate *"
                  required
                  placeholder="e.g. Dr. Ramesh Kumar"
                  value={applicantForm.fullName}
                  onChange={(e) => setApplicantForm({ ...applicantForm, fullName: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Mobile Number *"
                    required
                    placeholder="+91 9451234567"
                    value={applicantForm.phone}
                    onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                  />
                  <Input
                    label="Email Address *"
                    required
                    type="email"
                    placeholder="candidate@gmail.com"
                    value={applicantForm.email}
                    onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Highest Degree / B.Ed. *"
                    required
                    placeholder="e.g. M.Sc. (Physics), B.Ed."
                    value={applicantForm.qualification}
                    onChange={(e) => setApplicantForm({ ...applicantForm, qualification: e.target.value })}
                  />
                  <Input
                    label="Total Teaching Experience *"
                    required
                    placeholder="e.g. 4 Years"
                    value={applicantForm.experienceYears}
                    onChange={(e) => setApplicantForm({ ...applicantForm, experienceYears: e.target.value })}
                  />
                </div>

                <Input
                  label="Current City / Residence *"
                  required
                  placeholder="e.g. Shamsabad, Farrukhabad (UP)"
                  value={applicantForm.currentLocation}
                  onChange={(e) => setApplicantForm({ ...applicantForm, currentLocation: e.target.value })}
                />

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Resume / Brief Cover Profile</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly state your teaching achievements, board pass percentage track record, or subjects of interest..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={applicantForm.coverNote}
                    onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                  />
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-200">
                  <Button type="submit" className="w-full bg-[#002060] hover:bg-blue-900 font-bold" leftIcon={<Send className="w-4 h-4 text-amber-400" />}>
                    Submit Job Application
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowApplyModal(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}

