'use client';

import React, { useState, useEffect } from 'react';
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
  GraduationCap,
  Users,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  FileText,
  ArrowRight,
  Video,
  Play,
  Film,
  Youtube,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';
import { ImageUploader } from '../../../components/ui/image-uploader';
import { LinkDestinationSelector } from '../../../components/ui/link-destination-selector';
import { RichTextEditor } from '../../../components/ui/rich-text-editor';
import { VideoUploader } from '../../../components/ui/video-uploader';
import {
  getVideoType,
  getVideoPlayerInfo,
  extractYouTubeId,
  getYouTubeThumbnail,
  getYouTubeEmbedUrl,
} from '../../../lib/video-utils';

export default function SchoolSettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    'identity' | 'hero' | 'stats' | 'wings' | 'facilities' | 'desk' | 'sssd' | 'carousel' | 'testimonials' | 'footer'
  >('identity');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Master Full CMS State
  const [cmsData, setCmsData] = useState<any>({
    name: 'Sarswati Gyan Mandir Inter College & SSSD Public School',
    nameHindi: 'सरस्वती ज्ञान मन्दिर इण्टर कॉलेज',
    tagline: 'Excellence in Education, Culture & Character Building',
    affiliationCode: 'UP-FBD-2026-SGM-089',
    examinationCenterCode: 'FBD-CENT-1089',
    board: 'UP State Board of High School & Intermediate Education (Prayagraj)',
    establishedYear: '1999',
    address: {
      street: 'Main Road, Near Bus Stand',
      city: 'Shamsabad',
      district: 'Farrukhabad',
      state: 'Uttar Pradesh',
      pincode: '209503',
      country: 'India',
    },
    contact: {
      phone: '+91 9876543210',
      email: 'info@sarswatigyanmandir.edu.in',
      alternatePhone: '+91 9451234501',
    },
    ticker: {
      text: 'Admissions Open for Session 2026-2027 (Nursery to Class 12 PCM/PCB/Arts) • UP Board High School Results 99.4% Pass Rate',
      url: '/admissions',
      badge: 'URGENT ANNOUNCEMENT',
      isActive: true,
      showContactInfo: true,
      mapsUrl: 'https://maps.google.com/?q=Shamsabad+Farrukhabad+Uttar+Pradesh',
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
      { value: '1,250+', label: 'Enrolled Scholars', iconKey: 'Users', order: 1, isActive: true },
      { value: '42+', label: 'Expert Faculty', iconKey: 'GraduationCap', order: 2, isActive: true },
      { value: '99.4%', label: 'Board Pass Rate', iconKey: 'Award', order: 3, isActive: true },
      { value: '25+ Yrs', label: 'Academic Legacy', iconKey: 'Building2', order: 4, isActive: true },
    ],
    academicWings: [
      {
        title: 'Pre-Primary & Primary Wing',
        grades: 'Nursery to Class 5',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
        desc: 'Foundational literacy, phonics, joyful arithmetic, creative arts, and moral grounding in a caring environment.',
        slug: 'primary',
        order: 1,
        isActive: true,
      },
      {
        title: 'Middle School Wing',
        grades: 'Class 6 to Class 8',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
        desc: 'Scientific exploration, digital literacy, languages (Hindi, English, Sanskrit), and strong mathematics fundamentals.',
        slug: 'middle',
        order: 2,
        isActive: true,
      },
      {
        title: 'High School (UP Board)',
        grades: 'Class 9 & Class 10',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
        desc: 'Rigorous state board curriculum, NCERT mastery, comprehensive laboratory experiments, and board mock series.',
        slug: 'high-school',
        order: 3,
        isActive: true,
      },
      {
        title: 'Intermediate College Wing',
        grades: 'Class 11 & Class 12',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
        desc: 'Specialized Science (PCM/PCB) & Humanities streams with state board preparation and competitive examination guidance.',
        slug: 'intermediate',
        order: 4,
        isActive: true,
      },
    ],
    facilities: [
      {
        title: 'Physics & Chemistry Labs',
        desc: 'Equipped with modern apparatus, optical benches, reagents, and certified safety setups.',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        order: 1,
        isActive: true,
      },
      {
        title: 'Digital Computer Center',
        desc: 'Air-conditioned lab with 40+ connected workstations and coding modules.',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
        order: 2,
        isActive: true,
      },
      {
        title: 'Central Knowledge Library',
        desc: 'Extensive repository of 5,000+ reference volumes, encyclopedias, and regional literature.',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
        order: 3,
        isActive: true,
      },
      {
        title: 'Dedicated Transport Fleet',
        desc: 'GPS-tracked school buses covering Shamsabad, Farrukhabad, and surrounding rural routes.',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
        order: 4,
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
    headmistressDesk: {
      name: 'Mrs. Ananya Sen',
      qualifications: 'Headmistress & Spoken English Lead • M.A. (English), B.Ed.',
      experience: '★ 15+ Years English Pedagogy',
      quote: 'Fostering Eloquent Expression, Critical Thinking & Global English Confidence',
      message:
        'At SSSD Public School, our primary commitment is to create a dynamic, 100% English medium learning atmosphere where students speak fluent English with natural poise and confidence.',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
      signatureUrl: '/images/stamps/sssd-principal-signature.png',
      roundSealUrl: '/images/stamps/sssd-principal-round-seal.png',
      isActive: true,
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
      facultyMembers: [
        {
          name: 'Mrs. Ananya Sen',
          role: 'Headmistress & Spoken English Lead',
          exp: '14+ Yrs Exp',
          qual: 'M.A. English (Gold Medalist), B.Ed.',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85',
          tags: ['Cambridge TKT', 'Phonics Studio', 'Debate Mentor'],
          order: 1,
          isActive: true,
        },
        {
          name: 'Mr. Vikramaditya Singh',
          role: 'Senior Science & STEM Instructor',
          exp: '10+ Yrs Exp',
          qual: 'M.Sc. Physics, B.Ed., CTET Qualified',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85',
          tags: ['Robotics STEM', 'NCERT Physics', 'Olympiad Drill'],
          order: 2,
          isActive: true,
        },
        {
          name: 'Ms. Deepika Saxena',
          role: 'Primary Phonics & Mathematics Lead',
          exp: '8+ Yrs Exp',
          qual: 'B.Sc., D.El.Ed., Cambridge Certified',
          image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=85',
          tags: ['Montessori Care', 'Phonics Audio', 'Mental Maths'],
          order: 3,
          isActive: true,
        },
        {
          name: 'Mr. Rohit Kashyap',
          role: 'Computer & AI Robotics Instructor',
          exp: '7+ Yrs Exp',
          qual: 'MCA, Certified Python Educator',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85',
          tags: ['Python & Scratch', 'Smart AI Lab', 'Cyber Safety'],
          order: 4,
          isActive: true,
        },
      ],
    },
    campusCarousel: [
      {
        title: 'Advanced Science & Physics Lab',
        category: 'ACADEMIC EXCELLENCE',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
        badge: 'Practical Lab',
        desc: 'Fully equipped experimental physics benches with certified safety setups.',
        order: 1,
        isActive: true,
      },
      {
        title: 'High-Tech Digital Computer Center',
        category: 'IT INFRASTRUCTURE',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
        badge: '40+ Workstations',
        desc: 'High-speed internet, smart LED monitors, and programming laboratories.',
        order: 2,
        isActive: true,
      },
      {
        title: 'Central Knowledge Library',
        category: 'RESOURCE HUB',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
        badge: '5,000+ Books',
        desc: 'Extensive repository of NCERT textbooks, reference encyclopedias, and literature.',
        order: 3,
        isActive: true,
      },
      {
        title: 'Smart Interactive Classrooms',
        category: 'MODERN PEDAGOGY',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
        badge: 'Digital Boards',
        desc: 'Visual 3D learning modules for high school and intermediate concepts.',
        order: 4,
        isActive: true,
      },
    ],
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
    footer: {
      aboutText:
        'Sarswati Gyan Mandir Intermediate College and SSSD Public School are premier educational institutions in Shamsabad, Farrukhabad (UP), dedicated to high academic standards, modern science, cultural sanskars, and disciplined character building.',
      copyrightText: '© 2026 Sarswati Gyan Mandir & SSSD Public School. All rights reserved.',
      helplinePhone: '+91 9876543210',
      supportEmail: 'info@sarswatigyanmandir.edu.in',
      address: 'Main Road, Near Bus Stand, Shamsabad, Farrukhabad, UP - 209503',
      socialLinks: {
        facebook: 'https://facebook.com',
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        whatsapp: 'https://wa.me/919876543210',
      },
    },
  });

  useEffect(() => {
    async function fetchSchool() {
      try {
        const res = await apiClient.get('/school');
        if (res.data?.data) {
          setCmsData((prev: any) => ({
            ...prev,
            ...res.data.data,
            hero: {
              ...prev.hero,
              ...(res.data.data.hero || {}),
              quickAdmissionWidget: {
                ...prev.hero.quickAdmissionWidget,
                ...(res.data.data.hero?.quickAdmissionWidget || {}),
                benefits:
                  res.data.data.hero?.quickAdmissionWidget?.benefits?.length
                    ? res.data.data.hero.quickAdmissionWidget.benefits
                    : prev.hero.quickAdmissionWidget.benefits,
              },
            },
            ticker: { ...prev.ticker, ...(res.data.data.ticker || {}) },
            stats: res.data.data.stats?.length ? res.data.data.stats : prev.stats,
            academicWings: res.data.data.academicWings?.length ? res.data.data.academicWings : prev.academicWings,
            facilities: res.data.data.facilities?.length ? res.data.data.facilities : prev.facilities,
            principalDesk: {
              ...prev.principalDesk,
              ...(res.data.data.principalDesk || {}),
              pillars: res.data.data.principalDesk?.pillars?.length ? res.data.data.principalDesk.pillars : prev.principalDesk.pillars,
            },
            headmistressDesk: { ...prev.headmistressDesk, ...(res.data.data.headmistressDesk || {}) },
            sssdShowcase: {
              ...prev.sssdShowcase,
              ...(res.data.data.sssdShowcase || {}),
              highlights: res.data.data.sssdShowcase?.highlights?.length ? res.data.data.sssdShowcase.highlights : prev.sssdShowcase.highlights,
              facultyMembers: res.data.data.sssdShowcase?.facultyMembers?.length ? res.data.data.sssdShowcase.facultyMembers : prev.sssdShowcase.facultyMembers,
            },
            campusCarousel: res.data.data.campusCarousel?.length ? res.data.data.campusCarousel : prev.campusCarousel,
            videoTestimonialsSection: {
              ...prev.videoTestimonialsSection,
              ...(res.data.data.videoTestimonialsSection || {}),
              testimonials: res.data.data.videoTestimonialsSection?.testimonials?.length
                ? res.data.data.videoTestimonialsSection.testimonials
                : prev.videoTestimonialsSection.testimonials,
            },
            footer: { ...prev.footer, ...(res.data.data.footer || {}) },
          }));
        }
      } catch {
        // Fallback default retains
      } finally {
        setIsLoading(false);
      }
    }
    fetchSchool();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { ...cmsData };
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;

      const res = await apiClient.put('/school', payload);
      if (res.data?.data) {
        setCmsData(res.data.data);
      }
      toast.success(
        'All Master CMS updates and active/inactive toggles saved to MongoDB Atlas.',
        'CMS Settings Saved'
      );
    } catch {
      toast.error('Failed to save settings. Please verify Admin credentials.', 'Save Error');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper CRUD for Stats
  const addStat = () => {
    setCmsData((prev: any) => {
      const statsList = prev.stats || [];
      const newStat = {
        value: '100+',
        label: 'New Stat Counter',
        iconKey: 'Sparkles',
        order: statsList.length + 1,
        isActive: true,
      };
      return { ...prev, stats: [...statsList, newStat] };
    });
    toast.success('New stat counter added. Click Save to persist.', 'Stat Added');
  };

  const removeStat = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.stats || [])];
      next.splice(idx, 1);
      return { ...prev, stats: next };
    });
  };

  const toggleStat = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.stats || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return { ...prev, stats: next };
    });
  };

  // Helper CRUD for Wings
  const addWing = () => {
    setCmsData((prev: any) => {
      const wingsList = prev.academicWings || [];
      const newWing = {
        title: 'New Educational Wing',
        grades: 'Grades Scope',
        desc: 'Curriculum overview and teaching focus...',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
        slug: `wing-${Date.now()}`,
        order: wingsList.length + 1,
        isActive: true,
      };
      return { ...prev, academicWings: [...wingsList, newWing] };
    });
    toast.success('New Academic Wing added.', 'Wing Added');
  };

  const removeWing = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.academicWings || [])];
      next.splice(idx, 1);
      return { ...prev, academicWings: next };
    });
  };

  const toggleWing = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.academicWings || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return { ...prev, academicWings: next };
    });
  };

  // Helper CRUD for Facilities
  const addFacility = () => {
    setCmsData((prev: any) => {
      const facList = prev.facilities || [];
      const newFac = {
        title: 'New Campus Facility / Lab',
        desc: 'Facility overview and equipment description...',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        order: facList.length + 1,
        isActive: true,
      };
      return { ...prev, facilities: [...facList, newFac] };
    });
    toast.success('New Facility card added.', 'Facility Added');
  };

  const removeFacility = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.facilities || [])];
      next.splice(idx, 1);
      return { ...prev, facilities: next };
    });
  };

  const toggleFacility = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.facilities || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return { ...prev, facilities: next };
    });
  };

  // Helper CRUD for Quick Admission Benefits (Tab 2)
  const addHeroBenefit = () => {
    setCmsData((prev: any) => {
      const cur = prev.hero?.quickAdmissionWidget?.benefits || [];
      const newB = { text: 'New Admission Benefit Feature', isActive: true };
      return {
        ...prev,
        hero: {
          ...prev.hero,
          quickAdmissionWidget: {
            ...prev.hero?.quickAdmissionWidget,
            benefits: [...cur, newB],
          },
        },
      };
    });
    toast.success('New Admission Benefit feature added.', 'Benefit Added');
  };

  const removeHeroBenefit = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.hero?.quickAdmissionWidget?.benefits || [])];
      next.splice(idx, 1);
      return {
        ...prev,
        hero: {
          ...prev.hero,
          quickAdmissionWidget: {
            ...prev.hero?.quickAdmissionWidget,
            benefits: next,
          },
        },
      };
    });
  };

  const toggleHeroBenefit = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.hero?.quickAdmissionWidget?.benefits || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return {
        ...prev,
        hero: {
          ...prev.hero,
          quickAdmissionWidget: {
            ...prev.hero?.quickAdmissionWidget,
            benefits: next,
          },
        },
      };
    });
  };

  // Helper CRUD for Principal Pillars (Tab 6)
  const addPrincipalPillar = () => {
    setCmsData((prev: any) => {
      const currentPillars = prev.principalDesk?.pillars || [];
      const newPillar = {
        title: 'New Core Pillar',
        desc: 'Institutional excellence highlight...',
        iconKey: 'Sparkles',
        isActive: true,
      };
      return {
        ...prev,
        principalDesk: {
          ...prev.principalDesk,
          pillars: [...currentPillars, newPillar],
        },
      };
    });
    toast.success('New Core Pillar added.', 'Pillar Added');
  };

  const removePrincipalPillar = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.principalDesk?.pillars || [])];
      next.splice(idx, 1);
      return {
        ...prev,
        principalDesk: { ...prev.principalDesk, pillars: next },
      };
    });
  };

  const togglePrincipalPillar = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.principalDesk?.pillars || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return {
        ...prev,
        principalDesk: { ...prev.principalDesk, pillars: next },
      };
    });
  };

  // Helper CRUD for SSSD Highlights (Tab 7)
  const addSSSDHighlight = () => {
    setCmsData((prev: any) => {
      const cur = prev.sssdShowcase?.highlights || [];
      const newH = {
        title: 'New Highlight Title',
        subtitle: 'Key Feature',
        isActive: true,
      };
      return {
        ...prev,
        sssdShowcase: {
          ...prev.sssdShowcase,
          highlights: [...cur, newH],
        },
      };
    });
    toast.success('New SSSD highlight badge added.', 'Highlight Added');
  };

  const removeSSSDHighlight = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.sssdShowcase?.highlights || [])];
      next.splice(idx, 1);
      return {
        ...prev,
        sssdShowcase: { ...prev.sssdShowcase, highlights: next },
      };
    });
  };

  const toggleSSSDHighlight = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.sssdShowcase?.highlights || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return {
        ...prev,
        sssdShowcase: { ...prev.sssdShowcase, highlights: next },
      };
    });
  };

  // Helper CRUD for SSSD Educators & Teachers (Tab 7)
  const addSSSDTeacher = () => {
    setCmsData((prev: any) => {
      const cur = prev.sssdShowcase?.facultyMembers || [];
      const newTeacher = {
        name: 'New Faculty Name',
        role: 'Spoken English & Pedagogy Lead',
        exp: '★ 5+ Yrs Exp',
        qual: 'M.A., B.Ed.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85',
        tags: ['Cambridge TKT', 'Phonics Studio'],
        order: cur.length + 1,
        isActive: true,
      };
      return {
        ...prev,
        sssdShowcase: {
          ...prev.sssdShowcase,
          facultyMembers: [...cur, newTeacher],
        },
      };
    });
    toast.success('New Educator Mentor added to SSSD list.', 'Educator Added');
  };

  const removeSSSDTeacher = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.sssdShowcase?.facultyMembers || [])];
      next.splice(idx, 1);
      return {
        ...prev,
        sssdShowcase: { ...prev.sssdShowcase, facultyMembers: next },
      };
    });
  };

  const toggleSSSDTeacher = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.sssdShowcase?.facultyMembers || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return {
        ...prev,
        sssdShowcase: { ...prev.sssdShowcase, facultyMembers: next },
      };
    });
  };

  // Helper CRUD for Carousel (Tab 8)
  const addCarouselSlide = () => {
    setCmsData((prev: any) => {
      const cur = prev.campusCarousel || [];
      const newSlide = {
        title: 'New Campus Highlight',
        category: 'CAMPUS LIFE',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
        badge: 'Featured',
        desc: 'Highlight description and achievements...',
        order: cur.length + 1,
        isActive: true,
      };
      return { ...prev, campusCarousel: [...cur, newSlide] };
    });
    toast.success('New Carousel Slide added.', 'Slide Added');
  };

  const removeCarouselSlide = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.campusCarousel || [])];
      next.splice(idx, 1);
      return { ...prev, campusCarousel: next };
    });
  };

  const toggleCarouselSlide = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.campusCarousel || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return { ...prev, campusCarousel: next };
    });
  };

  // Helper CRUD for Video Testimonials (Tab 9)
  const addVideoTestimonial = () => {
    setCmsData((prev: any) => {
      const cur = prev.videoTestimonialsSection?.testimonials || [];
      const newTestimonial = {
        title: 'New Video Story',
        speakerName: 'Parent / Student Name',
        speakerRole: 'Parent of Class 10 Student',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: '',
        quote: 'Add inspiring quote or testimonial summary here...',
        badge: 'Parent Review',
        order: cur.length + 1,
        isActive: true,
      };
      return {
        ...prev,
        videoTestimonialsSection: {
          ...prev.videoTestimonialsSection,
          testimonials: [...cur, newTestimonial],
        },
      };
    });
    toast.success('New Video Testimonial added.', 'Testimonial Added');
  };

  const removeVideoTestimonial = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.videoTestimonialsSection?.testimonials || [])];
      next.splice(idx, 1);
      return {
        ...prev,
        videoTestimonialsSection: { ...prev.videoTestimonialsSection, testimonials: next },
      };
    });
  };

  const toggleVideoTestimonial = (idx: number) => {
    setCmsData((prev: any) => {
      const next = [...(prev.videoTestimonialsSection?.testimonials || [])];
      next[idx] = { ...next[idx], isActive: !next[idx].isActive };
      return {
        ...prev,
        videoTestimonialsSection: { ...prev.videoTestimonialsSection, testimonials: next },
      };
    });
  };

  const navTabs = [
    { id: 'identity', label: '1. Branding & Ticker', icon: <Building2 className="w-4 h-4" /> },
    { id: 'hero', label: '2. Hero & CTA Buttons', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'stats', label: '3. Stats Telemetry', icon: <Users className="w-4 h-4" /> },
    { id: 'wings', label: '4. Academic Wings', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'facilities', label: '5. Campus Facilities', icon: <Layers className="w-4 h-4" /> },
    { id: 'desk', label: '6. Leadership Desks', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'sssd', label: '7. SSSD English Wing', icon: <Award className="w-4 h-4" /> },
    { id: 'carousel', label: '8. 360° Showcase', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'testimonials', label: '9. Video Testimonials', icon: <Video className="w-4 h-4" /> },
    { id: 'footer', label: '10. Footer & Contacts', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin']}>
      <div className="space-y-6 pb-12">
        {/* Master Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" /> Full Dynamic CMS Engine (Cloudinary + Live Atlas DB)
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 font-serif">
              Institutional CMS &amp; Master Configuration
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual image uploads to Cloudinary CDN, live photo previews, headline management, button toggles, and subdocument CRUD.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 font-black shadow-lg shadow-blue-600/30 text-xs sm:text-sm px-6"
            isLoading={isSaving}
            onClick={() => handleSave()}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save All CMS Settings
          </Button>
        </div>

        {/* Visual Tab Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
          {navTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: IDENTITY & TICKER */}
        {activeTab === 'identity' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Header Announcement & Contact Strip (Full Master Control) */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 py-4 px-5 flex flex-row items-center justify-between text-white">
                <div>
                  <CardTitle className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 text-amber-300 font-serif">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> Top Notification &amp; Contact Strip (Navbar Top Bar)
                  </CardTitle>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    Controls the top bar displaying institutional address, phone, urgent announcement badge &amp; marquee ticker.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${
                    cmsData.ticker.isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {cmsData.ticker.isActive ? 'Active on Website' : 'Hidden from Website'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCmsData({
                        ...cmsData,
                        ticker: { ...cmsData.ticker, isActive: !cmsData.ticker.isActive },
                      })
                    }
                    className={`p-2 rounded-xl border transition shadow-sm ${
                      cmsData.ticker.isActive
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                    }`}
                    title={cmsData.ticker.isActive ? 'Click to Hide Top Strip' : 'Click to Show Top Strip'}
                  >
                    {cmsData.ticker.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-xs">
                {/* Live Real-Time Preview */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-600" /> Real-Time Top Bar Live Preview:
                  </label>
                  {cmsData.ticker.isActive ? (
                    <div className="bg-gradient-to-r from-[#000f28] via-[#001c44] to-[#000f28] text-slate-300 py-2 px-4 rounded-xl text-[11px] border border-white/10 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3 truncate text-slate-300">
                        {cmsData.ticker.showContactInfo !== false && (
                          <>
                            <span className="flex items-center gap-1 text-slate-300 truncate">
                              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                              <span className="truncate">{cmsData.address.street}, {cmsData.address.city}</span>
                            </span>
                            <span className="flex items-center gap-1 text-emerald-400 font-mono">
                              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{cmsData.contact.phone}</span>
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-black text-[10px]">
                          <Sparkles className="w-3 h-3 text-amber-400" /> {cmsData.ticker.badge || 'URGENT ANNOUNCEMENT'}
                        </span>
                        <span className="text-sky-300 font-extrabold flex items-center gap-1">
                          <span className="truncate max-w-xs">{cmsData.ticker.text}</span>
                          <ArrowRight className="w-3 h-3 text-amber-300" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-100 border border-dashed border-slate-300 text-slate-500 text-center text-xs font-semibold">
                      🚫 Top Notification Strip is currently turned OFF. (It will not be rendered on the website).
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  <Input
                    label="Announcement Badge Label"
                    value={cmsData.ticker.badge}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        ticker: { ...cmsData.ticker, badge: e.target.value },
                      })
                    }
                    placeholder="URGENT ANNOUNCEMENT"
                  />
                  <LinkDestinationSelector
                    label="Target Action Link / Destination"
                    value={cmsData.ticker.url}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        ticker: { ...cmsData.ticker, url },
                      })
                    }
                    helperText="Select verified internal page or enter custom link."
                  />
                  <Input
                    label="Google Maps Location URL"
                    value={cmsData.ticker.mapsUrl || 'https://maps.google.com/?q=Shamsabad+Farrukhabad+Uttar+Pradesh'}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        ticker: { ...cmsData.ticker, mapsUrl: e.target.value },
                      })
                    }
                    placeholder="https://maps.google.com/?q=..."
                  />
                </div>

                <RichTextEditor
                  label="Announcement Marquee Text / Headline (HTML & Rich text supported)"
                  value={cmsData.ticker.text}
                  onChange={(val) =>
                    setCmsData({
                      ...cmsData,
                      ticker: { ...cmsData.ticker, text: val },
                    })
                  }
                  placeholder="Admissions Open for Session 2026-2027 (Nursery to Class 12 PCM/PCB/Arts) • UP Board High School Results 99.4% Pass Rate"
                  minHeight="90px"
                  rows={2}
                />

                <div className="flex items-center gap-3 pt-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="showContactInfoCheck"
                    checked={cmsData.ticker.showContactInfo !== false}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        ticker: { ...cmsData.ticker, showContactInfo: e.target.checked },
                      })
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showContactInfoCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                    Show Institutional Address &amp; Contact Phone in Top Strip (Left Side)
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* School Identity */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5">
                <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" /> Institutional Identity &amp; Board Codes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Institution Name (Hindi) *"
                    value={cmsData.nameHindi}
                    onChange={(e) => setCmsData({ ...cmsData, nameHindi: e.target.value })}
                  />
                  <Input
                    label="Institution Name (English) *"
                    value={cmsData.name}
                    onChange={(e) => setCmsData({ ...cmsData, name: e.target.value })}
                  />
                </div>

                <Input
                  label="Institutional Motto / Tagline"
                  value={cmsData.tagline}
                  onChange={(e) => setCmsData({ ...cmsData, tagline: e.target.value })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="UP Board Affiliation Code *"
                    value={cmsData.affiliationCode}
                    onChange={(e) => setCmsData({ ...cmsData, affiliationCode: e.target.value })}
                  />
                  <Input
                    label="Exam Center Code"
                    value={cmsData.examinationCenterCode}
                    onChange={(e) => setCmsData({ ...cmsData, examinationCenterCode: e.target.value })}
                  />
                  <Input
                    label="Established Year"
                    value={cmsData.establishedYear}
                    onChange={(e) => setCmsData({ ...cmsData, establishedYear: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 2: HERO & CTA BUTTONS */}
        {activeTab === 'hero' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Hero Headlines & Visual Background */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5">
                <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Hero Headlines &amp; Background Photo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Hero Top Badge Text"
                    value={cmsData.hero.badge.text}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero: {
                          ...cmsData.hero,
                          badge: { ...cmsData.hero.badge, text: e.target.value },
                        },
                      })
                    }
                  />
                  <Input
                    label="Hero Headline Subtitle"
                    value={cmsData.hero.subtitle}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero: { ...cmsData.hero, subtitle: e.target.value },
                      })
                    }
                  />
                </div>

                <RichTextEditor
                  label="Hero Descriptive Paragraph (HTML & Styling Supported)"
                  value={cmsData.hero.description}
                  onChange={(val) =>
                    setCmsData({
                      ...cmsData,
                      hero: { ...cmsData.hero, description: val },
                    })
                  }
                  placeholder="Enter high-impact institutional description with formatting, highlights, and links..."
                  minHeight="120px"
                  rows={4}
                />

                {/* Live Image Uploader for Hero Banner */}
                <ImageUploader
                  label="Hero Banner Background Photo (Cloudinary CDN)"
                  value={cmsData.hero.bgImageUrl}
                  onChange={(url) =>
                    setCmsData({
                      ...cmsData,
                      hero: { ...cmsData.hero, bgImageUrl: url },
                    })
                  }
                  aspectRatio="wide"
                  helperText="Upload high-resolution landscape campus photograph (1920x800 recommended). Stored securely on Cloudinary CDN."
                />
              </CardContent>
            </Card>

            {/* CTA Action Buttons (Apply Online 2026-27 & ERP) */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-blue-50 border-b border-blue-200 py-3.5 px-5">
                <CardTitle className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-blue-600" /> Hero CTA Action Buttons Control
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6 text-xs">
                {/* Primary Button */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Primary Action Button (&ldquo;Apply Online&rdquo;)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCmsData({
                          ...cmsData,
                          hero: {
                            ...cmsData.hero,
                            primaryBtn: {
                              ...cmsData.hero.primaryBtn,
                              isActive: !cmsData.hero.primaryBtn.isActive,
                            },
                          },
                        })
                      }
                      className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        cmsData.hero.primaryBtn.isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      {cmsData.hero.primaryBtn.isActive ? 'Active (Visible)' : 'Disabled (Hidden)'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Button Label Text"
                      value={cmsData.hero.primaryBtn.text}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          hero: {
                            ...cmsData.hero,
                            primaryBtn: { ...cmsData.hero.primaryBtn, text: e.target.value },
                          },
                        })
                      }
                    />
                    <LinkDestinationSelector
                      label="Target Link Destination"
                      value={cmsData.hero.primaryBtn.url}
                      onChange={(url) =>
                        setCmsData({
                          ...cmsData,
                          hero: {
                            ...cmsData.hero,
                            primaryBtn: { ...cmsData.hero.primaryBtn, url },
                          },
                        })
                      }
                      helperText="Select verified internal page or enter custom external link."
                    />
                  </div>
                </div>

                {/* Secondary Button */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800" /> Secondary Button (&ldquo;Central ERP Portal&rdquo;)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCmsData({
                          ...cmsData,
                          hero: {
                            ...cmsData.hero,
                            secondaryBtn: {
                              ...cmsData.hero.secondaryBtn,
                              isActive: !cmsData.hero.secondaryBtn.isActive,
                            },
                          },
                        })
                      }
                      className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        cmsData.hero.secondaryBtn.isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-300 text-slate-700'
                      }`}
                    >
                      {cmsData.hero.secondaryBtn.isActive ? 'Active (Visible)' : 'Disabled (Hidden)'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Button Label Text"
                      value={cmsData.hero.secondaryBtn.text}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          hero: {
                            ...cmsData.hero,
                            secondaryBtn: { ...cmsData.hero.secondaryBtn, text: e.target.value },
                          },
                        })
                      }
                    />
                    <LinkDestinationSelector
                      label="Target Link Destination"
                      value={cmsData.hero.secondaryBtn.url}
                      onChange={(url) =>
                        setCmsData({
                          ...cmsData,
                          hero: {
                            ...cmsData.hero,
                            secondaryBtn: { ...cmsData.hero.secondaryBtn, url },
                          },
                        })
                      }
                      helperText="Select verified internal page or enter custom external link."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Admission Widget */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" /> Quick Admission Widget Card
                </CardTitle>
                <button
                  type="button"
                  onClick={() =>
                    setCmsData({
                      ...cmsData,
                      hero: {
                        ...cmsData.hero,
                        quickAdmissionWidget: {
                          ...cmsData.hero.quickAdmissionWidget,
                          isActive: !cmsData.hero.quickAdmissionWidget.isActive,
                        },
                      },
                    })
                  }
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    cmsData.hero.quickAdmissionWidget.isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {cmsData.hero.quickAdmissionWidget.isActive ? 'Active' : 'Hidden'}
                </button>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Widget Card Title"
                    value={cmsData.hero.quickAdmissionWidget.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero: {
                          ...cmsData.hero,
                          quickAdmissionWidget: {
                            ...cmsData.hero.quickAdmissionWidget,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                  />
                  <Input
                    label="Widget Subtitle"
                    value={cmsData.hero.quickAdmissionWidget.subtitle}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero: {
                          ...cmsData.hero,
                          quickAdmissionWidget: {
                            ...cmsData.hero.quickAdmissionWidget,
                            subtitle: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>

                <RichTextEditor
                  label="Admission Card Narrative & Details"
                  value={cmsData.hero.quickAdmissionWidget.description}
                  onChange={(val) =>
                    setCmsData({
                      ...cmsData,
                      hero: {
                        ...cmsData.hero,
                        quickAdmissionWidget: {
                          ...cmsData.hero.quickAdmissionWidget,
                          description: val,
                        },
                      },
                    })
                  }
                  placeholder="Admissions open for academic session 2026-27. Submit an online inquiry for instant counseling."
                  minHeight="80px"
                  rows={2}
                />

                {/* Benefits List CRUD */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      Admission Card Feature Highlights Checklist
                    </label>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addHeroBenefit}
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                    >
                      Add Benefit Point
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {(cmsData.hero?.quickAdmissionWidget?.benefits || []).map((ben: any, bIdx: number) => (
                      <div
                        key={bIdx}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border ${
                          ben.isActive ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-dashed opacity-60'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <input
                          type="text"
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                          value={ben.text}
                          onChange={(e) => {
                            const next = [...(cmsData.hero?.quickAdmissionWidget?.benefits || [])];
                            next[bIdx] = { ...next[bIdx], text: e.target.value };
                            setCmsData({
                              ...cmsData,
                              hero: {
                                ...cmsData.hero,
                                quickAdmissionWidget: {
                                  ...cmsData.hero.quickAdmissionWidget,
                                  benefits: next,
                                },
                              },
                            });
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => toggleHeroBenefit(bIdx)}
                          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                          title="Toggle Active/Inactive"
                        >
                          {ben.isActive ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeHeroBenefit(bIdx)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                          title="Delete Point"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                  <Input
                    label="Admission Card Action Button Label"
                    value={cmsData.hero.quickAdmissionWidget.buttonText}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        hero: {
                          ...cmsData.hero,
                          quickAdmissionWidget: {
                            ...cmsData.hero.quickAdmissionWidget,
                            buttonText: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="SUBMIT ADMISSION INQUIRY"
                  />
                  <LinkDestinationSelector
                    label="Action Button Target Destination"
                    value={cmsData.hero.quickAdmissionWidget.buttonUrl}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        hero: {
                          ...cmsData.hero,
                          quickAdmissionWidget: {
                            ...cmsData.hero.quickAdmissionWidget,
                            buttonUrl: url,
                          },
                        },
                      })
                    }
                    helperText="Select verified internal page or enter custom link."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 3: STATS TELEMETRY (FULL CRUD) */}
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-black text-slate-900 text-sm font-serif">Key Institutional Stats Counters</h3>
                <p className="text-xs text-slate-500">Manage, reorder, create or hide live numbers on the home page.</p>
              </div>
              <Button type="button" size="sm" onClick={addStat} leftIcon={<Plus className="w-4 h-4" />}>
                Add New Stat
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(cmsData.stats || []).map((st: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-4 rounded-3xl border transition space-y-3 ${
                    st.isActive ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-dashed border-slate-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      Stat #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleStat(idx)}
                        className={`p-1.5 rounded-xl text-xs font-bold transition ${
                          st.isActive ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-200'
                        }`}
                        title="Toggle Active"
                      >
                        {st.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeStat(idx)}
                        className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 transition"
                        title="Delete Stat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <Input
                      label="Counter Value (e.g. 2,500+)"
                      value={st.value}
                      onChange={(e) => {
                        const next = [...(cmsData.stats || [])];
                        next[idx].value = e.target.value;
                        setCmsData({ ...cmsData, stats: next });
                      }}
                    />
                    <Input
                      label="Metric Label"
                      value={st.label}
                      onChange={(e) => {
                        const next = [...(cmsData.stats || [])];
                        next[idx].label = e.target.value;
                        setCmsData({ ...cmsData, stats: next });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ACADEMIC WINGS (FULL CRUD WITH CLOUDINARY IMAGE UPLOADER) */}
        {activeTab === 'wings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-black text-slate-900 text-sm font-serif">Comprehensive Academic Wings</h3>
                <p className="text-xs text-slate-500">Upload photos directly to Cloudinary, edit curriculum details, or toggle visibility.</p>
              </div>
              <Button type="button" size="sm" onClick={addWing} leftIcon={<Plus className="w-4 h-4" />}>
                Add Academic Wing
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(cmsData.academicWings || []).map((w: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl border space-y-4 transition ${
                    w.isActive ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-dashed border-slate-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Wing #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{w.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleWing(idx)}
                        className={`p-1.5 rounded-xl border transition ${
                          w.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {w.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeWing(idx)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Wing Title"
                      value={w.title}
                      onChange={(e) => {
                        const next = [...(cmsData.academicWings || [])];
                        next[idx].title = e.target.value;
                        setCmsData({ ...cmsData, academicWings: next });
                      }}
                    />
                    <Input
                      label="Grades Scope (e.g. Nursery to Class 5)"
                      value={w.grades}
                      onChange={(e) => {
                        const next = [...(cmsData.academicWings || [])];
                        next[idx].grades = e.target.value;
                        setCmsData({ ...cmsData, academicWings: next });
                      }}
                    />
                  </div>

                  {/* Visual Image Uploader */}
                  <ImageUploader
                    label="Wing Showcase Image (Cloudinary CDN)"
                    value={w.image}
                    onChange={(url) => {
                      const next = [...(cmsData.academicWings || [])];
                      next[idx].image = url;
                      setCmsData({ ...cmsData, academicWings: next });
                    }}
                    aspectRatio="video"
                  />

                    <RichTextEditor
                      label="Curriculum & Wing Summary (HTML Supported)"
                      value={w.desc}
                      onChange={(val) => {
                        const next = [...(cmsData.academicWings || [])];
                        next[idx].desc = val;
                        setCmsData({ ...cmsData, academicWings: next });
                      }}
                      minHeight="80px"
                      rows={2}
                    />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FACILITIES & LABS (FULL CRUD WITH CLOUDINARY IMAGE UPLOADER) */}
        {activeTab === 'facilities' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-black text-slate-900 text-sm font-serif">Campus Facilities &amp; Science Labs</h3>
                <p className="text-xs text-slate-500">Visual photo previews with Cloudinary upload for all laboratories and infrastructure.</p>
              </div>
              <Button type="button" size="sm" onClick={addFacility} leftIcon={<Plus className="w-4 h-4" />}>
                Add Facility / Lab
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(cmsData.facilities || []).map((fac: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl border space-y-4 transition ${
                    fac.isActive ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-dashed border-slate-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      Facility #{idx + 1} &bull; {fac.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFacility(idx)}
                        className={`p-1.5 rounded-xl border transition ${
                          fac.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {fac.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFacility(idx)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <Input
                    label="Facility Name"
                    value={fac.title}
                    onChange={(e) => {
                      const next = [...(cmsData.facilities || [])];
                      next[idx].title = e.target.value;
                      setCmsData({ ...cmsData, facilities: next });
                    }}
                  />

                  {/* Visual Image Uploader */}
                  <ImageUploader
                    label="Facility / Lab Photo (Cloudinary CDN)"
                    value={fac.image}
                    onChange={(url) => {
                      const next = [...(cmsData.facilities || [])];
                      next[idx].image = url;
                      setCmsData({ ...cmsData, facilities: next });
                    }}
                    aspectRatio="video"
                  />

                    <RichTextEditor
                      label="Equipment & Features Summary (HTML Supported)"
                      value={fac.desc}
                      onChange={(val) => {
                        const next = [...(cmsData.facilities || [])];
                        next[idx].desc = val;
                        setCmsData({ ...cmsData, facilities: next });
                      }}
                      minHeight="80px"
                      rows={2}
                    />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: LEADERSHIP DESKS (WITH PHOTO & SIGNATURE UPLOADER) */}
        {activeTab === 'desk' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Principal Desk */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Principal Desk Leadership Card
                </CardTitle>
                <button
                  type="button"
                  onClick={() =>
                    setCmsData({
                      ...cmsData,
                      principalDesk: {
                        ...cmsData.principalDesk,
                        isActive: !cmsData.principalDesk.isActive,
                      },
                    })
                  }
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    cmsData.principalDesk.isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {cmsData.principalDesk.isActive ? 'Active' : 'Hidden'}
                </button>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Principal Full Name *"
                    value={cmsData.principalDesk.name}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        principalDesk: { ...cmsData.principalDesk, name: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Academic Qualifications"
                    value={cmsData.principalDesk.qualifications}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        principalDesk: { ...cmsData.principalDesk, qualifications: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Leadership Badge Text"
                    value={cmsData.principalDesk.experience}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        principalDesk: { ...cmsData.principalDesk, experience: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  {/* Principal Portrait Uploader */}
                  <ImageUploader
                    label="Principal Formal Portrait Photo"
                    value={cmsData.principalDesk.photoUrl}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        principalDesk: { ...cmsData.principalDesk, photoUrl: url },
                      })
                    }
                    aspectRatio="portrait"
                    helperText="Formal vertical portrait (3:4 ratio). Stored on Cloudinary."
                  />

                  {/* Principal Signature Stamp Uploader */}
                  <ImageUploader
                    label="Principal Official Digital Signature Stamp"
                    value={cmsData.principalDesk.signatureUrl}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        principalDesk: { ...cmsData.principalDesk, signatureUrl: url },
                      })
                    }
                    aspectRatio="video"
                    helperText="Transparent PNG signature stamp for certificates & desk letters."
                  />

                  {/* Principal Official Round Seal / Muhar */}
                  <ImageUploader
                    label="Principal Official Round Seal / Muhar"
                    value={cmsData.principalDesk.roundSealUrl}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        principalDesk: { ...cmsData.principalDesk, roundSealUrl: url },
                      })
                    }
                    aspectRatio="square"
                    helperText="Official institutional round seal stamp (Muhar) for marksheets, certificates & letters."
                  />
                </div>

                <Input
                  label="Vision Quote Title"
                  value={cmsData.principalDesk.quote}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      principalDesk: { ...cmsData.principalDesk, quote: e.target.value },
                    })
                  }
                />

                <RichTextEditor
                  label="Full Welcome Message Excerpt (HTML & Rich Text Supported)"
                  value={cmsData.principalDesk.message}
                  onChange={(val) =>
                    setCmsData({
                      ...cmsData,
                      principalDesk: { ...cmsData.principalDesk, message: val },
                    })
                  }
                  placeholder="Enter detailed inspirational welcome letter from the Principal's desk..."
                  minHeight="140px"
                  rows={5}
                />

                {/* Principal Core Pillars CRUD */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">Principal Desk 3 Core Pillars</h4>
                      <p className="text-[11px] text-slate-500">Highlights displayed below the welcome letter.</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addPrincipalPillar}
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                    >
                      Add Core Pillar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(cmsData.principalDesk?.pillars || []).map((pil: any, pIdx: number) => (
                      <div
                        key={pIdx}
                        className={`p-3 rounded-2xl border transition space-y-2 ${
                          pil.isActive ? 'bg-slate-50 border-slate-200' : 'bg-slate-100 border-dashed opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-blue-700">Pillar #{pIdx + 1}</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => togglePrincipalPillar(pIdx)}
                              className="p-1 rounded text-slate-500 hover:bg-slate-200"
                              title="Toggle Active"
                            >
                              {pil.isActive ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => removePrincipalPillar(pIdx)}
                              className="p-1 rounded text-rose-500 hover:bg-rose-100"
                              title="Delete Pillar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="Pillar Title"
                          className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold"
                          value={pil.title}
                          onChange={(e) => {
                            const next = [...(cmsData.principalDesk?.pillars || [])];
                            next[pIdx] = { ...next[pIdx], title: e.target.value };
                            setCmsData({
                              ...cmsData,
                              principalDesk: { ...cmsData.principalDesk, pillars: next },
                            });
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Pillar Description"
                          className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-[11px]"
                          value={pil.desc}
                          onChange={(e) => {
                            const next = [...(cmsData.principalDesk?.pillars || [])];
                            next[pIdx] = { ...next[pIdx], desc: e.target.value };
                            setCmsData({
                              ...cmsData,
                              principalDesk: { ...cmsData.principalDesk, pillars: next },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Headmistress Desk (SSSD) */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-emerald-50 border-b border-emerald-200 py-3.5 px-5 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" /> SSSD Headmistress Desk Card
                </CardTitle>
                <button
                  type="button"
                  onClick={() =>
                    setCmsData({
                      ...cmsData,
                      headmistressDesk: {
                        ...cmsData.headmistressDesk,
                        isActive: !cmsData.headmistressDesk.isActive,
                      },
                    })
                  }
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    cmsData.headmistressDesk.isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {cmsData.headmistressDesk.isActive ? 'Active' : 'Hidden'}
                </button>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Headmistress Name"
                    value={cmsData.headmistressDesk.name}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        headmistressDesk: { ...cmsData.headmistressDesk, name: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Qualifications"
                    value={cmsData.headmistressDesk.qualifications}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        headmistressDesk: { ...cmsData.headmistressDesk, qualifications: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Leadership Badge"
                    value={cmsData.headmistressDesk.experience}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        headmistressDesk: { ...cmsData.headmistressDesk, experience: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  <ImageUploader
                    label="Headmistress Portrait Photo"
                    value={cmsData.headmistressDesk.photoUrl}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        headmistressDesk: { ...cmsData.headmistressDesk, photoUrl: url },
                      })
                    }
                    aspectRatio="portrait"
                    helperText="Formal vertical portrait (3:4 ratio)."
                  />

                  <ImageUploader
                    label="Headmistress Digital Signature Stamp"
                    value={cmsData.headmistressDesk.signatureUrl}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        headmistressDesk: { ...cmsData.headmistressDesk, signatureUrl: url },
                      })
                    }
                    aspectRatio="video"
                    helperText="Transparent PNG signature stamp for certificates."
                  />

                  <ImageUploader
                    label="SSSD Official Round Seal / Muhar"
                    value={cmsData.headmistressDesk.roundSealUrl}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        headmistressDesk: { ...cmsData.headmistressDesk, roundSealUrl: url },
                      })
                    }
                    aspectRatio="square"
                    helperText="SSSD English Wing official circular seal stamp (Muhar)."
                  />
                </div>

                <Input
                  label="Headmistress Vision Quote"
                  value={cmsData.headmistressDesk.quote}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      headmistressDesk: { ...cmsData.headmistressDesk, quote: e.target.value },
                    })
                  }
                />

                <RichTextEditor
                  label="Headmistress Welcome Message Excerpt (HTML & Rich Text Supported)"
                  value={cmsData.headmistressDesk.message}
                  onChange={(val) =>
                    setCmsData({
                      ...cmsData,
                      headmistressDesk: { ...cmsData.headmistressDesk, message: val },
                    })
                  }
                  placeholder="Enter Headmistress message regarding spoken English, CBSE curriculum, and activity learning..."
                  minHeight="120px"
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 7: SSSD ENGLISH WING */}
        {activeTab === 'sssd' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-emerald-950 text-white py-4 px-6 rounded-t-2xl flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-300" /> SSSD Public School Showcase Portal
                  </CardTitle>
                  <p className="text-xs text-emerald-200 mt-0.5">100% English medium campus banner on the home page.</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCmsData({
                      ...cmsData,
                      sssdShowcase: {
                        ...cmsData.sssdShowcase,
                        isActive: !cmsData.sssdShowcase.isActive,
                      },
                    })
                  }
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition ${
                    cmsData.sssdShowcase.isActive
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {cmsData.sssdShowcase.isActive ? 'Active on Home' : 'Hidden'}
                </button>
              </CardHeader>
              <CardContent className="p-6 space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="SSSD Wing Title"
                    value={cmsData.sssdShowcase.title}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        sssdShowcase: { ...cmsData.sssdShowcase, title: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="SSSD Badge Text"
                    value={cmsData.sssdShowcase.badge}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        sssdShowcase: { ...cmsData.sssdShowcase, badge: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Visual Image Uploader */}
                  <ImageUploader
                    label="SSSD Smart Classroom / Campus Showcase Photo"
                    value={cmsData.sssdShowcase.imageUrl}
                    onChange={(url) =>
                      setCmsData({
                        ...cmsData,
                        sssdShowcase: { ...cmsData.sssdShowcase, imageUrl: url },
                      })
                    }
                    aspectRatio="video"
                  />
                  <div className="space-y-4">
                    <Input
                      label="WhatsApp Counselor Phone (+91...)"
                      value={cmsData.sssdShowcase.whatsappNumber}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          sssdShowcase: { ...cmsData.sssdShowcase, whatsappNumber: e.target.value },
                        })
                      }
                    />
                    <LinkDestinationSelector
                      label="Destination Portal Link"
                      value={cmsData.sssdShowcase.admissionUrl}
                      onChange={(url) =>
                        setCmsData({
                          ...cmsData,
                          sssdShowcase: { ...cmsData.sssdShowcase, admissionUrl: url },
                        })
                      }
                      helperText="Page opened when clicking SSSD apply / learn more button."
                    />
                  </div>
                </div>

                <RichTextEditor
                  label="SSSD Descriptive Pitch (HTML & Styling Supported)"
                  value={cmsData.sssdShowcase.description}
                  onChange={(val) =>
                    setCmsData({
                      ...cmsData,
                      sssdShowcase: { ...cmsData.sssdShowcase, description: val },
                    })
                  }
                  placeholder="Enter detailed English wing introduction and CBSE highlights..."
                  minHeight="110px"
                  rows={3}
                />

                {/* SSSD Highlights CRUD */}
                <div className="space-y-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">SSSD Feature Highlights Badges</h4>
                      <p className="text-[11px] text-slate-500">Badges displayed directly on the English wing banner.</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addSSSDHighlight}
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                    >
                      Add Feature Highlight
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(cmsData.sssdShowcase?.highlights || []).map((hl: any, hIdx: number) => (
                      <div
                        key={hIdx}
                        className={`p-3 rounded-2xl border transition space-y-2 ${
                          hl.isActive ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-100 border-dashed opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-emerald-800">Badge #{hIdx + 1}</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => toggleSSSDHighlight(hIdx)}
                              className="p-1 rounded text-slate-500 hover:bg-slate-200"
                              title="Toggle Active"
                            >
                              {hl.isActive ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeSSSDHighlight(hIdx)}
                              className="p-1 rounded text-rose-500 hover:bg-rose-100"
                              title="Delete Highlight"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="Highlight Title"
                          className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold"
                          value={hl.title}
                          onChange={(e) => {
                            const next = [...(cmsData.sssdShowcase?.highlights || [])];
                            next[hIdx] = { ...next[hIdx], title: e.target.value };
                            setCmsData({
                              ...cmsData,
                              sssdShowcase: { ...cmsData.sssdShowcase, highlights: next },
                            });
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Subtitle / Tag"
                          className="w-full px-2.5 py-1 rounded-lg border border-slate-300 text-[11px]"
                          value={hl.subtitle}
                          onChange={(e) => {
                            const next = [...(cmsData.sssdShowcase?.highlights || [])];
                            next[hIdx] = { ...next[hIdx], subtitle: e.target.value };
                            setCmsData({
                              ...cmsData,
                              sssdShowcase: { ...cmsData.sssdShowcase, highlights: next },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* SSSD English Language Educators & Mentors CRUD */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600" /> SSSD English Language Educators &amp; Mentors
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Manage faculty profiles, portrait photos, experience badges, qualifications and skill tags displayed on the SSSD wing page.
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addSSSDTeacher}
                      leftIcon={<Plus className="w-3.5 h-3.5" />}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Add Educator / Mentor
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(cmsData.sssdShowcase?.facultyMembers || []).map((teacher: any, tIdx: number) => (
                      <div
                        key={tIdx}
                        className={`p-4 rounded-2xl border transition space-y-3.5 ${
                          teacher.isActive
                            ? 'bg-emerald-50/30 border-emerald-200 shadow-sm'
                            : 'bg-slate-100 border-dashed opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            Educator #{tIdx + 1} &bull; {teacher.name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => toggleSSSDTeacher(tIdx)}
                              className="p-1.5 rounded-lg text-slate-600 hover:bg-emerald-100 transition"
                              title="Toggle Visibility"
                            >
                              {teacher.isActive ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeSSSDTeacher(tIdx)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 transition"
                              title="Delete Educator"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Educator Full Name *"
                            value={teacher.name}
                            onChange={(e) => {
                              const next = [...(cmsData.sssdShowcase?.facultyMembers || [])];
                              next[tIdx] = { ...next[tIdx], name: e.target.value };
                              setCmsData({
                                ...cmsData,
                                sssdShowcase: { ...cmsData.sssdShowcase, facultyMembers: next },
                              });
                            }}
                            placeholder="Mrs. Ananya Sen"
                          />
                          <Input
                            label="Role / Designation *"
                            value={teacher.role}
                            onChange={(e) => {
                              const next = [...(cmsData.sssdShowcase?.facultyMembers || [])];
                              next[tIdx] = { ...next[tIdx], role: e.target.value };
                              setCmsData({
                                ...cmsData,
                                sssdShowcase: { ...cmsData.sssdShowcase, facultyMembers: next },
                              });
                            }}
                            placeholder="Headmistress & Spoken English Lead"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Experience Badge (e.g. 14+ Yrs Exp)"
                            value={teacher.exp}
                            onChange={(e) => {
                              const next = [...(cmsData.sssdShowcase?.facultyMembers || [])];
                              next[tIdx] = { ...next[tIdx], exp: e.target.value };
                              setCmsData({
                                ...cmsData,
                                sssdShowcase: { ...cmsData.sssdShowcase, facultyMembers: next },
                              });
                            }}
                            placeholder="14+ Yrs Exp"
                          />
                          <Input
                            label="Academic Qualifications"
                            value={teacher.qual}
                            onChange={(e) => {
                              const next = [...(cmsData.sssdShowcase?.facultyMembers || [])];
                              next[tIdx] = { ...next[tIdx], qual: e.target.value };
                              setCmsData({
                                ...cmsData,
                                sssdShowcase: { ...cmsData.sssdShowcase, facultyMembers: next },
                              });
                            }}
                            placeholder="M.A. English (Gold Medalist), B.Ed."
                          />
                        </div>

                        <ImageUploader
                          label="Educator Portrait Photograph"
                          value={teacher.image}
                          onChange={(url) => {
                            const next = [...(cmsData.sssdShowcase?.facultyMembers || [])];
                            next[tIdx] = { ...next[tIdx], image: url };
                            setCmsData({
                              ...cmsData,
                              sssdShowcase: { ...cmsData.sssdShowcase, facultyMembers: next },
                            });
                          }}
                          aspectRatio="portrait"
                          helperText="Formal vertical portrait photo (3:4 ratio)."
                        />

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Skill &amp; Specialization Badges (Comma-separated)
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                            value={Array.isArray(teacher.tags) ? teacher.tags.join(', ') : teacher.tags || ''}
                            onChange={(e) => {
                              const tagsArray = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                              const next = [...(cmsData.sssdShowcase?.facultyMembers || [])];
                              next[tIdx] = { ...next[tIdx], tags: tagsArray };
                              setCmsData({
                                ...cmsData,
                                sssdShowcase: { ...cmsData.sssdShowcase, facultyMembers: next },
                              });
                            }}
                            placeholder="Cambridge TKT, Phonics Studio, Debate Mentor"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TAB 8: CAMPUS CAROUSEL (FULL CRUD WITH CLOUDINARY IMAGE UPLOADER) */}
        {activeTab === 'carousel' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-black text-slate-900 text-sm font-serif">360° Infinite Campus Showcase</h3>
                <p className="text-xs text-slate-500">Live image previews and direct Cloudinary uploads for all carousel slides.</p>
              </div>
              <Button type="button" size="sm" onClick={addCarouselSlide} leftIcon={<Plus className="w-4 h-4" />}>
                Add Showcase Slide
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(cmsData.campusCarousel || []).map((slide: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl border space-y-4 transition ${
                    slide.isActive ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-dashed border-slate-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                      Slide #{idx + 1} &bull; {slide.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleCarouselSlide(idx)}
                        className={`p-1.5 rounded-xl border transition ${
                          slide.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {slide.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeCarouselSlide(idx)}
                        className="p-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Slide Title"
                      value={slide.title}
                      onChange={(e) => {
                        const next = [...(cmsData.campusCarousel || [])];
                        next[idx].title = e.target.value;
                        setCmsData({ ...cmsData, campusCarousel: next });
                      }}
                    />
                    <Input
                      label="Category (e.g. LABS / CAMPUS LIFE)"
                      value={slide.category}
                      onChange={(e) => {
                        const next = [...(cmsData.campusCarousel || [])];
                        next[idx].category = e.target.value;
                        setCmsData({ ...cmsData, campusCarousel: next });
                      }}
                    />
                  </div>

                  {/* Visual Image Uploader */}
                  <ImageUploader
                    label="Slide Photograph (Cloudinary CDN)"
                    value={slide.image}
                    onChange={(url) => {
                      const next = [...(cmsData.campusCarousel || [])];
                      next[idx].image = url;
                      setCmsData({ ...cmsData, campusCarousel: next });
                    }}
                    aspectRatio="video"
                  />

                    <RichTextEditor
                      label="Slide Description (HTML Supported)"
                      value={slide.desc}
                      onChange={(val) => {
                        const next = [...(cmsData.campusCarousel || [])];
                        next[idx].desc = val;
                        setCmsData({ ...cmsData, campusCarousel: next });
                      }}
                      minHeight="70px"
                      rows={2}
                    />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: VIDEO TESTIMONIALS (YOUTUBE INTEGRATION) */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Section Master Controls */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-4 h-4 text-rose-600" /> Video Testimonials &amp; Authentic Success Stories
                </CardTitle>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Section Status:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setCmsData({
                        ...cmsData,
                        videoTestimonialsSection: {
                          ...cmsData.videoTestimonialsSection,
                          isActive: !cmsData.videoTestimonialsSection?.isActive,
                        },
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition ${
                      cmsData.videoTestimonialsSection?.isActive !== false
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cmsData.videoTestimonialsSection?.isActive !== false ? 'Live on Website' : 'Hidden'}
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Section Badge Text"
                    value={cmsData.videoTestimonialsSection?.badge || ''}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        videoTestimonialsSection: {
                          ...cmsData.videoTestimonialsSection,
                          badge: e.target.value,
                        },
                      })
                    }
                    placeholder="Video Testimonials • Community Trust"
                  />
                  <Input
                    label="Section Main Title *"
                    value={cmsData.videoTestimonialsSection?.title || ''}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        videoTestimonialsSection: {
                          ...cmsData.videoTestimonialsSection,
                          title: e.target.value,
                        },
                      })
                    }
                    placeholder="Real Stories, Authentic Voices"
                  />
                  <Input
                    label="Section Subtitle / Tagline"
                    value={cmsData.videoTestimonialsSection?.subtitle || ''}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        videoTestimonialsSection: {
                          ...cmsData.videoTestimonialsSection,
                          subtitle: e.target.value,
                        },
                      })
                    }
                    placeholder="PARENT & STUDENT EXPERIENCES"
                  />
                </div>

                <RichTextEditor
                  label="Section Pitch & Narrative Description"
                  value={cmsData.videoTestimonialsSection?.description || ''}
                  onChange={(val) =>
                    setCmsData({
                      ...cmsData,
                      videoTestimonialsSection: {
                        ...cmsData.videoTestimonialsSection,
                        description: val,
                      },
                    })
                  }
                  helperText="Introductory paragraph highlighting community faith and academic outcomes."
                />
              </CardContent>
            </Card>

            {/* Testimonials List (CRUD) */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="font-black text-slate-900 text-sm font-serif flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-rose-600" /> Video Testimonial Library
                </h3>
                <p className="text-xs text-slate-500">
                  Add parent reviews, alumni achievements, and student experiences with YouTube links.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={addVideoTestimonial}
                leftIcon={<Plus className="w-4 h-4" />}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Add Video Story
              </Button>
            </div>

            <div className="space-y-6">
              {(cmsData.videoTestimonialsSection?.testimonials || []).map((test: any, idx: number) => {
                const ytId = extractYouTubeId(test.youtubeUrl);
                const isYtValid = Boolean(ytId);

                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-3xl border transition space-y-4 ${
                      test.isActive
                        ? 'bg-white border-slate-200 shadow-md'
                        : 'bg-slate-100 border-dashed border-slate-300 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                          Video Story #{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
                          {test.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleVideoTestimonial(idx)}
                          className={`p-1.5 rounded-xl border transition ${
                            test.isActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                          title="Toggle Live Visibility"
                        >
                          {test.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeVideoTestimonial(idx)}
                          className="p-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition"
                          title="Delete Video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left 2 Cols: Form Fields */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Video Story Title *"
                            value={test.title}
                            onChange={(e) => {
                              const next = [...(cmsData.videoTestimonialsSection?.testimonials || [])];
                              next[idx] = { ...next[idx], title: e.target.value };
                              setCmsData({
                                ...cmsData,
                                videoTestimonialsSection: {
                                  ...cmsData.videoTestimonialsSection,
                                  testimonials: next,
                                },
                              });
                            }}
                            placeholder="e.g. A Parent's Proud Journey"
                          />
                          <Input
                            label="Category Badge"
                            value={test.badge || ''}
                            onChange={(e) => {
                              const next = [...(cmsData.videoTestimonialsSection?.testimonials || [])];
                              next[idx] = { ...next[idx], badge: e.target.value };
                              setCmsData({
                                ...cmsData,
                                videoTestimonialsSection: {
                                  ...cmsData.videoTestimonialsSection,
                                  testimonials: next,
                                },
                              });
                            }}
                            placeholder="Parent Experience / Alumni Success"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Speaker / Parent / Student Full Name *"
                            value={test.speakerName}
                            onChange={(e) => {
                              const next = [...(cmsData.videoTestimonialsSection?.testimonials || [])];
                              next[idx] = { ...next[idx], speakerName: e.target.value };
                              setCmsData({
                                ...cmsData,
                                videoTestimonialsSection: {
                                  ...cmsData.videoTestimonialsSection,
                                  testimonials: next,
                                },
                              });
                            }}
                            placeholder="Dr. Ramesh Chandra Mishra"
                          />
                          <Input
                            label="Speaker Role / Context"
                            value={test.speakerRole}
                            onChange={(e) => {
                              const next = [...(cmsData.videoTestimonialsSection?.testimonials || [])];
                              next[idx] = { ...next[idx], speakerRole: e.target.value };
                              setCmsData({
                                ...cmsData,
                                videoTestimonialsSection: {
                                  ...cmsData.videoTestimonialsSection,
                                  testimonials: next,
                                },
                              });
                            }}
                            placeholder="Parent of Class 12 Science Topper"
                          />
                        </div>

                        {/* Universal Video Uploader (Web Link or Direct File Upload) */}
                        <VideoUploader
                          label="Video Source (YouTube, Vimeo, Cloudinary, or Direct File Upload) *"
                          value={test.videoUrl || test.youtubeUrl || ''}
                          onChange={(url) => {
                            const next = [...(cmsData.videoTestimonialsSection?.testimonials || [])];
                            next[idx] = {
                              ...next[idx],
                              videoUrl: url,
                              youtubeUrl: url,
                            };
                            setCmsData({
                              ...cmsData,
                              videoTestimonialsSection: {
                                ...cmsData.videoTestimonialsSection,
                                testimonials: next,
                              },
                            });
                          }}
                          posterUrl={test.thumbnailUrl}
                          helperText="Paste YouTube/Vimeo/Cloudinary link, OR click 'Direct File Upload' to upload MP4/WebM short video."
                          required
                        />

                        {/* Quote / Summary */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Key Testimonial Quote / Experience Summary
                          </label>
                          <textarea
                            rows={3}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                            placeholder="Add memorable remarks, rank, or experience shared by the speaker..."
                            value={test.quote || ''}
                            onChange={(e) => {
                              const next = [...(cmsData.videoTestimonialsSection?.testimonials || [])];
                              next[idx] = { ...next[idx], quote: e.target.value };
                              setCmsData({
                                ...cmsData,
                                videoTestimonialsSection: {
                                  ...cmsData.videoTestimonialsSection,
                                  testimonials: next,
                                },
                              });
                            }}
                          />
                        </div>

                        {/* Optional Custom Cover Photo */}
                        <ImageUploader
                          label="Custom Video Poster Thumbnail (Optional)"
                          value={test.thumbnailUrl || ''}
                          onChange={(url) => {
                            const next = [...(cmsData.videoTestimonialsSection?.testimonials || [])];
                            next[idx] = { ...next[idx], thumbnailUrl: url };
                            setCmsData({
                              ...cmsData,
                              videoTestimonialsSection: {
                                ...cmsData.videoTestimonialsSection,
                                testimonials: next,
                              },
                            });
                          }}
                          aspectRatio="video"
                          helperText="Leave empty to automatically use video poster or YouTube HD thumbnail."
                        />
                      </div>

                      {/* Right Col: Live Interactive Video Preview */}
                      <div className="space-y-3 bg-slate-950 p-4 rounded-2xl text-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5 font-mono">
                              <Play className="w-3 h-3 text-amber-400 fill-amber-400" /> Live Video Preview
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-800 px-2 py-0.5 rounded-full">
                              {getVideoType(test.videoUrl || test.youtubeUrl) === 'youtube'
                                ? 'YouTube HD'
                                : getVideoType(test.videoUrl || test.youtubeUrl) === 'vimeo'
                                ? 'Vimeo'
                                : test.videoUrl || test.youtubeUrl
                                ? 'HTML5 / CDN'
                                : 'No Source'}
                            </span>
                          </div>

                          {test.videoUrl || test.youtubeUrl ? (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg">
                              {getVideoPlayerInfo(test.videoUrl || test.youtubeUrl, test.thumbnailUrl, false).isDirectFile ? (
                                <video
                                  src={getVideoPlayerInfo(test.videoUrl || test.youtubeUrl, test.thumbnailUrl, false).embedUrl}
                                  poster={getVideoPlayerInfo(test.videoUrl || test.youtubeUrl, test.thumbnailUrl, false).posterUrl}
                                  controls
                                  playsInline
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <iframe
                                  src={getVideoPlayerInfo(test.videoUrl || test.youtubeUrl, test.thumbnailUrl, false).embedUrl}
                                  title={test.title}
                                  className="w-full h-full object-cover"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              )}
                            </div>
                          ) : (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-dashed border-slate-700 flex flex-col items-center justify-center p-4 text-center">
                              <Video className="w-10 h-10 text-rose-500/50 mb-2" />
                              <p className="text-xs font-bold text-slate-400">Add a Video URL or Upload File</p>
                              <p className="text-[10px] text-slate-500 mt-1">
                                Live universal player will activate automatically.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                          <p className="font-bold text-slate-200 truncate">{test.speakerName || 'Speaker Name'}</p>
                          <p className="text-[10px] text-slate-500 truncate">{test.speakerRole || 'Speaker Role'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 10: FOOTER & CONTACTS */}
        {activeTab === 'footer' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200 py-3.5 px-5">
                <CardTitle className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" /> Campus Address &amp; Official Helpline Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Street Address *"
                    value={cmsData.address.street}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        address: { ...cmsData.address, street: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="City / Town"
                    value={cmsData.address.city}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        address: { ...cmsData.address, city: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Postal PIN Code"
                    value={cmsData.address.pincode}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        address: { ...cmsData.address, pincode: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Helpline Phone *"
                    value={cmsData.contact.phone}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        contact: { ...cmsData.contact, phone: e.target.value },
                      })
                    }
                  />
                  <Input
                    label="Official Support Email *"
                    value={cmsData.contact.email}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        contact: { ...cmsData.contact, email: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Footer About Institution Summary
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium"
                    value={cmsData.footer.aboutText}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        footer: { ...cmsData.footer, aboutText: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
