import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RolesSchema } from '../enums/Roles.schema'

const makeSchema = () => z.object({
  set: RolesSchema.optional()
}).strict();
export const EnumRolesFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumRolesFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumRolesFieldUpdateOperationsInput>;
export const EnumRolesFieldUpdateOperationsInputObjectZodSchema = makeSchema();
