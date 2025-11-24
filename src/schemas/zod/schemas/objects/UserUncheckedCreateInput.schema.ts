import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RolesSchema } from '../enums/Roles.schema';
import { OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema as OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OrderUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  subscribeEmails: z.boolean().optional(),
  password: z.string(),
  role: RolesSchema,
  createdAt: z.coerce.date().optional(),
  passwordResetToken: z.string().optional().nullable(),
  passwordResetExpires: z.coerce.date().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  orders: z.lazy(() => OrderUncheckedCreateNestedManyWithoutUserInputObjectSchema)
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
