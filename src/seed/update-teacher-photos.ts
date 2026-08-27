import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { TeacherModel } from '../modules/teachers/models/teacher.model.js';

const teacherPhotos: Record<string, string> = {
  'EMP-2024-0012': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'EMP-2024-0014': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  'EMP-2024-0018': 'https://images.unsplash.com/photo-1580894732473-b8adffea2d9f?auto=format&fit=crop&w=600&q=80',
  'EMP-2024-0022': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  'EMP-2024-0025': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
};

async function updateTeacherPhotos() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(env.MONGODB_URI);
  console.log('Connected.');

  for (const [empId, photoUrl] of Object.entries(teacherPhotos)) {
    const res = await TeacherModel.updateOne(
      { employeeId: empId },
      { $set: { photoUrl } }
    );
    console.log(`Updated teacher ${empId}:`, res.modifiedCount);
  }

  // Also update any other teacher without photo
  const defaultMalePhoto = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80';
  const defaultFemalePhoto = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80';

  await TeacherModel.updateMany(
    { gender: 'female', $or: [{ photoUrl: '' }, { photoUrl: { $exists: false } }] },
    { $set: { photoUrl: defaultFemalePhoto } }
  );

  await TeacherModel.updateMany(
    { gender: 'male', $or: [{ photoUrl: '' }, { photoUrl: { $exists: false } }] },
    { $set: { photoUrl: defaultMalePhoto } }
  );

  console.log('All teacher photos updated.');
  await mongoose.disconnect();
}

updateTeacherPhotos().catch(console.error);

