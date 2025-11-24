import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './CouponWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CouponWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CouponWhereInputObjectSchema).optional()
}).strict();
export const CouponScalarRelationFilterObjectSchema: z.ZodType<Prisma.CouponScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CouponScalarRelationFilter>;
export const CouponScalarRelationFilterObjectZodSchema = makeSchema();
