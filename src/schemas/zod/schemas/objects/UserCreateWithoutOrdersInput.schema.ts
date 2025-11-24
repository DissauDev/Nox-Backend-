import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RolesSchema } from '../enums/Roles.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  subscribeEmails: z.boolean().optional(),
  password: z.string(),
  role: RolesSchema,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  passwordResetToken: z.string().optional().nullable(),
  passwordResetExpires: z.coerce.date().optional().nullable(),
  refreshToken: z.string().optional().nullable()
}).strict();
export const UserCreateWithoutOrdersInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutOrdersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutOrdersInput>;
export const UserCreateWithoutOrdersInputObjectZodSchema = makeSchema();
