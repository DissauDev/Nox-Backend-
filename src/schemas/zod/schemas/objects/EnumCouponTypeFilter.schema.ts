import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponTypeSchema } from '../enums/CouponType.schema';
import { NestedEnumCouponTypeFilterObjectSchema as NestedEnumCouponTypeFilterObjectSchema } from './NestedEnumCouponTypeFilter.schema'

const makeSchema = () => z.object({
  equals: CouponTypeSchema.optional(),
  in: CouponTypeSchema.array().optional(),
  notIn: CouponTypeSchema.array().optional(),
  not: z.union([CouponTypeSchema, z.lazy(() => NestedEnumCouponTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumCouponTypeFilterObjectSchema: z.ZodType<Prisma.EnumCouponTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCouponTypeFilter>;
export const EnumCouponTypeFilterObjectZodSchema = makeSchema();
