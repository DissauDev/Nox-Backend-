import * as z from 'zod';
export const UserAggregateResultSchema = z.object({  _count: z.object({
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
  }).nullable().optional()});