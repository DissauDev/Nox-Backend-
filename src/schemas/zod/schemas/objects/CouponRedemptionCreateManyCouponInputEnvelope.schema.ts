import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionCreateManyCouponInputObjectSchema as CouponRedemptionCreateManyCouponInputObjectSchema } from './CouponRedemptionCreateManyCouponInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => CouponRedemptionCreateManyCouponInputObjectSchema), z.lazy(() => CouponRedemptionCreateManyCouponInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CouponRedemptionCreateManyCouponInputEnvelopeObjectSchema: z.ZodType<Prisma.CouponRedemptionCreateManyCouponInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionCreateManyCouponInputEnvelope>;
export const CouponRedemptionCreateManyCouponInputEnvelopeObjectZodSchema = makeSchema();
