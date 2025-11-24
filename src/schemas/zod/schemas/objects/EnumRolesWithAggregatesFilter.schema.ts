import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RolesSchema } from '../enums/Roles.schema';
import { NestedEnumRolesWithAggregatesFilterObjectSchema as NestedEnumRolesWithAggregatesFilterObjectSchema } from './NestedEnumRolesWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumRolesFilterObjectSchema as NestedEnumRolesFilterObjectSchema } from './NestedEnumRolesFilter.schema'

const makeSchema = () => z.object({
  equals: RolesSchema.optional(),
  in: RolesSchema.array().optional(),
  notIn: RolesSchema.array().optional(),
  not: z.union([RolesSchema, z.lazy(() => NestedEnumRolesWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumRolesFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumRolesFilterObjectSchema).optional()
}).strict();
export const EnumRolesWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumRolesWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumRolesWithAggregatesFilter>;
export const EnumRolesWithAggregatesFilterObjectZodSchema = makeSchema();
