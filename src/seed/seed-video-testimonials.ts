import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { SchoolModel } from '../modules/school/models/school.model.js';

async function seedVideoTestimonials() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(env.MONGODB_URI);
  console.log('Connected.');

  const updateResult = await SchoolModel.updateMany(
    {},
    {
      $set: {
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
              videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
              videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
              videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
              quote: 'The moral sanskar and scientific rigor instilled by our teachers remains my greatest strength.',
              badge: 'Alumni Success',
              order: 3,
              isActive: true,
            },
            {
              title: 'High School Board Topper: Daily Science Practicals & Doubt Clearing',
              speakerName: 'Deepak Verma',
              speakerRole: 'Class 10 State Board Ranker • 95.8%',
              youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
              quote: 'Personal attention from teachers and regular weekly mock tests made board exams completely stress-free.',
              badge: 'Board Toppers',
              order: 4,
              isActive: true,
            },
            {
              title: 'Safe GPS Bus Fleet & Supportive Environment for Girls Education',
              speakerName: 'Shri Rajesh Kumar Dubey',
              speakerRole: 'Parent of Class 8 & 11 Students',
              youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              thumbnailUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
              quote: 'The school bus tracking and complete campus security gives us total peace of mind every single day.',
              badge: 'Parent Experience',
              order: 5,
              isActive: true,
            },
            {
              title: 'Sports & Sanskar: Nurturing Physical Fitness Alongside Board Prep',
              speakerName: 'Pooja Rathore',
              speakerRole: 'State Level Athletics Silver Medalist',
              youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              thumbnailUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
              quote: 'The physical education mentors and sports ground helped me balance athletics and 92% board marks.',
              badge: 'Student Spotlight',
              order: 6,
              isActive: true,
            },
          ],
        },
      },
    }
  );

  console.log('Updated documents with 6 Video Testimonials Carousel:', updateResult);
  await mongoose.disconnect();
  console.log('Done.');
}

seedVideoTestimonials().catch(console.error);
