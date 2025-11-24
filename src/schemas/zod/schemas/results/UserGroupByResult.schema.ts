import * as z from 'zod';
export const UserGroupByResultSchema = z.array(z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  subscribeEmails: z.boolean(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  passwordResetToken: z.string(),
  passwordResetExpires: z.date(),
  refreshToken: z.string(),
  _count: z.object({
    id: z.number(),
    email: z.number(),
    name: z.number(),
    subscribeEmails: z.number(),
    password: z.number(),
    role: z.number(),
    orders: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    passwordResetToken: z.number(),
    passwordResetExpires: z.number(),
    refreshToken: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    password: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    passwordResetToken: z.string().nullable(),
    passwordResetExpires: z.date().nullable(),
    refreshToken: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    password: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    passwordResetToken: z.string().nullable(),
    passwordResetExpires: z.date().nullable(),
    refreshToken: z.string().nullable()
  }).nullable().optional()
}));