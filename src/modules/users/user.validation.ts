import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  username: z.string().min(3, 'Username must be at least 3 chars'),
  password: z.string().min(6, 'Password must be at least 6 chars'),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['active', 'inactive', 'suspended', 'archived']).default('active'),
  avatar: z.string().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'archived']).optional(),
  avatar: z.string().optional(),
  password: z.string().min(6).optional(),
});

