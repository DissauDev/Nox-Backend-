import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RolesSchema } from '../enums/Roles.schema';
import { NestedEnumRolesFilterObjectSchema as NestedEnumRolesFilterObjectSchema } from './NestedEnumRolesFilter.schema'

const makeSchema = () => z.object({
  equals: RolesSchema.optional(),
  in: RolesSchema.array().optional(),
  notIn: RolesSchema.array().optional(),
  not: z.union([RolesSchema, z.lazy(() => NestedEnumRolesFilterObjectSchema)]).optional()
}).strict();
export const EnumRolesFilterObjectSchema: z.ZodType<Prisma.EnumRolesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRolesFilter>;
export const EnumRolesFilterObjectZodSchema = makeSchema();
