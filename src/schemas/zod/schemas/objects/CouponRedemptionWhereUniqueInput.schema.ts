import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CouponRedemptionWhereUniqueInputObjectSchema: z.ZodType<Prisma.CouponRedemptionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionWhereUniqueInput>;
export const CouponRedemptionWhereUniqueInputObjectZodSchema = makeSchema();
