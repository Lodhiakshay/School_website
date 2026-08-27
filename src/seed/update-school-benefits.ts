import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { SchoolModel } from '../modules/school/models/school.model.js';

async function updateBenefits() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(env.MONGODB_URI);
  console.log('Connected.');

  const updateResult = await SchoolModel.updateMany(
    {},
    {
      $set: {
        nameHindi: 'सरस्वती ज्ञान मन्दिर',
        'hero.titleHindi': 'सरस्वती ज्ञान मन्दिर',
        'hero.quickAdmissionWidget.title': 'ONLINE ADMISSIONS 2026-27',
        'hero.quickAdmissionWidget.subtitle': 'Nursery to Class 12 (Science / Arts)',
        'hero.quickAdmissionWidget.description':
          'Join Farrukhabad’s leading intermediate college. Registrations open for academic session 2026-27.',
        'hero.quickAdmissionWidget.buttonText': 'SUBMIT ADMISSION INQUIRY',
        'hero.quickAdmissionWidget.buttonUrl': '/admissions',
        'hero.quickAdmissionWidget.isActive': true,
        'hero.quickAdmissionWidget.benefits': [
          { text: 'High School Board Batches', isActive: true },
          { text: 'Class 11 PCM / PCB / Arts', isActive: true },
          { text: 'Digital Lab Facilities', isActive: true },
          { text: 'School Bus Routes', isActive: true },
        ],
        'sssdShowcase.facultyMembers': [
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
    }
  );

  console.log('Updated documents:', updateResult);
  await mongoose.disconnect();
  console.log('Done.');
}

updateBenefits().catch(console.error);
