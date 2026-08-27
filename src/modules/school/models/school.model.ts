import mongoose, { Document, Schema } from 'mongoose';

export interface IGradingScale {
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  remark: string;
}

export interface IStatItem {
  _id?: any;
  value: string;
  label: string;
  iconKey: string;
  order?: number;
  isActive: boolean;
}

export interface IAcademicWingItem {
  _id?: any;
  title: string;
  grades: string;
  desc: string;
  image: string;
  slug?: string;
  curriculumPdfUrl?: string;
  order?: number;
  isActive: boolean;
}

export interface IFacilityItem {
  _id?: any;
  title: string;
  desc: string;
  image: string;
  features?: string[];
  order?: number;
  isActive: boolean;
}

export interface IPrincipalPillar {
  _id?: any;
  title: string;
  desc: string;
  iconKey: string;
  isActive: boolean;
}

export interface ICampusCarouselItem {
  _id?: any;
  title: string;
  category: string;
  image: string;
  badge?: string;
  desc?: string;
  order?: number;
  isActive: boolean;
}

export interface ISSSDFacultyMember {
  _id?: any;
  name: string;
  role: string;
  exp: string;
  qual: string;
  image: string;
  tags: string[];
  order?: number;
  isActive: boolean;
}

export interface IVideoTestimonial {
  _id?: any;
  title: string;
  speakerName: string;
  speakerRole: string;
  youtubeUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  quote?: string;
  badge?: string;
  order?: number;
  isActive: boolean;
}

export interface IVideoTestimonialsSection {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  isActive: boolean;
  testimonials: IVideoTestimonial[];
}

export interface ISchool extends Document {
  name: string;
  nameHindi: string;
  tagline: string;
  affiliationCode: string;
  examinationCenterCode: string;
  board: string;
  establishedYear: string;
  address: {
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    alternatePhone?: string;
  };
  principal: {
    name: string;
    email?: string;
    phone?: string;
    qualifications?: string;
    signatureUrl?: string;
  };
  ticker: {
    text: string;
    url: string;
    badge: string;
    isActive: boolean;
    showContactInfo?: boolean;
    mapsUrl?: string;
  };
  hero: {
    badge: {
      text: string;
      isActive: boolean;
    };
    titleHindi: string;
    titleEnglish: string;
    subtitle: string;
    description: string;
    bgImageUrl: string;
    primaryBtn: {
      text: string;
      url: string;
      isActive: boolean;
      isExternal?: boolean;
    };
    secondaryBtn: {
      text: string;
      url: string;
      isActive: boolean;
    };
    quickAdmissionWidget: {
      title: string;
      subtitle: string;
      description: string;
      buttonText: string;
      buttonUrl: string;
      isActive: boolean;
      benefits: Array<{ text: string; isActive: boolean }>;
    };
  };
  stats: IStatItem[];
  academicWings: IAcademicWingItem[];
  facilities: IFacilityItem[];
  principalDesk: {
    name: string;
    qualifications: string;
    experience: string;
    quote: string;
    message: string;
    photoUrl: string;
    signatureUrl: string;
    roundSealUrl?: string;
    isActive: boolean;
    pillars: IPrincipalPillar[];
  };
  headmistressDesk: {
    name: string;
    qualifications: string;
    experience: string;
    quote: string;
    message: string;
    photoUrl: string;
    signatureUrl: string;
    roundSealUrl?: string;
    isActive: boolean;
  };
  managerDesk?: {
    name: string;
    qualifications: string;
    experience: string;
    quote: string;
    message: string;
    photoUrl: string;
    signatureUrl: string;
    roundSealUrl?: string;
    isActive: boolean;
  };
  directorDesk?: {
    name: string;
    qualifications: string;
    experience: string;
    quote: string;
    message: string;
    photoUrl: string;
    signatureUrl?: string;
    isActive: boolean;
  };
  sssdShowcase: {
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    logoUrl: string;
    imageUrl: string;
    admissionUrl: string;
    whatsappNumber: string;
    isActive: boolean;
    highlights: Array<{ _id?: any; title: string; subtitle: string; isActive: boolean }>;
    facultyMembers?: ISSSDFacultyMember[];
  };
  campusCarousel: ICampusCarouselItem[];
  videoTestimonialsSection?: IVideoTestimonialsSection;
  footer: {
    aboutText: string;
    copyrightText: string;
    helplinePhone: string;
    supportEmail: string;
    address: string;
    socialLinks: {
      facebook?: string;
      youtube?: string;
      instagram?: string;
      whatsapp?: string;
    };
  };
  admissionBanner: {
    title: string;
    subtitle: string;
    description: string;
    benefits: string[];
    isActive: boolean;
  };
  currentAcademicYear?: mongoose.Types.ObjectId;
  gradingScale?: IGradingScale[];
  logoUrl?: string;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SchoolSchema: Schema = new Schema(
  {
    name: { type: String, required: true, default: 'Sarswati Gyan Mandir' },
    nameHindi: { type: String, default: 'सरस्वती ज्ञान मन्दिर इण्टर कॉलेज' },
    tagline: { type: String, default: 'Excellence in Education, Culture & Character Building' },
    affiliationCode: { type: String, required: true, default: 'UP-FBD-2026-SGM-089' },
    examinationCenterCode: { type: String, default: 'FBD-CENT-1089' },
    board: { type: String, required: true, default: 'UP State Board of High School and Intermediate Education' },
    establishedYear: { type: String, default: '1999' },
    address: {
      street: { type: String, default: 'Main Road, Near Bus Stand' },
      city: { type: String, default: 'Shamsabad' },
      district: { type: String, default: 'Farrukhabad' },
      state: { type: String, default: 'Uttar Pradesh' },
      pincode: { type: String, default: '209503' },
      country: { type: String, default: 'India' },
    },
    contact: {
      phone: { type: String, default: '+91 9876543210' },
      email: { type: String, default: 'info@sarswatigyanmandir.edu.in' },
      alternatePhone: { type: String, default: '+91 9451234501' },
    },
    principal: {
      name: { type: String, default: 'Dr. Ramesh Kumar Sharma' },
      email: { type: String, default: 'principal@sarswati.edu' },
      phone: { type: String, default: '+91 9451234568' },
      qualifications: { type: String, default: 'M.Sc., M.Ed., Ph.D.' },
      signatureUrl: { type: String, default: '/images/stamps/principal-signature.png' },
    },
    ticker: {
      text: { type: String, default: 'Admissions Open for Session 2026-2027 (Nursery to Class 12 PCM/PCB/Arts)' },
      url: { type: String, default: '/admissions' },
      badge: { type: String, default: 'URGENT ANNOUNCEMENT' },
      isActive: { type: Boolean, default: true },
      showContactInfo: { type: Boolean, default: true },
      mapsUrl: { type: String, default: 'https://maps.google.com/?q=Shamsabad+Farrukhabad+Uttar+Pradesh' },
    },
    hero: {
      badge: {
        text: { type: String, default: 'Premier Intermediate College in Shamsabad, Farrukhabad (UP)' },
        isActive: { type: Boolean, default: true },
      },
      titleHindi: { type: String, default: 'सरस्वती ज्ञान मन्दिर' },
      titleEnglish: { type: String, default: 'Sarswati Gyan Mandir' },
      subtitle: { type: String, default: 'Nurturing Character, Culture & Academic Excellence' },
      description: {
        type: String,
        default:
          'Affiliated with the UP State Board of High School and Intermediate Education. We provide state-of-the-art laboratory infrastructure, holistic values, disciplined learning, and complete digital portal management for students from Nursery to Class 12.',
      },
      bgImageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80',
      },
      primaryBtn: {
        text: { type: String, default: 'Apply Online 2026-27' },
        url: { type: String, default: '/admissions' },
        isActive: { type: Boolean, default: true },
        isExternal: { type: Boolean, default: false },
      },
      secondaryBtn: {
        text: { type: String, default: 'Central ERP Portal' },
        url: { type: String, default: '/login' },
        isActive: { type: Boolean, default: true },
      },
      quickAdmissionWidget: {
        title: { type: String, default: 'ONLINE ADMISSIONS 2026-27' },
        subtitle: { type: String, default: 'Nursery to Class 12 (Science / Arts)' },
        description: {
          type: String,
          default: 'Admissions open for academic session 2026-27. Submit an online inquiry for instant counseling.',
        },
        buttonText: { type: String, default: 'SUBMIT ADMISSION INQUIRY' },
        buttonUrl: { type: String, default: '/admissions' },
        isActive: { type: Boolean, default: true },
        benefits: [
          {
            text: { type: String, default: 'High School Board Batches' },
            isActive: { type: Boolean, default: true },
          },
          {
            text: { type: String, default: 'Class 11 PCM / PCB / Arts' },
            isActive: { type: Boolean, default: true },
          },
          {
            text: { type: String, default: 'Digital Lab Facilities' },
            isActive: { type: Boolean, default: true },
          },
          {
            text: { type: String, default: 'School Bus Routes' },
            isActive: { type: Boolean, default: true },
          },
        ],
      },
    },
    stats: [
      {
        value: { type: String, default: '1,250+' },
        label: { type: String, default: 'Enrolled Scholars' },
        iconKey: { type: String, default: 'Users' },
        order: { type: Number, default: 1 },
        isActive: { type: Boolean, default: true },
      },
      {
        value: { type: String, default: '42+' },
        label: { type: String, default: 'Expert Faculty' },
        iconKey: { type: String, default: 'GraduationCap' },
        order: { type: Number, default: 2 },
        isActive: { type: Boolean, default: true },
      },
      {
        value: { type: String, default: '99.4%' },
        label: { type: String, default: 'Board Pass Rate' },
        iconKey: { type: String, default: 'Award' },
        order: { type: Number, default: 3 },
        isActive: { type: Boolean, default: true },
      },
      {
        value: { type: String, default: '25+ Yrs' },
        label: { type: String, default: 'Academic Legacy' },
        iconKey: { type: String, default: 'Building2' },
        order: { type: Number, default: 4 },
        isActive: { type: Boolean, default: true },
      },
    ],
    academicWings: [
      {
        title: { type: String, default: 'Pre-Primary & Primary Wing' },
        grades: { type: String, default: 'Nursery to Class 5' },
        desc: {
          type: String,
          default:
            'Foundational literacy, phonics, joyful arithmetic, creative arts, and moral grounding in a caring environment.',
        },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
        },
        slug: { type: String, default: 'primary' },
        curriculumPdfUrl: { type: String, default: '' },
        order: { type: Number, default: 1 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'Middle School Wing' },
        grades: { type: String, default: 'Class 6 to Class 8' },
        desc: {
          type: String,
          default:
            'Scientific exploration, digital literacy, languages (Hindi, English, Sanskrit), and strong mathematics fundamentals.',
        },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
        },
        slug: { type: String, default: 'middle' },
        curriculumPdfUrl: { type: String, default: '' },
        order: { type: Number, default: 2 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'High School (UP Board)' },
        grades: { type: String, default: 'Class 9 & Class 10' },
        desc: {
          type: String,
          default:
            'Rigorous state board curriculum, NCERT mastery, comprehensive laboratory experiments, and board mock series.',
        },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
        },
        slug: { type: String, default: 'high-school' },
        curriculumPdfUrl: { type: String, default: '' },
        order: { type: Number, default: 3 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'Intermediate College Wing' },
        grades: { type: String, default: 'Class 11 & Class 12' },
        desc: {
          type: String,
          default:
            'Specialized Science (PCM/PCB) & Humanities streams with state board preparation and competitive examination guidance.',
        },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
        },
        slug: { type: String, default: 'intermediate' },
        curriculumPdfUrl: { type: String, default: '' },
        order: { type: Number, default: 4 },
        isActive: { type: Boolean, default: true },
      },
    ],
    facilities: [
      {
        title: { type: String, default: 'Physics & Chemistry Labs' },
        desc: {
          type: String,
          default: 'Equipped with modern apparatus, optical benches, reagents, and certified safety setups.',
        },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        },
        features: [{ type: String }],
        order: { type: Number, default: 1 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'Digital Computer Center' },
        desc: {
          type: String,
          default: 'Air-conditioned lab with 40+ connected workstations and coding modules.',
        },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
        },
        features: [{ type: String }],
        order: { type: Number, default: 2 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'Central Knowledge Library' },
        desc: {
          type: String,
          default: 'Extensive repository of 5,000+ reference volumes, encyclopedias, and regional literature.',
        },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
        },
        features: [{ type: String }],
        order: { type: Number, default: 3 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'Dedicated Transport Fleet' },
        desc: {
          type: String,
          default: 'GPS-tracked school buses covering Shamsabad, Farrukhabad, and surrounding rural routes.',
        },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
        },
        features: [{ type: String }],
        order: { type: Number, default: 4 },
        isActive: { type: Boolean, default: true },
      },
    ],
    principalDesk: {
      name: { type: String, default: 'Dr. Ramesh Kumar Sharma' },
      qualifications: { type: String, default: 'Principal • M.Sc., M.Ed., Ph.D.' },
      experience: { type: String, default: '★ 25+ Years Academic Leadership' },
      quote: {
        type: String,
        default: 'Empowering Rural Youth with Modern Science, Moral Character & Board Excellence',
      },
      message: {
        type: String,
        default:
          'At Saraswati Gyan Mandir and our English-medium wing SSSD Public School, education is not merely the transmission of syllabus — it is the ignite of intellect, character building, cultural ethos, and competitive spirit. We are dedicated to providing students of Shamsabad and Farrukhabad with world-class facilities and nurturing mentorship.',
      },
      photoUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85',
      },
      signatureUrl: { type: String, default: '/images/stamps/principal-signature.png' },
      roundSealUrl: { type: String, default: '/images/stamps/principal-round-seal.png' },
      isActive: { type: Boolean, default: true },
      pillars: [
        {
          title: { type: String, default: 'Board Toppers' },
          desc: { type: String, default: 'Consistent Top State & District Ranks' },
          iconKey: { type: String, default: 'GraduationCap' },
          isActive: { type: Boolean, default: true },
        },
        {
          title: { type: String, default: 'Modern Labs' },
          desc: { type: String, default: 'Physics, Chem, Bio & IT Practical Centers' },
          iconKey: { type: String, default: 'Sparkles' },
          isActive: { type: Boolean, default: true },
        },
        {
          title: { type: String, default: 'Values & Sports' },
          desc: { type: String, default: 'Sanskar, Discipline & Physical Fitness' },
          iconKey: { type: String, default: 'Award' },
          isActive: { type: Boolean, default: true },
        },
      ],
    },
    headmistressDesk: {
      name: { type: String, default: 'Mrs. Ananya Sen' },
      qualifications: { type: String, default: 'Headmistress & Spoken English Lead • M.A. (English), B.Ed.' },
      experience: { type: String, default: '★ 15+ Years English Pedagogy' },
      quote: {
        type: String,
        default: 'Fostering Eloquent Expression, Critical Thinking & Global English Confidence',
      },
      message: {
        type: String,
        default:
          'At SSSD Public School, our primary commitment is to create a dynamic, 100% English medium learning atmosphere where students speak fluent English with natural poise and confidence.',
      },
      photoUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
      },
      signatureUrl: { type: String, default: '/images/stamps/sssd-principal-signature.png' },
      roundSealUrl: { type: String, default: '/images/stamps/sssd-principal-round-seal.png' },
      isActive: { type: Boolean, default: true },
    },
    managerDesk: {
      name: { type: String, default: 'Shri Ram Prakash Verma' },
      qualifications: { type: String, default: 'M.A., LL.B. • Veteran Social Reformer' },
      experience: { type: String, default: 'Founder & Managing Trustee (Est. 1999)' },
      quote: {
        type: String,
        default: 'Institutional Foundation & Commitment to Transparent Rural Education',
      },
      message: {
        type: String,
        default:
          'When we laid the foundation stone of Sarswati Gyan Mandir in 1999, our primary aspiration was to bring world-class English & Hindi bilingual education, modern science infrastructure, and patriotic Indian values to the heart of Shamsabad and surrounding villages in Farrukhabad district.',
      },
      photoUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      },
      signatureUrl: { type: String, default: '/images/stamps/principal-signature.png' },
      roundSealUrl: { type: String, default: '/images/stamps/principal-round-seal.png' },
      isActive: { type: Boolean, default: true },
    },
    directorDesk: {
      name: { type: String, default: 'Shri Dinesh Gupta' },
      qualifications: { type: String, default: 'Academic Director • M.Sc. (Mathematics), B.Ed.' },
      experience: { type: String, default: '20+ Years in Curriculum & Board Evaluation' },
      quote: {
        type: String,
        default: 'Board Examination Mastery & Analytical Pedagogy',
      },
      message: {
        type: String,
        default:
          'Our teaching pedagogy at Saraswati Gyan Mandir blends traditional conceptual clarity with modern scientific problem-solving techniques. Through regular Unit Tests and OMR mock drills, our students consistently achieve top district ranks.',
      },
      photoUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      },
      signatureUrl: { type: String, default: '/images/stamps/principal-signature.png' },
      isActive: { type: Boolean, default: true },
    },
    sssdShowcase: {
      title: { type: String, default: 'SSSD Public School' },
      subtitle: { type: String, default: 'SHAMSABAD • FARRUKHABAD (100% ENGLISH MEDIUM)' },
      description: {
        type: String,
        default:
          'Seeking a dedicated 100% English Medium learning environment with CBSE pattern curriculum, digital smart boards, and phonics labs? Discover our premier English-medium campus located right here in Shamsabad, Farrukhabad.',
      },
      badge: { type: String, default: '100% English Medium Wing • CBSE Pattern' },
      logoUrl: { type: String, default: '/images/sssd-logo.png' },
      imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      },
      admissionUrl: { type: String, default: '/sssd' },
      whatsappNumber: { type: String, default: '+919451234567' },
      isActive: { type: Boolean, default: true },
      highlights: [
        {
          title: { type: String, default: 'Nursery to 10th' },
          subtitle: { type: String, default: 'Co-Ed Schooling' },
          isActive: { type: Boolean, default: true },
        },
        {
          title: { type: String, default: '100% English' },
          subtitle: { type: String, default: 'Spoken & Phonics' },
          isActive: { type: Boolean, default: true },
        },
        {
          title: { type: String, default: 'Smart STEM Labs' },
          subtitle: { type: String, default: 'GPS Bus Fleet' },
          isActive: { type: Boolean, default: true },
        },
      ],
      facultyMembers: [
        {
          name: { type: String, default: 'Mrs. Ananya Sen' },
          role: { type: String, default: 'Headmistress & Spoken English Lead' },
          exp: { type: String, default: '14+ Yrs Exp' },
          qual: { type: String, default: 'M.A. English (Gold Medalist), B.Ed.' },
          image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85',
          },
          tags: { type: [String], default: ['Cambridge TKT', 'Phonics Studio', 'Debate Mentor'] },
          order: { type: Number, default: 1 },
          isActive: { type: Boolean, default: true },
        },
        {
          name: { type: String, default: 'Mr. Vikramaditya Singh' },
          role: { type: String, default: 'Senior Science & STEM Instructor' },
          exp: { type: String, default: '10+ Yrs Exp' },
          qual: { type: String, default: 'M.Sc. Physics, B.Ed., CTET Qualified' },
          image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85',
          },
          tags: { type: [String], default: ['Robotics STEM', 'NCERT Physics', 'Olympiad Drill'] },
          order: { type: Number, default: 2 },
          isActive: { type: Boolean, default: true },
        },
        {
          name: { type: String, default: 'Ms. Deepika Saxena' },
          role: { type: String, default: 'Primary Phonics & Mathematics Lead' },
          exp: { type: String, default: '8+ Yrs Exp' },
          qual: { type: String, default: 'B.Sc., D.El.Ed., Cambridge Certified' },
          image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=85',
          },
          tags: { type: [String], default: ['Montessori Care', 'Phonics Audio', 'Mental Maths'] },
          order: { type: Number, default: 3 },
          isActive: { type: Boolean, default: true },
        },
        {
          name: { type: String, default: 'Mr. Rohit Kashyap' },
          role: { type: String, default: 'Computer & AI Robotics Instructor' },
          exp: { type: String, default: '7+ Yrs Exp' },
          qual: { type: String, default: 'MCA, Certified Python Educator' },
          image: {
            type: String,
            default: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85',
          },
          tags: { type: [String], default: ['Python & Scratch', 'Smart AI Lab', 'Cyber Safety'] },
          order: { type: Number, default: 4 },
          isActive: { type: Boolean, default: true },
        },
      ],
    },
    campusCarousel: [
      {
        title: { type: String, default: 'Advanced Science & Physics Lab' },
        category: { type: String, default: 'ACADEMIC EXCELLENCE' },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
        },
        badge: { type: String, default: 'Practical Lab' },
        desc: { type: String, default: 'Fully equipped experimental physics benches with certified safety setups.' },
        order: { type: Number, default: 1 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'High-Tech Digital Computer Center' },
        category: { type: String, default: 'IT INFRASTRUCTURE' },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
        },
        badge: { type: String, default: '40+ Workstations' },
        desc: { type: String, default: 'High-speed internet, smart LED monitors, and programming laboratories.' },
        order: { type: Number, default: 2 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'Central Knowledge Library' },
        category: { type: String, default: 'RESOURCE HUB' },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
        },
        badge: { type: String, default: '5,000+ Books' },
        desc: { type: String, default: 'Extensive repository of NCERT textbooks, reference encyclopedias, and literature.' },
        order: { type: Number, default: 3 },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'Smart Interactive Classrooms' },
        category: { type: String, default: 'MODERN PEDAGOGY' },
        image: {
          type: String,
          default: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
        },
        badge: { type: String, default: 'Digital Boards' },
        desc: { type: String, default: 'Visual 3D learning modules for high school and intermediate concepts.' },
        order: { type: Number, default: 4 },
        isActive: { type: Boolean, default: true },
      },
    ],
    videoTestimonialsSection: {
      title: { type: String, default: 'Real Stories, Authentic Voices' },
      subtitle: { type: String, default: 'PARENT & STUDENT EXPERIENCES' },
      badge: { type: String, default: 'Video Testimonials • Community Trust' },
      description: {
        type: String,
        default:
          'Hear directly from our parents, successful alumni, and board rankers about how Sarswati Gyan Mandir transforms lives through disciplined academics, holistic values, and personalized mentorship.',
      },
      isActive: { type: Boolean, default: true },
      testimonials: [
        {
          title: { type: String, default: 'From Village to Top Engineering College: A Parent’s Proud Journey' },
          speakerName: { type: String, default: 'Dr. Ramesh Chandra Mishra' },
          speakerRole: { type: String, default: 'Parent of Class 12 Science Topper' },
          youtubeUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          videoUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          thumbnailUrl: {
            type: String,
            default: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
          },
          quote: {
            type: String,
            default:
              'The dedicated faculty and daily doubt counters helped my son score 96.4% in UP Board Intermediate exams.',
          },
          badge: { type: String, default: 'Parent Experience' },
          order: { type: Number, default: 1 },
          isActive: { type: Boolean, default: true },
        },
        {
          title: { type: String, default: 'Why We Chose SSSD English Medium Wing for Early Childhood' },
          speakerName: { type: String, default: 'Smt. Kavita Sharma' },
          speakerRole: { type: String, default: 'Parent of Class 3 Student' },
          youtubeUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          videoUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          thumbnailUrl: {
            type: String,
            default: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
          },
          quote: {
            type: String,
            default:
              'Interactive 3D digital classrooms and phonics audio labs gave our daughter flawless English fluency.',
          },
          badge: { type: String, default: 'SSSD Parent Review' },
          order: { type: Number, default: 2 },
          isActive: { type: Boolean, default: true },
        },
        {
          title: { type: String, default: 'Alumni Journey: Board Preparation & Discipline That Shaped My Career' },
          speakerName: { type: String, default: 'Er. Aman Tripathi' },
          speakerRole: { type: String, default: 'Alumni Batch 2021 • Software Engineer' },
          youtubeUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          videoUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          thumbnailUrl: {
            type: String,
            default: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
          },
          quote: {
            type: String,
            default:
              'The moral sanskar and scientific rigor instilled by our teachers remains my greatest strength.',
          },
          badge: { type: String, default: 'Alumni Success' },
          order: { type: Number, default: 3 },
          isActive: { type: Boolean, default: true },
        },
      ],
    },
    footer: {
      aboutText: {
        type: String,
        default:
          'Sarswati Gyan Mandir Intermediate College and SSSD Public School are premier educational institutions in Shamsabad, Farrukhabad (UP), dedicated to high academic standards, modern science, cultural sanskars, and disciplined character building.',
      },
      copyrightText: {
        type: String,
        default: '© 2026 Sarswati Gyan Mandir & SSSD Public School. All rights reserved.',
      },
      helplinePhone: { type: String, default: '+91 9876543210' },
      supportEmail: { type: String, default: 'info@sarswatigyanmandir.edu.in' },
      address: { type: String, default: 'Main Road, Near Bus Stand, Shamsabad, Farrukhabad, UP - 209503' },
      socialLinks: {
        facebook: { type: String, default: 'https://facebook.com' },
        youtube: { type: String, default: 'https://youtube.com' },
        instagram: { type: String, default: 'https://instagram.com' },
        whatsapp: { type: String, default: 'https://wa.me/919876543210' },
      },
    },
    admissionBanner: {
      title: { type: String, default: 'ONLINE ADMISSIONS 2026-27' },
      subtitle: { type: String, default: 'Nursery to Class 12 (Science / Arts)' },
      description: {
        type: String,
        default: 'Admissions open for academic session 2026-27. Submit an online inquiry for instant counseling.',
      },
      benefits: [{ type: String }],
      isActive: { type: Boolean, default: true },
    },
    currentAcademicYear: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
    gradingScale: [
      {
        grade: { type: String },
        minPercentage: { type: Number },
        maxPercentage: { type: Number },
        remark: { type: String },
      },
    ],
    logoUrl: { type: String, default: '/logo.png' },
    websiteUrl: { type: String, default: 'http://localhost:3000' },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const SchoolModel = mongoose.model<ISchool>('School', SchoolSchema);

