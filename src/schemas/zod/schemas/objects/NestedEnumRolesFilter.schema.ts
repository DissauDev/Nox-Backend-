import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RolesSchema } from '../enums/Roles.schema'

const nestedenumrolesfilterSchema = z.object({
  equals: RolesSchema.optional(),
  in: RolesSchema.array().optional(),
  notIn: RolesSchema.array().optional(),
  not: z.union([RolesSchema, z.lazy(() => NestedEnumRolesFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumRolesFilterObjectSchema: z.ZodType<Prisma.NestedEnumRolesFilter> = nestedenumrolesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumRolesFilter>;
export const NestedEnumRolesFilterObjectZodSchema = nestedenumrolesfilterSchema;
