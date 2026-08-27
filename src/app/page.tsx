'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Building2,
  Calendar,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Users,
  MapPin,
  Quote,
  Languages,
  ExternalLink,
  Video,
  Play,
  X,
  Youtube,
  Film,
  FileVideo,
} from 'lucide-react';
import { PublicNavbar } from '../components/public/public-navbar';
import { PublicFooter } from '../components/public/public-footer';
import { InfiniteCampusCarousel } from '../components/public/infinite-campus-carousel';
import { UniversalVideoModal } from '../components/public/universal-video-modal';
import { apiClient } from '../lib/api-client';
import { getVideoPlayerInfo, getVideoType, extractYouTubeId, getYouTubeThumbnail } from '../lib/video-utils';

const fallbackHomeData = {
  ticker: {
    text: 'Admissions Open for Session 2026-2027 (Nursery to Class 12 PCM/PCB/Arts)',
    url: '/admissions',
    badge: 'NEW ANNOUNCEMENT',
    isActive: true,
  },
  hero: {
    badge: {
      text: 'Premier Intermediate College in Shamsabad, Farrukhabad (UP)',
      isActive: true,
    },
    titleHindi: 'सरस्वती ज्ञान मन्दिर',
    titleEnglish: 'Sarswati Gyan Mandir',
    subtitle: 'Nurturing Character, Culture & Academic Excellence',
    description:
      'Affiliated with the UP State Board of High School and Intermediate Education. We provide state-of-the-art laboratory infrastructure, holistic values, disciplined learning, and complete digital portal management for students from Nursery to Class 12.',
    bgImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80',
    primaryBtn: {
      text: 'Apply Online 2026-27',
      url: '/admissions',
      isActive: true,
      isExternal: false,
    },
    secondaryBtn: {
      text: 'Central ERP Portal',
      url: '/login',
      isActive: true,
    },
    quickAdmissionWidget: {
      title: 'ONLINE ADMISSIONS 2026-27',
      subtitle: 'Nursery to Class 12 (Science / Arts)',
      description: 'Admissions open for academic session 2026-27. Submit an online inquiry for instant counseling.',
      buttonText: 'SUBMIT ADMISSION INQUIRY',
      buttonUrl: '/admissions',
      isActive: true,
      benefits: [
        { text: 'High School Board Batches', isActive: true },
        { text: 'Class 11 PCM / PCB / Arts', isActive: true },
        { text: 'Digital Lab Facilities', isActive: true },
        { text: 'School Bus Routes', isActive: true },
      ],
    },
  },
  stats: [
    { value: '1,250+', label: 'Enrolled Scholars', iconKey: 'Users', isActive: true },
    { value: '42+', label: 'Expert Faculty', iconKey: 'GraduationCap', isActive: true },
    { value: '99.4%', label: 'Board Pass Rate', iconKey: 'Award', isActive: true },
    { value: '25+ Yrs', label: 'Academic Legacy', iconKey: 'Building2', isActive: true },
  ],
  academicWings: [
    {
      title: 'Pre-Primary & Primary Wing',
      grades: 'Nursery to Class 5',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
      desc: 'Foundational literacy, phonics, joyful arithmetic, creative arts, and moral grounding in a caring environment.',
      slug: 'primary',
      isActive: true,
    },
    {
      title: 'Middle School Wing',
      grades: 'Class 6 to Class 8',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
      desc: 'Scientific exploration, digital literacy, languages (Hindi, English, Sanskrit), and strong mathematics fundamentals.',
      slug: 'middle',
      isActive: true,
    },
    {
      title: 'High School (UP Board)',
      grades: 'Class 9 & Class 10',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      desc: 'Rigorous state board curriculum, NCERT mastery, comprehensive laboratory experiments, and board mock series.',
      slug: 'high-school',
      isActive: true,
    },
    {
      title: 'Intermediate College Wing',
      grades: 'Class 11 & Class 12',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      desc: 'Specialized Science (PCM/PCB) & Humanities streams with state board preparation and competitive examination guidance.',
      slug: 'intermediate',
      isActive: true,
    },
  ],
  facilities: [
    {
      title: 'Physics & Chemistry Labs',
      desc: 'Equipped with modern apparatus, optical benches, reagents, and certified safety setups.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      isActive: true,
    },
    {
      title: 'Digital Computer Center',
      desc: 'Air-conditioned lab with 40+ connected workstations and coding modules.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
      isActive: true,
    },
    {
      title: 'Central Knowledge Library',
      desc: 'Extensive repository of 5,000+ reference volumes, encyclopedias, and regional literature.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      isActive: true,
    },
    {
      title: 'Dedicated Transport Fleet',
      desc: 'GPS-tracked school buses covering Shamsabad, Farrukhabad, and surrounding rural routes.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      isActive: true,
    },
  ],
  principalDesk: {
    name: 'Dr. Ramesh Kumar Sharma',
    qualifications: 'Principal • M.Sc., M.Ed., Ph.D.',
    experience: '★ 25+ Years Academic Leadership',
    quote: 'Empowering Rural Youth with Modern Science, Moral Character & Board Excellence',
    message:
      'At Saraswati Gyan Mandir and our English-medium wing SSSD Public School, education is not merely the transmission of syllabus — it is the ignite of intellect, character building, cultural ethos, and competitive spirit. We are dedicated to providing students of Shamsabad and Farrukhabad with world-class facilities and nurturing mentorship.',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85',
    signatureUrl: '/images/stamps/principal-signature.png',
    roundSealUrl: '/images/stamps/principal-round-seal.png',
    isActive: true,
    pillars: [
      { title: 'Board Toppers', desc: 'Consistent Top State & District Ranks', iconKey: 'GraduationCap', isActive: true },
      { title: 'Modern Labs', desc: 'Physics, Chem, Bio & IT Practical Centers', iconKey: 'Sparkles', isActive: true },
      { title: 'Values & Sports', desc: 'Sanskar, Discipline & Physical Fitness', iconKey: 'Award', isActive: true },
    ],
  },
  sssdShowcase: {
    title: 'SSSD Public School',
    subtitle: 'SHAMSABAD • FARRUKHABAD (100% ENGLISH MEDIUM)',
    description:
      'Seeking a dedicated 100% English Medium learning environment with CBSE pattern curriculum, digital smart boards, and phonics labs? Discover our premier English-medium campus located right here in Shamsabad, Farrukhabad.',
    badge: '100% English Medium Wing • CBSE Pattern',
    logoUrl: '/images/sssd-logo.png',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    admissionUrl: '/sssd',
    whatsappNumber: '+919451234567',
    isActive: true,
    highlights: [
      { title: 'Nursery to 10th', subtitle: 'Co-Ed Schooling', isActive: true },
      { title: '100% English', subtitle: 'Spoken & Phonics', isActive: true },
      { title: 'Smart STEM Labs', subtitle: 'GPS Bus Fleet', isActive: true },
    ],
  },
  videoTestimonialsSection: {
    title: 'Real Stories, Authentic Voices',
    subtitle: 'PARENT & STUDENT EXPERIENCES',
    badge: 'Video Testimonials • Community Trust',
    description:
      'Hear directly from our parents, successful alumni, and board rankers about how Sarswati Gyan Mandir transforms lives through disciplined academics, holistic values, and personalized mentorship.',
    isActive: true,
    testimonials: [
      {
        title: 'From Village to Top Engineering College: A Parent’s Proud Journey',
        speakerName: 'Dr. Ramesh Chandra Mishra',
        speakerRole: 'Parent of Class 12 Science Topper',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
        quote: 'The dedicated faculty and daily doubt counters helped my son score 96.4% in UP Board Intermediate exams.',
        badge: 'Parent Experience',
        order: 1,
        isActive: true,
      },
      {
        title: 'Why We Chose SSSD English Medium Wing for Early Childhood',
        speakerName: 'Smt. Kavita Sharma',
        speakerRole: 'Parent of Class 3 Student',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
        quote: 'Interactive 3D digital classrooms and phonics audio labs gave our daughter flawless English fluency.',
        badge: 'SSSD Parent Review',
        order: 2,
        isActive: true,
      },
      {
        title: 'Alumni Journey: Board Preparation & Discipline That Shaped My Career',
        speakerName: 'Er. Aman Tripathi',
        speakerRole: 'Alumni Batch 2021 • Software Engineer',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        quote: 'The moral sanskar and scientific rigor instilled by our teachers remains my greatest strength.',
        badge: 'Alumni Success',
        order: 3,
        isActive: true,
      },
    ],
  },
  campusCarousel: [] as any[],
  affiliationCode: 'UP-FBD-2026-SGM-089',
  addressString: 'Shamsabad, Farrukhabad (PIN: 209503)',
};

const renderStatIcon = (iconKey?: string) => {
  switch (iconKey) {
    case 'Users':
      return <Users className="w-5 h-5 text-blue-600" />;
    case 'GraduationCap':
      return <GraduationCap className="w-5 h-5 text-emerald-600" />;
    case 'Award':
      return <Award className="w-5 h-5 text-amber-600" />;
    case 'Building2':
      return <Building2 className="w-5 h-5 text-indigo-600" />;
    default:
      return <Sparkles className="w-5 h-5 text-blue-600" />;
  }
};

export default function HomePage() {
  const [data, setData] = useState(fallbackHomeData);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [res, noticesRes] = await Promise.allSettled([
          apiClient.get('/school/public-home'),
          apiClient.get('/notices/public'),
        ]);

        let liveTickerText = '';
        if (noticesRes.status === 'fulfilled' && noticesRes.value.data?.data?.length) {
          liveTickerText = noticesRes.value.data.data
            .slice(0, 3)
            .map((n: any) => n.title)
            .join(' • ');
        }

        if (res.status === 'fulfilled' && res.value.data?.data) {
          const fetched = res.value.data.data;
          setData({
            ticker: {
              ...fallbackHomeData.ticker,
              ...(fetched.ticker || {}),
              text: liveTickerText || fetched.ticker?.text || fallbackHomeData.ticker.text,
            },
            hero: {
              ...fallbackHomeData.hero,
              ...(fetched.hero || {}),
              badge: {
                text:
                  typeof fetched.hero?.badge === 'string'
                    ? fetched.hero.badge
                    : fetched.hero?.badge?.text || fallbackHomeData.hero.badge.text,
                isActive:
                  typeof fetched.hero?.badge === 'object' && fetched.hero.badge.isActive !== undefined
                    ? fetched.hero.badge.isActive
                    : true,
              },
              titleHindi:
                fetched.nameHindi && !fetched.nameHindi.includes('?')
                  ? fetched.nameHindi
                  : fetched.hero?.titleHindi && !fetched.hero?.titleHindi.includes('?')
                  ? fetched.hero.titleHindi
                  : fallbackHomeData.hero.titleHindi,
              titleEnglish: fetched.name || fetched.hero?.titleEnglish || fallbackHomeData.hero.titleEnglish,
              subtitle: fetched.hero?.subtitle || fallbackHomeData.hero.subtitle,
              description: fetched.hero?.description || fallbackHomeData.hero.description,
              primaryBtn: {
                ...fallbackHomeData.hero.primaryBtn,
                ...(fetched.hero?.primaryBtn || {}),
              },
              secondaryBtn: {
                ...fallbackHomeData.hero.secondaryBtn,
                ...(fetched.hero?.secondaryBtn || {}),
              },
              quickAdmissionWidget: {
                ...fallbackHomeData.hero.quickAdmissionWidget,
                ...(fetched.hero?.quickAdmissionWidget || {}),
                benefits:
                  Array.isArray(fetched.hero?.quickAdmissionWidget?.benefits) &&
                  fetched.hero.quickAdmissionWidget.benefits.length > 0
                    ? fetched.hero.quickAdmissionWidget.benefits
                    : fallbackHomeData.hero.quickAdmissionWidget.benefits,
              },
            },
            stats: fetched.stats?.length ? fetched.stats : fallbackHomeData.stats,
            academicWings: fetched.academicWings?.length ? fetched.academicWings : fallbackHomeData.academicWings,
            facilities: fetched.facilities?.length ? fetched.facilities : fallbackHomeData.facilities,
            principalDesk: {
              ...fallbackHomeData.principalDesk,
              ...(fetched.principalDesk || {}),
              name: fetched.principal?.name || fetched.principalDesk?.name || fallbackHomeData.principalDesk.name,
              qualifications:
                fetched.principal?.qualifications ||
                fetched.principalDesk?.qualifications ||
                fallbackHomeData.principalDesk.qualifications,
              quote: fetched.principalDesk?.quote || fallbackHomeData.principalDesk.quote,
              message: fetched.principalDesk?.message || fallbackHomeData.principalDesk.message,
              experience: fetched.principalDesk?.experience || fallbackHomeData.principalDesk.experience,
              photoUrl: fetched.principalDesk?.photoUrl || fallbackHomeData.principalDesk.photoUrl,
              signatureUrl:
                fetched.principal?.signatureUrl ||
                fetched.principalDesk?.signatureUrl ||
                fallbackHomeData.principalDesk.signatureUrl,
              roundSealUrl:
                fetched.principalDesk?.roundSealUrl ||
                fallbackHomeData.principalDesk.roundSealUrl,
              pillars: fetched.principalDesk?.pillars?.length
                ? fetched.principalDesk.pillars
                : fallbackHomeData.principalDesk.pillars,
            },
            sssdShowcase: {
              ...fallbackHomeData.sssdShowcase,
              ...(fetched.sssdShowcase || {}),
              highlights: fetched.sssdShowcase?.highlights?.length
                ? fetched.sssdShowcase.highlights
                : fallbackHomeData.sssdShowcase.highlights,
            },
            videoTestimonialsSection: {
              ...fallbackHomeData.videoTestimonialsSection,
              ...(fetched.videoTestimonialsSection || {}),
              testimonials: fetched.videoTestimonialsSection?.testimonials?.length
                ? fetched.videoTestimonialsSection.testimonials
                : fallbackHomeData.videoTestimonialsSection.testimonials,
            },
            campusCarousel: fetched.campusCarousel || [],
            affiliationCode: fetched.affiliationCode || fallbackHomeData.affiliationCode,
            addressString: fetched.address?.city
              ? `${fetched.address.city}, ${fetched.address.district} (PIN: ${fetched.address.pincode})`
              : fallbackHomeData.addressString,
          });
        }
      } catch (err) {
        // Retain resilient fallback seamlessly
      }
    }
    fetchHomeData();
  }, []);

  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeStats = data.stats.filter((s) => s.isActive !== false);
  const activeWings = data.academicWings.filter((w) => w.isActive !== false);
  const activeFacilities = data.facilities.filter((f) => f.isActive !== false);
  const activePillars = data.principalDesk.pillars?.filter((p) => p.isActive !== false) || [];
  const activeHighlights = data.sssdShowcase.highlights?.filter((h) => h.isActive !== false) || [];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <PublicNavbar />

      {/* Hero Banner */}
      <section className="relative bg-slate-950 text-white pt-4 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Background Image with Deep Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('${data.hero.bgImageUrl}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Badge (Conditional) */}
              {data.hero.badge?.isActive !== false && data.hero.badge?.text && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{data.hero.badge.text}</span>
                </div>
              )}

              {/* Title */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif leading-tight">
                  {data.hero.titleHindi}
                </h1>
                <p className="text-base sm:text-2xl font-black text-blue-400 tracking-tight font-serif">
                  {data.hero.subtitle}
                </p>
              </div>

              {/* Description */}
              <div
                className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium"
                dangerouslySetInnerHTML={{ __html: data.hero.description }}
              />

              {/* Action Buttons (Full Dynamic Control) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto">
                {data.hero.primaryBtn?.isActive !== false && (
                  <Link
                    href={data.hero.primaryBtn.url || '/admissions'}
                    target={data.hero.primaryBtn.isExternal ? '_blank' : undefined}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5"
                  >
                    <span>{data.hero.primaryBtn.text || 'Apply Online 2026-27'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {data.hero.secondaryBtn?.isActive !== false && (
                  <Link
                    href={data.hero.secondaryBtn.url || '/login'}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-white hover:bg-slate-800 text-xs sm:text-sm font-bold transition"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span>{data.hero.secondaryBtn.text || 'Central ERP Portal'}</span>
                  </Link>
                )}
              </div>

              {/* Institutional Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 text-[11px] sm:text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Code: {data.affiliationCode}
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 text-[11px] sm:text-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {data.addressString}
                </span>
              </div>
            </div>

            {/* Quick Admission Inquiry Widget (Conditional on Active Toggle) */}
            {data.hero.quickAdmissionWidget?.isActive !== false && (
              <div className="lg:col-span-5 bg-slate-900/95 border-2 border-blue-600/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-md flex-shrink-0">
                      <img src="/logo.png" alt="SGM" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-serif">
                        {data.hero.quickAdmissionWidget.title || 'ONLINE ADMISSIONS 2026-27'}
                      </h3>
                      <p className="text-[10px] text-amber-400 font-bold">{data.hero.quickAdmissionWidget.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div
                    className="leading-relaxed text-[11px]"
                    dangerouslySetInnerHTML={{ __html: data.hero.quickAdmissionWidget.description }}
                  />
                  {data.hero.quickAdmissionWidget.benefits?.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {data.hero.quickAdmissionWidget.benefits
                        .filter((b: any) => b.isActive !== false)
                        .map((benefit: any, bIdx: number) => (
                          <div
                            key={bIdx}
                            className="p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-[10px] font-bold text-slate-200 flex items-center gap-1.5 shadow-sm"
                          >
                            <span className="text-emerald-400 font-black flex-shrink-0">✓</span>
                            <span className="truncate">{typeof benefit === 'string' ? benefit : benefit.text}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <Link
                  href={data.hero.quickAdmissionWidget.buttonUrl || '/admissions'}
                  className="block w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-center font-black text-white text-xs shadow-lg shadow-blue-600/30 transition uppercase tracking-wider"
                >
                  {data.hero.quickAdmissionWidget.buttonText || 'SUBMIT ADMISSION INQUIRY'} &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Counter Ribbon (Conditional on Active Items) */}
      {activeStats.length > 0 && (
        <section className="py-6 sm:py-8 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {activeStats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5 hover:shadow-md transition"
              >
                <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200 flex-shrink-0">
                  {renderStatIcon(s.iconKey)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base sm:text-xl font-black text-slate-900 leading-tight truncate">
                    {s.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-500 leading-tight truncate">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Academic Wings (Conditional on Active Items) */}
      {activeWings.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
                Academic Curricula
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
                Comprehensive Educational Wings
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Structured developmental pathways mapped to the UP State Board guidelines from primary to intermediate level.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeWings.map((w, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 w-full relative overflow-hidden">
                      <img
                        src={w.image}
                        alt={w.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                        {w.grades}
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-black text-slate-900 font-serif group-hover:text-blue-600 transition">
                        {w.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {w.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href="/academics"
                      className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform"
                    >
                      <span>View Curriculum</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities & Infrastructure (Conditional on Active Items) */}
      {activeFacilities.length > 0 && (
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                Campus Infrastructure
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
                World-Class Facilities &amp; Laboratories
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Designed to foster practical scientific inquiry, digital literacy, and holistic sports development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeFacilities.map((f, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition p-4 space-y-4"
                >
                  <div className="h-40 rounded-2xl overflow-hidden relative">
                    <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900 font-serif">{f.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SSSD Public School (English Medium) Showcase (Conditional on Active Toggle) */}
      {data.sssdShowcase?.isActive !== false && (
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 rounded-3xl p-6 sm:p-12 text-white border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="lg:col-span-8 space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{data.sssdShowcase.badge}</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-xl flex-shrink-0">
                    <img
                      src={data.sssdShowcase.logoUrl}
                      alt="SSSD Public School Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black font-serif text-white leading-tight">
                      {data.sssdShowcase.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-amber-300 font-extrabold uppercase tracking-wider">
                      {data.sssdShowcase.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl"
                  dangerouslySetInnerHTML={{ __html: data.sssdShowcase.description }}
                />

                {activeHighlights.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    {activeHighlights.map((h, hIdx) => (
                      <div key={hIdx} className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-0.5">
                        <span className="font-bold text-amber-300 block">{h.title}</span>
                        <span className="text-[11px] text-slate-300">{h.subtitle}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link
                    href={data.sssdShowcase.admissionUrl || '/sssd'}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition active:scale-95"
                  >
                    <span>Explore SSSD Public School Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/sssd"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/15 text-xs font-bold transition"
                  >
                    <span>Online Admission 2026</span>
                  </Link>
                </div>
              </div>

              {/* Right Card / Visual */}
              <div className="lg:col-span-4 relative z-10">
                <div className="bg-slate-900/95 rounded-3xl p-5 sm:p-6 border border-emerald-500/40 shadow-2xl space-y-4 text-center overflow-hidden relative group">
                  <div className="h-44 sm:h-48 w-full rounded-2xl overflow-hidden relative shadow-inner border border-white/10">
                    <img
                      src={data.sssdShowcase.imageUrl}
                      alt="SSSD Public School Smart Classroom"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md font-mono">
                      100% English Medium
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <h3 className="font-serif font-black text-sm text-white drop-shadow">SSSD Public School</h3>
                      <p className="text-[10px] text-emerald-300 font-bold uppercase">Shamsabad, Farrukhabad</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-left bg-white/5 p-3 rounded-xl border border-white/10 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                      <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>CBSE Pattern &bull; Smart Phonics Labs</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Co-Educational Schooling with modern digital classrooms.</p>
                  </div>

                  <Link
                    href={data.sssdShowcase.admissionUrl || '/sssd'}
                    className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition"
                  >
                    Visit SSSD Campus Portal &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Principal Desk Leadership Showcase (Conditional on Active Toggle) */}
      {data.principalDesk?.isActive !== false && (
        <section className="py-20 bg-slate-100/60 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#001740] via-[#002060] to-[#021029] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden border-2 border-amber-400/50">
              {/* Background Glows & Watermark Seal */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 right-4 w-64 h-64 opacity-5 pointer-events-none">
                <img src={data.principalDesk.roundSealUrl || '/images/stamps/principal-round-seal.png'} alt="Watermark Seal" className="w-full h-full object-contain" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Left Column: Hero Portrait & Leadership Credentials */}
                <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                  <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-full h-64 sm:h-80 md:h-[370px] rounded-3xl overflow-hidden border-4 border-amber-400/90 shadow-2xl shadow-amber-500/20 bg-slate-900 group">
                    <img
                      src={data.principalDesk.photoUrl}
                      alt={data.principalDesk.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    
                    {/* Floating Experience Badge */}
                    <div className="absolute top-3 left-3 bg-amber-400 text-blue-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 font-mono">
                      <span>{data.principalDesk.experience}</span>
                    </div>

                    {/* Nameplate inside photo bottom */}
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <h4 className="font-serif font-black text-lg sm:text-xl text-white drop-shadow-md">
                        {data.principalDesk.name}
                      </h4>
                      <p className="text-xs text-amber-300 font-bold drop-shadow">
                        {data.principalDesk.qualifications}
                      </p>
                      <p className="text-[10px] text-slate-300 font-mono mt-0.5">
                        Sarswati Gyan Mandir &amp; SSSD Group
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Vision, 3 Pillars, and Message Excerpt */}
                <div className="md:col-span-7 space-y-5">
                  {/* Header Tag */}
                  <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-black uppercase px-3.5 py-1.5 rounded-full border border-amber-400/40">
                    <Quote className="w-3.5 h-3.5 text-amber-300" />
                    <span>From The Principal&apos;s Desk</span>
                  </div>

                  {/* Main Quote Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif text-white leading-snug">
                    &ldquo;{data.principalDesk.quote}&rdquo;
                  </h3>

                  <div
                    className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal"
                    dangerouslySetInnerHTML={{ __html: data.principalDesk.message }}
                  />

                  {/* 3 Pillars Bento Grid (Conditional) */}
                  {activePillars.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {activePillars.map((pillar, pIdx) => (
                        <div key={pIdx} className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
                          <div className="text-amber-300 text-xs font-black">
                            {pillar.iconKey === 'GraduationCap' ? '🎓' : pillar.iconKey === 'Sparkles' ? '🔬' : '🕉️'} {pillar.title}
                          </div>
                          <div className="text-[11px] text-slate-300">{pillar.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action & Stamped Signature */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/15">
                    <Link
                      href="/desk"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black text-xs shadow-lg shadow-amber-400/20 transition-all active:scale-95 group"
                    >
                      <span>Read Full Welcome Letter from Desk</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {data.principalDesk.signatureUrl && (
                      <div className="bg-white/90 p-1.5 px-3 rounded-xl border border-amber-300/60 flex items-center gap-2 self-start sm:self-auto shadow-md">
                        <img
                          src={data.principalDesk.signatureUrl}
                          alt="Principal Signature"
                          className="h-9 w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Real Voices, Real Stories: Parent & Student Video Testimonials (Conditional on Active Toggle) */}
      {data.videoTestimonialsSection?.isActive !== false && (
        <section className="py-20 bg-gradient-to-b from-slate-900 via-[#01142f] to-slate-950 text-white relative overflow-hidden border-y border-amber-500/20">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-400/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                <Youtube className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>{data.videoTestimonialsSection.badge || 'Video Testimonials • Community Trust'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight">
                {data.videoTestimonialsSection.title || 'Real Stories, Authentic Voices'}
              </h2>
              <p className="text-xs sm:text-sm text-amber-300 font-extrabold uppercase tracking-widest">
                {data.videoTestimonialsSection.subtitle || 'PARENT & STUDENT EXPERIENCES'}
              </p>
              <div
                className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal pt-1"
                dangerouslySetInnerHTML={{
                  __html: data.videoTestimonialsSection.description || '',
                }}
              />
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {(data.videoTestimonialsSection.testimonials || [])
                .filter((t: any) => t.isActive !== false)
                .map((test: any, idx: number) => {
                  const url = test.videoUrl || test.youtubeUrl || '';
                  const playerInfo = getVideoPlayerInfo(url, test.thumbnailUrl, false);
                  const videoType = getVideoType(url);

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveVideo(test)}
                      className="group bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/60 shadow-xl hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      {/* Video Poster Thumbnail & Play Button */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                        <img
                          src={playerInfo.posterUrl}
                          alt={test.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Pulsing Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-300 border-2 border-white/40 ring-4 ring-rose-500/30">
                            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                            {test.badge || 'Testimonial'}
                          </span>
                        </div>

                        {/* Format Brand Chip */}
                        <div className="absolute top-3 right-3">
                          {videoType === 'youtube' ? (
                            <span className="text-[10px] font-black uppercase text-white bg-rose-600/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow backdrop-blur-md">
                              <Youtube className="w-3 h-3 fill-white" /> YouTube
                            </span>
                          ) : videoType === 'vimeo' ? (
                            <span className="text-[10px] font-black uppercase text-white bg-sky-600/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow backdrop-blur-md">
                              <Film className="w-3 h-3 fill-white" /> Vimeo
                            </span>
                          ) : (
                            <span className="text-[10px] font-black uppercase text-white bg-indigo-600/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow backdrop-blur-md">
                              <FileVideo className="w-3 h-3" /> Video Story
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Content & Quotes */}
                      <div className="p-5 sm:p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-serif font-black text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug">
                            {test.title}
                          </h3>
                          {test.quote && (
                            <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                              &ldquo;{test.quote}&rdquo;
                            </p>
                          )}
                        </div>

                        {/* Speaker Information */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                          <div>
                            <h4 className="text-xs font-black text-amber-300 font-sans">
                              {test.speakerName}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium">{test.speakerRole}</p>
                          </div>
                          <span className="text-[10px] font-bold text-rose-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            Play Video &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Universal Interactive Video Modal Player (YouTube, Vimeo, MP4, Cloudinary) */}
      <UniversalVideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* 360° Infinite Interactive Campus Showcase */}
      <InfiniteCampusCarousel items={data.campusCarousel} />

      <PublicFooter />
    </div>
  );
}
