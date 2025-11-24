import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RolesSchema } from '../enums/Roles.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRolesFilterObjectSchema as NestedEnumRolesFilterObjectSchema } from './NestedEnumRolesFilter.schema'

const nestedenumroleswithaggregatesfilterSchema = z.object({
  equals: RolesSchema.optional(),
  in: RolesSchema.array().optional(),
  notIn: RolesSchema.array().optional(),
  not: z.union([RolesSchema, z.lazy(() => NestedEnumRolesWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumRolesFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumRolesFilterObjectSchema).optional()
}).strict();
export const NestedEnumRolesWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumRolesWithAggregatesFilter> = nestedenumroleswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumRolesWithAggregatesFilter>;
export const NestedEnumRolesWithAggregatesFilterObjectZodSchema = nestedenumroleswithaggregatesfilterSchema;
