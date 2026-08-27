'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Send,
  Laptop,
  Trophy,
  Palette,
  HeartHandshake,
  Languages,
  Clock,
  ArrowLeft,
  X,
  FileDown,
  CreditCard,
  HelpCircle,
  Bus,
  Check,
  MessageCircle,
  Quote,
  Maximize2,
  Copy,
} from 'lucide-react';
import { useToast } from '../../components/ui/toast';
import { Button } from '../../components/ui/button';

interface SSSDMoment {
  id: string;
  title: string;
  category: string;
  categoryBadge: string;
  desc: string;
  image: string;
  tag?: string;
}

const sssdMoments: SSSDMoment[] = [
  {
    id: 'smart-class',
    title: 'Interactive 3D Digital Smart Classrooms',
    category: 'Digital NEP 2020',
    categoryBadge: 'bg-emerald-600/90 text-white',
    desc: 'Equipped with interactive touchscreen smart boards, 3D STEM visual learning tools, and multimedia audio modules.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    tag: 'Smart Classroom',
  },
  {
    id: 'phonics-lab',
    title: 'Spoken English & Cambridge Phonics Studio',
    category: 'Spoken Fluency',
    categoryBadge: 'bg-blue-600/90 text-white',
    desc: 'Dedicated acoustic audio lab enabling native English pronunciation, diction correction, and daily conversational drills.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    tag: 'Audio Phonics',
  },
  {
    id: 'kindergarten',
    title: 'Montessori Kindergarten & Activity Hub',
    category: 'Early Childhood',
    categoryBadge: 'bg-amber-500 text-blue-950 font-black',
    desc: 'Air-conditioned colorful play-way activity zone with cognitive puzzles, Montessori apparatus, and fine motor exercises.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    tag: 'Play-Way Care',
  },
  {
    id: 'stem-robotics',
    title: 'Robotics, Coding & Innovation Corner',
    category: 'STEM & AI',
    categoryBadge: 'bg-purple-600/90 text-white',
    desc: 'Hands-on electronic circuit boards, Scratch coding, and practical science model creation for young innovators.',
    image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=800&q=80',
    tag: 'Hands-on Labs',
  },
  {
    id: 'sports-arena',
    title: 'Outdoor Athletics Arena & Martial Arts',
    category: 'Physical Wellness',
    categoryBadge: 'bg-rose-600/90 text-white',
    desc: 'Spacious campus arena for synthetic Badminton courts, Karate/Taekwondo training, Volleyball, and daily Yoga sessions.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    tag: 'Karate & Yoga',
  },
  {
    id: 'annual-day',
    title: 'Annual English Drama & Cultural Showcase',
    category: 'Creative Arts',
    categoryBadge: 'bg-teal-600/90 text-white',
    desc: 'English theatre plays, Western/classical dance, public speaking elocution, and student distinction honors.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    tag: 'Annual Samaroh',
  },
];

export default function SSSDPublicSchoolPage() {
  const { toast } = useToast();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<SSSDMoment | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    grade: 'Class 1',
    phone: '',
    email: '',
    address: 'Shamsabad, Farrukhabad',
  });

  const handleCopyRef = () => {
    if (submittedRef) {
      navigator.clipboard?.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.studentName || !formData.phone) {
      toast.error('Please fill in all mandatory fields.', 'Missing Info');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `SSSD-2026-${randomNum}`;
    setSubmittedRef(refCode);
    toast.success(`Application registered with Ref: ${refCode}`, 'Inquiry Received!');
  };

  const sssdFeatures = [
    {
      title: '100% English Medium Ambience',
      desc: 'Immersive English language environment with daily phonics, spoken English clinics, and debate clubs from Kindergarten upwards.',
      icon: (
        <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-sm flex-shrink-0 flex items-center justify-center">
          <img src="/images/sssd-logo.png" alt="SSSD" className="w-full h-full object-contain" />
        </div>
      ),
      tag: 'Spoken Fluency',
    },
    {
      title: 'CBSE Pattern & NCERT Curriculum',
      desc: 'Holistic curriculum aligned with the latest National Education Policy (NEP 2020) and modern STEM learning modules.',
      icon: <BookOpen className="w-5 h-5 text-blue-700" />,
      tag: 'Academic Rigor',
    },
    {
      title: 'Smart Digital Classrooms',
      desc: 'Every classroom is equipped with high-definition digital smart interactive boards, visual 3D science models, and audio aids.',
      icon: <Laptop className="w-5 h-5 text-purple-700" />,
      tag: 'Digital Learning',
    },
    {
      title: 'Science & Robotics Corner',
      desc: 'Hands-on experiential labs for physics, chemistry, biology, and foundational coding for young innovators.',
      icon: <Sparkles className="w-5 h-5 text-amber-700" />,
      tag: 'STEM Innovation',
    },
    {
      title: 'Athletics & Physical Wellness',
      desc: 'Spacious sports arena with synthetic courts for Badminton, Volleyball, Martial arts training, and daily Yoga sessions.',
      icon: <Trophy className="w-5 h-5 text-rose-700" />,
      tag: 'Sports Academy',
    },
    {
      title: 'Safe GPS-Tracked Transport Fleet',
      desc: 'Dedicated school van and bus fleet covering all sectors of Shamsabad, Farrukhabad, Kaimganj road, and rural suburbs.',
      icon: <Bus className="w-5 h-5 text-teal-700" />,
      tag: 'Safety & Security',
    },
  ];

  const academicStages = [
    {
      stage: 'Kindergarten & Pre-Primary',
      classes: 'Playgroup, Nursery, LKG, UKG',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
      highlights: ['Montessori play-way pedagogy', 'Phonics & rhyme recitation', 'Fine motor skill exercises', 'Colorful air-conditioned play hall'],
    },
    {
      stage: 'Primary Foundation Wing',
      classes: 'Grade 1 to Grade 5',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
      highlights: ['Strong English & Math fundamentals', 'Computer literacy & typing', 'Moral science & general knowledge', 'Art, music & storytelling'],
    },
    {
      stage: 'Middle & Secondary School',
      classes: 'Grade 6 to Grade 10',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      highlights: ['NCERT Science & Math practicals', 'Computer coding & Scratch/Python', 'Olympiad & competitive exam drills', 'Inter-school sports & debate fests'],
    },
  ];

  const facultyHighlights = [
    {
      name: 'Mrs. Ananya Sen',
      role: 'Headmistress & Spoken English Lead',
      exp: '14+ Yrs Exp',
      qual: 'M.A. English (Gold Medalist), B.Ed.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85',
      tags: ['Cambridge TKT', 'Phonics Studio', 'Debate Mentor'],
    },
    {
      name: 'Mr. Vikramaditya Singh',
      role: 'Senior Science & STEM Instructor',
      exp: '10+ Yrs Exp',
      qual: 'M.Sc. Physics, B.Ed., CTET Qualified',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85',
      tags: ['Robotics STEM', 'NCERT Physics', 'Olympiad Drill'],
    },
    {
      name: 'Ms. Deepika Saxena',
      role: 'Primary Phonics & Mathematics Lead',
      exp: '8+ Yrs Exp',
      qual: 'B.Sc., D.El.Ed., Cambridge Certified',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=85',
      tags: ['Montessori Care', 'Phonics Audio', 'Mental Maths'],
    },
    {
      name: 'Mr. Rohit Kashyap',
      role: 'Computer & AI Robotics Instructor',
      exp: '7+ Yrs Exp',
      qual: 'MCA, Certified Python Educator',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85',
      tags: ['Python & Scratch', 'Smart AI Lab', 'Cyber Safety'],
    },
  ];

  const stream = [...sssdMoments, ...sssdMoments];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-600 selection:text-white overflow-x-hidden">
      {/* SSSD Top Switcher Strip */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#01271e] to-teal-950 text-slate-300 py-2 px-3 sm:px-6 text-xs border-b border-emerald-500/20 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Text / Badge */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0"></span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-300 truncate">
              100% English Medium Wing &bull; Managed by Sarswati Educational Trust
            </span>
          </div>

          {/* Right Switcher Pill */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-amber-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/20 transition shadow-sm flex-shrink-0 whitespace-nowrap"
          >
            <div className="w-3.5 h-3.5 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 flex items-center justify-center">
              <img src="/logo.png" alt="SGM" className="w-full h-full object-contain" />
            </div>
            <span>SGM Inter College &rarr;</span>
          </Link>
        </div>
      </div>

      {/* SSSD Dedicated Navbar Header */}
      <header className="w-full sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/30 shadow-xl shadow-slate-950/40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-4">
          {/* SSSD Brand Logo & Name */}
          <Link href="/sssd" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/images/sssd-logo.png"
                alt="SSSD Public School Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-teal-100 uppercase font-serif tracking-tight truncate">
                  SSSD Public School
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full hidden md:inline-block font-mono">
                  English Medium
                </span>
              </div>
              <p className="text-[8.5px] sm:text-[10px] text-amber-300 font-extrabold tracking-wider uppercase truncate">
                SHAMSABAD &bull; FARRUKHABAD (UP)
              </p>
            </div>
          </Link>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20inquire%20about%20SSSD%20Public%20School%20English%20Medium%20Admissions"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Counselor</span>
            </a>
            <Button
              size="sm"
              className="h-8 sm:h-9 px-3 sm:px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/30 rounded-xl"
              onClick={() => setShowApplyModal(true)}
              leftIcon={<Send className="w-3 h-3 text-amber-300 flex-shrink-0" />}
            >
              <span>Apply Now</span>
            </Button>
          </div>
        </div>
      </header>

      {/* SSSD Hero Section */}
      <section className="relative bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#042f2e] text-white pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Admissions Open 2026-2027 &bull; Nursery to Grade 10</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight text-white leading-tight">
            Nurturing Global Minds with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-200 to-teal-200">
              Modern English Medium Education
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong>SSSD Public School (Shamsabad)</strong> &mdash; the premier co-educational English Medium wing of Sarswati Educational Trust, combining 21st-century digital classrooms, spoken English mastery, and cultural values.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:pt-4">
            <Button
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl rounded-2xl px-5 sm:px-6 py-2.5 sm:py-3.5"
              onClick={() => setShowApplyModal(true)}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Apply for SSSD Admission
            </Button>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20inquire%20about%20SSSD%20Public%20School%20English%20Medium%20Admissions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl border border-emerald-500/40 transition backdrop-blur-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Admission Counselor</span>
            </a>
          </div>
        </div>
      </section>

      {/* SSSD Key Metrics Grid */}
      <section className="max-w-5xl mx-auto px-3 sm:px-6 -mt-8 sm:-mt-10 z-20 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl text-center space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-wider">Medium</span>
            <p className="text-base sm:text-2xl font-black text-emerald-700 font-serif">100% English</p>
          </div>
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl text-center space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-wider">Grades</span>
            <p className="text-base sm:text-2xl font-black text-slate-900 font-serif">Nursery - 10th</p>
          </div>
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl text-center space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-wider">Ratio</span>
            <p className="text-base sm:text-2xl font-black text-blue-700 font-mono">18 : 1</p>
          </div>
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl text-center space-y-0.5 sm:space-y-1">
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-wider">Security</span>
            <p className="text-base sm:text-2xl font-black text-amber-600 font-serif">100% CCTV</p>
          </div>
        </div>
      </section>

      {/* SSSD Headmistress / Leadership Desk Card (Grand 7xl Container with Golden Frame) */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#011a14] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden border-2 border-emerald-400/50">
            {/* Background Glow & Seal Watermark */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 right-4 w-64 h-64 opacity-5 pointer-events-none">
              <img src="/images/stamps/sssd-principal-round-seal.png" alt="SSSD Seal" className="w-full h-full object-contain" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Headmistress Hero Portrait with Gold Frame */}
              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-full h-64 sm:h-80 md:h-[370px] rounded-3xl overflow-hidden border-4 border-amber-400/90 shadow-2xl shadow-amber-500/20 bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"
                    alt="Headmistress Mrs. Ananya Sen"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Experience Badge */}
                  <div className="absolute top-3 left-3 bg-amber-400 text-blue-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 font-mono">
                    <span>★ 14+ Years English Leadership</span>
                  </div>

                  {/* Nameplate inside photo bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h4 className="font-serif font-black text-lg sm:text-xl text-white drop-shadow-md">
                      Mrs. Ananya Sen
                    </h4>
                    <p className="text-xs text-amber-300 font-bold drop-shadow">
                      Headmistress &bull; M.A. English (Gold Medalist), B.Ed.
                    </p>
                    <p className="text-[10px] text-emerald-300 font-mono mt-0.5">
                      SSSD Public School (100% English Medium)
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Vision & 3 Pillars */}
              <div className="md:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-black uppercase px-3.5 py-1.5 rounded-full border border-amber-400/40">
                  <Quote className="w-3.5 h-3.5 text-amber-300" />
                  <span>From The Headmistress&apos;s Desk</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif text-white leading-snug">
                  &ldquo;Empowering Confident Communicators, Critical Thinkers &amp; Cultured Leaders&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                  At SSSD Public School, our mission is to eliminate English language hesitation among children in Shamsabad from an early age. With immersive spoken English activities, Cambridge phonics pedagogy, digital smart classrooms, and personalized mentorship, we prepare your child to excel globally with pride in our cultural heritage.
                </p>

                {/* 3 Pillars Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-amber-300 text-xs font-black">🗣️ Spoken Fluency</div>
                    <div className="text-[11px] text-slate-200">Daily English clinics &amp; debate forums</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-emerald-300 text-xs font-black">🔬 Smart CBSE STEM</div>
                    <div className="text-[11px] text-slate-200">Interactive 3D digital labs &amp; coding</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-teal-300 text-xs font-black">🕉️ Values &amp; Sports</div>
                    <div className="text-[11px] text-slate-200">Sanskar, Yoga, Karate &amp; Athletics</div>
                  </div>
                </div>

                {/* Action & Stamped Signature */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/15">
                  <Button
                    onClick={() => setShowApplyModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black text-xs shadow-lg shadow-amber-400/20 transition-all active:scale-95 group"
                  >
                    <span>Inquire for Admission 2026-27</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="bg-white/90 p-1.5 px-3 rounded-xl border border-amber-300/60 flex items-center gap-2 self-start sm:self-auto shadow-md">
                    <img
                      src="/images/stamps/sssd-principal-signature.png"
                      alt="Headmistress Signature"
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSSD 360° Infinite Campus Cinematic Showcase */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden font-sans border-t border-b border-slate-800/80">
        <div className="absolute top-1/2 -left-48 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-48 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-emerald-900/40 text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>SSSD Campus Life &amp; Modern Classrooms</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-serif tracking-tight">
                Life &amp; Learning at SSSD Public School
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Explore smart digital classrooms, phonics audio studio, kindergarten activity zones, and athletic arena.
              </p>
            </div>

            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 rounded-xl whitespace-nowrap self-start md:self-auto"
              onClick={() => setShowApplyModal(true)}
              leftIcon={<Send className="w-3.5 h-3.5 text-amber-300" />}
            >
              Book a Campus Visit &rarr;
            </Button>
          </div>
        </div>

        {/* Single Grand Cinematic Stream */}
        <div className="relative w-full overflow-hidden py-3">
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

          <div className="flex gap-6 w-max animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {stream.map((item, idx) => (
              <div
                key={`sssd-stream-${item.id}-${idx}`}
                onClick={() => setActivePhoto(item)}
                className="group relative w-80 sm:w-96 md:w-[420px] h-64 sm:h-72 md:h-80 rounded-3xl overflow-hidden cursor-pointer border-2 border-white/10 hover:border-emerald-400/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 flex-shrink-0 bg-slate-900"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${item.categoryBadge}`}>
                    {item.category}
                  </span>
                  {item.tag && (
                    <span className="text-[11px] bg-slate-950/80 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-black text-white font-serif drop-shadow-md group-hover:text-emerald-300 transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to view full photo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SSSD Features Grid */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
            Why Choose SSSD Public School
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-serif">
            World-Class Amenities for Modern Learners
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every aspect of SSSD Public School is curated to give your child an unmatched advantage in academic brilliance and personality development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sssdFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 font-serif">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Stages at SSSD */}
      <section className="py-16 sm:py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
              Academic Curricula
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-serif">
              Developmental Learning Wings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Step-by-step cognitive and skill progression designed for modern English medium scholars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicStages.map((stg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl transition"
              >
                <div>
                  <div className="h-40 sm:h-44 w-full relative overflow-hidden">
                    <img src={stg.image} alt={stg.stage} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                      {stg.classes}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-black text-slate-900 font-serif">{stg.stage}</h3>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {stg.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-bold border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                    onClick={() => {
                      setFormData({ ...formData, grade: stg.classes.split(',')[0] });
                      setShowApplyModal(true);
                    }}
                  >
                    Apply for this Wing &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSSD Fee Structure */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm">
            Transparent Fee Structure
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
            Affordable Fee Schedules &bull; Session 2026-2027
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            Quality 100% English medium education with complete institutional transparency, zero hidden charges, and quarterly flexible installments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pre-Primary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Pre-Primary Wing
                </span>
                <span className="text-[11px] font-bold text-slate-400">Play - UKG</span>
              </div>
              <div>
                <h3 className="font-serif font-black text-lg text-slate-900">Kindergarten</h3>
                <p className="text-xs text-slate-500 mt-0.5">Foundational Play-Way &amp; Phonics</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹ 950</span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  One-Time Registration: <span className="font-mono font-black">₹ 2,500</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Montessori Learning &amp; Phonics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Air-Conditioned Activity Hall</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Digital Lab: Included (Free)</span>
                </li>
              </ul>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-bold border-slate-200 text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => {
                setFormData({ ...formData, grade: 'Playgroup / Nursery' });
                setShowApplyModal(true);
              }}
            >
              Inquire for Nursery &rarr;
            </Button>
          </div>

          {/* Primary */}
          <div className="bg-gradient-to-b from-emerald-950 via-[#064e3b] to-teal-950 text-white rounded-3xl p-6 border-2 border-emerald-400/50 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group transform lg:-translate-y-2">
            <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider font-mono shadow-md">
              Most Popular
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  Primary Foundation
                </span>
                <span className="text-[11px] font-bold text-emerald-200">Grades 1 to 5</span>
              </div>
              <div>
                <h3 className="font-serif font-black text-lg text-white">Primary School</h3>
                <p className="text-xs text-emerald-200 mt-0.5">English Fluency &amp; Math Foundation</p>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">₹ 1,200</span>
                  <span className="text-xs text-emerald-100 font-medium">/ month</span>
                </div>
                <div className="text-[11px] text-emerald-200 font-bold">
                  One-Time Registration: <span className="font-mono font-black text-white">₹ 3,000</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-emerald-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Daily Spoken English Clinics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Computer &amp; Digital Smart Board</span>
                </li>
                <li className="flex items-center gap-2 text-amber-300 font-semibold">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Phonics &amp; Science: Included</span>
                </li>
              </ul>
            </div>
            <Button
              className="w-full bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs shadow-lg shadow-amber-400/20"
              onClick={() => {
                setFormData({ ...formData, grade: 'Class 1' });
                setShowApplyModal(true);
              }}
            >
              Inquire for Primary &rarr;
            </Button>
          </div>

          {/* Middle */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Middle Wing
                </span>
                <span className="text-[11px] font-bold text-slate-400">Grades 6 to 8</span>
              </div>
              <div>
                <h3 className="font-serif font-black text-lg text-slate-900">Middle School</h3>
                <p className="text-xs text-slate-500 mt-0.5">NCERT Exploration &amp; Coding</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹ 1,450</span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  One-Time Registration: <span className="font-mono font-black">₹ 3,500</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>NCERT Science &amp; Math Practicals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Coding &amp; Scratch/Python Classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Sports Academy &amp; Martial Arts</span>
                </li>
              </ul>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-bold border-slate-200 text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => {
                setFormData({ ...formData, grade: 'Class 6' });
                setShowApplyModal(true);
              }}
            >
              Inquire for Middle &rarr;
            </Button>
          </div>

          {/* High School */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  Secondary Wing
                </span>
                <span className="text-[11px] font-bold text-slate-400">Grades 9 &amp; 10</span>
              </div>
              <div>
                <h3 className="font-serif font-black text-lg text-slate-900">High School</h3>
                <p className="text-xs text-slate-500 mt-0.5">CBSE Exam Prep &amp; Olympiads</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹ 1,750</span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  One-Time Registration: <span className="font-mono font-black">₹ 4,000</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>CBSE Board Mock Test Series</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Full Physics, Chem &amp; Bio Labs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Olympiad &amp; NTSE Mentorship</span>
                </li>
              </ul>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-bold border-slate-200 text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => {
                setFormData({ ...formData, grade: 'Class 9' });
                setShowApplyModal(true);
              }}
            >
              Inquire for Class 9/10 &rarr;
            </Button>
          </div>
        </div>
      </section>

      {/* SSSD Faculty Mentors */}
      <section className="py-16 sm:py-24 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm">
              Expert Mentors
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
              Our English Language Educators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Certified educators trained in Cambridge phonics, interactive smart board pedagogy, STEM labs, and child psychology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyHighlights.map((fac, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Floating Exp Badge */}
                    <div className="absolute top-3 right-3 bg-slate-950/90 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md backdrop-blur-md font-mono">
                      ★ {fac.exp}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-black uppercase text-emerald-300 tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 backdrop-blur-md">
                        SSSD English Faculty
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2.5">
                    <div>
                      <h3 className="text-base font-black text-slate-900 font-serif group-hover:text-emerald-700 transition leading-snug">
                        {fac.name}
                      </h3>
                      <p className="text-xs font-extrabold text-emerald-700 mt-0.5">{fac.role}</p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                      <p className="line-clamp-2"><strong>Qual:</strong> {fac.qual}</p>
                    </div>

                    {/* Specialization Tags */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {fac.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSSD Management Trust Banner */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-12 text-white border border-emerald-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-xl flex-shrink-0">
              <img src="/images/sssd-logo.png" alt="SSSD Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Sarswati Educational Trust Legacy
              </span>
              <h3 className="text-lg sm:text-2xl font-black font-serif text-white">
                Two Premier Schools &bull; One Vision of Excellence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you seek the prestigious state board science stream at <strong>Sarswati Gyan Mandir Intermediate College</strong> or modern English medium co-education at <strong>SSSD Public School</strong>, our trust ensures highest academic integrity and student care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SSSD Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-10 pb-8 border-t border-emerald-500/20 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-md flex-shrink-0">
                <img src="/images/sssd-logo.png" alt="SSSD Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-black text-white font-serif">SSSD Public School</h4>
                <p className="text-[10px] text-emerald-400 uppercase font-bold">English Medium Wing &bull; Shamsabad</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs font-bold text-slate-300">
              <Link href="/" className="hover:text-amber-300 transition">
                &larr; SGM Main Site
              </Link>
              <Link href="/downloads" className="hover:text-emerald-300 transition">
                Downloads &amp; Forms
              </Link>
              <Link href="/privacy-policy" className="hover:text-emerald-300 transition">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-[11px] text-slate-500 text-center sm:text-left">
            <p>&copy; 2026 SSSD Public School, Shamsabad (Farrukhabad, UP). All rights reserved.</p>
            <p>Managed by Sarswati Shiksha Samiti &bull; Co-Educational</p>
          </div>
        </div>
      </footer>

      {/* SSSD Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-slate-900 border-2 border-emerald-400/60 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 sm:h-96 w-full bg-slate-950">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-950/80 hover:bg-slate-800 text-white border border-white/20 transition shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${activePhoto.categoryBadge}`}>
                  {activePhoto.category}
                </span>
                {activePhoto.tag && (
                  <span className="text-xs bg-slate-950/80 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-400/40 backdrop-blur-md">
                    {activePhoto.tag}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 pt-2 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePhoto.desc}
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                <Button
                  onClick={() => {
                    setActivePhoto(null);
                    setShowApplyModal(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Apply for SSSD Admission 2026-27
                </Button>

                <button
                  onClick={() => setActivePhoto(null)}
                  className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                >
                  Close &bull; Esc
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SSSD Admission Inquiry Modal (Full screen blur z-[99999]) */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto w-full h-full min-h-screen">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-2xl border-2 border-emerald-600 space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-sm flex-shrink-0">
                  <img src="/images/sssd-logo.png" alt="SSSD Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 font-serif">
                    SSSD Public School Admission Inquiry
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-emerald-700 font-bold uppercase">Session 2026-2027 (English Medium)</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowApplyModal(false);
                  setSubmittedRef(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedRef ? (
              <div className="text-center py-5 space-y-4 animate-in zoom-in-90 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 font-serif">Application Registered!</h4>
                  <p className="text-xs text-slate-600">
                    Your inquiry for <strong>{formData.studentName}</strong> has been logged at SSSD Admission Desk.
                  </p>
                </div>
                
                {/* Copyable Ref Box */}
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center font-mono space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Official Inquiry Reference</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl font-black text-emerald-800 tracking-wider">{submittedRef}</span>
                    <button
                      onClick={handleCopyRef}
                      className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1 shadow-sm"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="text-left bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1">
                  <p>✓ Admission counselor will connect on <strong>{formData.phone}</strong>.</p>
                  <p>✓ Campus tour slots available Mon-Sat (08:30 AM - 03:00 PM).</p>
                </div>

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold text-xs"
                  onClick={() => {
                    setShowApplyModal(false);
                    setSubmittedRef(null);
                  }}
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Grade Applying For *</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    >
                      <option value="Playgroup / Nursery">Playgroup / Nursery</option>
                      <option value="LKG / UKG">LKG / UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9839000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Residential Address (Town/Village)</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold text-xs">
                    Submit SSSD Admission Inquiry
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
    </div>
  );
}
