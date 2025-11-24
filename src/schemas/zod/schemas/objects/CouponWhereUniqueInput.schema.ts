import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  code: z.string().optional()
}).strict();
export const CouponWhereUniqueInputObjectSchema: z.ZodType<Prisma.CouponWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponWhereUniqueInput>;
export const CouponWhereUniqueInputObjectZodSchema = makeSchema();
