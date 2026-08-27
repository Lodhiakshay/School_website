'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Quote,
  Award,
  ShieldCheck,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Sparkles,
  UserCheck,
  CheckCircle2,
  HeartHandshake,
  Compass,
  ArrowRight,
  Stamp,
  Calendar,
  Building,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';
import { apiClient } from '../../lib/api-client';

export default function LeadershipDeskPage() {
  const [activeLeader, setActiveLeader] = useState('principal');
  const [schoolData, setSchoolData] = useState<any>(null);

  useEffect(() => {
    async function fetchDesk() {
      try {
        const res = await apiClient.get('/school/public-home');
        if (res.data?.data) {
          setSchoolData(res.data.data);
        }
      } catch {
        // Fallback retain
      }
    }
    fetchDesk();
  }, []);

  const principal = schoolData?.principalDesk;
  const headmistress = schoolData?.headmistressDesk;
  const manager = schoolData?.managerDesk;
  const director = schoolData?.directorDesk;

  const leaders = [
    {
      id: 'principal',
      role: "Principal's Desk",
      name: principal?.name || 'Dr. Ramesh Kumar Sharma',
      qualification: principal?.qualifications || 'Principal • M.Sc. (Physics), M.Ed., Ph.D.',
      experience: principal?.experience || '★ 25+ Years Academic Leadership',
      image: principal?.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      signatureUrl: principal?.signatureUrl || '/images/stamps/principal-signature.png',
      roundSealUrl: principal?.roundSealUrl || '/images/stamps/principal-round-seal.png',
      shloka: 'तमसो मा ज्योतिर्गमय — Lead us from ignorance unto the light of wisdom.',
      title: principal?.quote || 'Empowering Rural Youth with Modern Science, Moral Character & Board Excellence',
      paragraphs: principal?.message
        ? [principal.message]
        : [
            'It gives me immense pleasure and humility to welcome you all to Sarswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad. For over 25 years, our institution has stood steadfast as a temple of learning, character building, and academic excellence.',
            'We firmly believe that education is not merely the accumulation of facts and memorization for examinations. True education is the harmonious development of the mind, body, intellect, and moral spirit. In our campus, every child from Nursery to Class 12 receives personalized mentorship, state-of-the-art laboratory experimentation, and a moral compass that prepares them for modern life.',
            'Our faculty works relentlessly to ensure that students from rural Farrukhabad achieve top merit ranks in UP Board examinations, compete confidently in JEE/NEET, and step forward as responsible, compassionate citizens of our great nation.',
          ],
      designation: 'Principal, Sarswati Gyan Mandir Intermediate College',
      pillars: principal?.pillars || [
        { title: 'Board Toppers', desc: 'Consistent Top State & District Ranks' },
        { title: 'Modern Labs', desc: 'Physics, Chem, Bio & IT Practical Centers' },
        { title: 'Values & Sports', desc: 'Sanskar, Discipline & Physical Fitness' },
      ],
    },
    {
      id: 'sssd',
      role: "Headmistress (SSSD Wing)",
      name: headmistress?.name || 'Mrs. Ananya Sen',
      qualification: headmistress?.qualifications || 'Headmistress & Spoken English Lead • M.A. (English), B.Ed.',
      experience: headmistress?.experience || '★ 15+ Years English Pedagogy',
      image: headmistress?.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
      signatureUrl: headmistress?.signatureUrl || '/images/stamps/sssd-principal-signature.png',
      roundSealUrl: headmistress?.roundSealUrl || '/images/stamps/sssd-principal-round-seal.png',
      shloka: 'आ नो भद्राः क्रतवो यन्तु विश्वतः — Let noble thoughts come to us from every side.',
      title: headmistress?.quote || 'Fostering Eloquent Expression, Critical Thinking & Global English Confidence',
      paragraphs: headmistress?.message
        ? [headmistress.message]
        : [
            'At SSSD Public School, our primary commitment is to create a dynamic, 100% English medium learning atmosphere where students speak fluent English with natural poise and confidence.',
            'With CBSE pattern curriculum, digital smart boards, and phonics labs, our young scholars develop global competencies while staying deeply rooted in Indian cultural sanskars.',
            'We emphasize interactive group discussions, storytelling, abacus arithmetic, and public speaking right from the foundational kindergarten stage.',
          ],
      designation: 'Headmistress, SSSD Public School (100% English Medium Wing)',
      pillars: [
        { title: '100% English', desc: 'Natural Spoken English Confidence & Phonics' },
        { title: 'Smart Classes', desc: 'Audio-Visual Activity Based Learning' },
        { title: 'Vedic Sanskar', desc: 'Cultural Values & Ethical Foundations' },
      ],
    },
    {
      id: 'manager',
      role: "Manager's Desk",
      name: manager?.name || 'Shri Ram Prakash Verma',
      qualification: manager?.qualifications || 'Manager & Trustee • M.A., LL.B., Veteran Social Reformer',
      experience: manager?.experience || 'Founder & Managing Trustee (Est. 1999)',
      image: manager?.photoUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      signatureUrl: manager?.signatureUrl || '/images/stamps/principal-signature.png',
      roundSealUrl: manager?.roundSealUrl || '/images/stamps/principal-round-seal.png',
      shloka: 'विद्या ददाति विनयं विनयाद् याति पात्रताम् — Knowledge bestows humility, and humility brings worthiness.',
      title: manager?.quote || 'Institutional Foundation & Commitment to Transparent Rural Education',
      paragraphs: manager?.message
        ? [manager.message]
        : [
            'When we laid the foundation stone of Sarswati Gyan Mandir in 1999, our primary aspiration was to bring world-class English & Hindi bilingual education, modern science infrastructure, and patriotic Indian values to the heart of Shamsabad and surrounding villages in Farrukhabad district.',
            'Over the last two decades, it has been our management’s unwavering pledge to provide affordable, transparent, and high-standard schooling without compromising on digital facilities, laboratory apparatus, or qualified faculty.',
          ],
      designation: 'Manager & President, SGM Educational Trust',
      pillars: [
        { title: 'Affordable Fees', desc: 'Accessible Quality Education for All' },
        { title: 'Safe Transport', desc: 'GPS-Tracked Fleet Covering 28+ km' },
        { title: 'Campus Security', desc: '100% CCTV Monitored Gated Campus' },
      ],
    },
    {
      id: 'director',
      role: "Academic Director's Desk",
      name: director?.name || 'Shri Dinesh Gupta',
      qualification: director?.qualifications || 'Academic Director • M.Sc. (Mathematics), B.Ed.',
      experience: director?.experience || '20+ Years in Curriculum & Board Evaluation',
      image: director?.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      signatureUrl: director?.signatureUrl || '/images/stamps/principal-signature.png',
      shloka: 'सा विद्या या विमुक्तये — That is true knowledge which liberates the mind from fear and confusion.',
      title: director?.quote || 'Board Examination Mastery & Analytical Pedagogy',
      paragraphs: director?.message
        ? [director.message]
        : [
            'Our teaching pedagogy at Saraswati Gyan Mandir blends traditional conceptual clarity with modern scientific problem-solving techniques. In Mathematics and Science, we emphasize derivation from first principles rather than rote memorization.',
            'Through our regular Chapter-wise Unit Tests, OMR mock test series, and personalized doubt sessions, our students consistently achieve 90%+ marks and top district ranks in UP Board High School and Intermediate examinations.',
          ],
      designation: 'Academic Director & Head of Mathematics',
      pillars: [
        { title: 'Zero Rote Learning', desc: 'Concept Derivation from First Principles' },
        { title: 'Mock Test Series', desc: 'Weekly UP Board Simulated OMR Exams' },
        { title: 'Remedial Support', desc: 'Individual Doubt Clearing Benches' },
      ],
    },
  ];

  const currentLeader = leaders.find((l) => l.id === activeLeader) || leaders[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pb-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Institutional Vision &bull; नेतृत्व संदेश</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Leadership Desks &amp; Messages
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Read inspiring messages, educational philosophies, and pedagogical visions from our Principal, Headmistress, Management Board, and Academic Directors.
          </p>
        </div>
      </section>

      {/* Floating Leader Switcher Tabs */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full overflow-hidden">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full">
          {leaders.map((leader) => {
            const isActive = activeLeader === leader.id;
            return (
              <button
                key={leader.id}
                onClick={() => setActiveLeader(leader.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#002060] text-white shadow-md scale-100 ring-2 ring-blue-400/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-serif text-xs font-black ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {leader.name[0]}
                </div>
                <div className="text-left">
                  <div className="font-extrabold leading-tight">{leader.role}</div>
                  <div className={`text-[10px] hidden sm:block ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                    {leader.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Leader Message Card */}
      {currentLeader && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-12 animate-in fade-in zoom-in-95 duration-200">
            {/* Left Column: Portrait, Credentials, Signature & Round Seal Stamp */}
            <div className="lg:col-span-4 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-8 lg:pb-0 lg:pr-8">
              <div className="relative aspect-[3/4] w-48 sm:w-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200 bg-slate-950 flex-shrink-0">
                <img
                  src={currentLeader.image}
                  alt={currentLeader.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-3 pt-6 text-center">
                  <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                    {currentLeader.experience}
                  </span>
                </div>
              </div>

              <div className="space-y-1 w-full">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 font-serif">
                  {currentLeader.name}
                </h2>
                <p className="text-xs font-bold text-blue-700">{currentLeader.qualification}</p>
                <p className="text-[11px] text-slate-500 font-medium">{currentLeader.designation}</p>
              </div>

              {/* Verified Stamps & Signatures */}
              <div className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-around gap-2">
                {currentLeader.signatureUrl && (
                  <div className="text-center space-y-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Digital Signature</span>
                    <div className="h-10 flex items-center justify-center">
                      <img
                        src={currentLeader.signatureUrl}
                        alt="Signature"
                        className="max-h-9 max-w-[110px] object-contain filter contrast-125"
                      />
                    </div>
                  </div>
                )}

                {currentLeader.roundSealUrl && (
                  <div className="text-center space-y-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Official Seal</span>
                    <div className="h-10 flex items-center justify-center">
                      <img
                        src={currentLeader.roundSealUrl}
                        alt="Round Seal Muhar"
                        className="max-h-9 max-w-[50px] object-contain opacity-85"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-2 pt-2">
                <Link href="/admissions" className="block w-full">
                  <Button className="w-full bg-[#002060] hover:bg-blue-900 text-white font-bold" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Apply for Admission 2026-27
                  </Button>
                </Link>
                <Link href="/contact" className="block w-full">
                  <Button variant="outline" className="w-full text-xs" size="sm">
                    Schedule Counseling Visit
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Vedic Shloka, Vision Quote & Detailed Message */}
            <div className="lg:col-span-8 space-y-6">
              {/* Vedic Shloka Header */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Vedic Guiding Shloka &bull; सूक्ति
                </div>
                <p className="text-xs sm:text-sm font-black text-amber-950 font-serif italic">
                  &ldquo;{currentLeader.shloka}&rdquo;
                </p>
              </div>

              {/* Vision Headline */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-serif leading-snug">
                  {currentLeader.title}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full"></div>
              </div>

              {/* Narrative Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {currentLeader.paragraphs.map((p: string, pIdx: number) => (
                  <div
                    key={pIdx}
                    className="text-justify sm:text-left leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              </div>

              {/* Core Pillars */}
              {currentLeader.pillars && currentLeader.pillars.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Institutional Pillars &amp; Commitments
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentLeader.pillars.map((pil: any, pilIdx: number) => (
                      <div
                        key={pilIdx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
                      >
                        <span className="font-black text-slate-900 text-xs block font-serif">{pil.title}</span>
                        <span className="text-[11px] text-slate-500 block leading-tight">{pil.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <PublicFooter />
    </div>
  );
}
