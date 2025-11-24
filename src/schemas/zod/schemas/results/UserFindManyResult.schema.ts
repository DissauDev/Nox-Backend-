import * as z from 'zod';
export const UserFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional(),
  subscribeEmails: z.boolean(),
  password: z.string(),
  role: z.unknown(),
  orders: z.array(z.unknown()),
  createdAt: z.date(),
  updatedAt: z.date(),
  passwordResetToken: z.string().optional(),
  passwordResetExpires: z.date().optional(),
  refreshToken: z.string().optional()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});