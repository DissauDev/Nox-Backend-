import * as z from 'zod';
export const UserUpsertResultSchema = z.object({
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
});