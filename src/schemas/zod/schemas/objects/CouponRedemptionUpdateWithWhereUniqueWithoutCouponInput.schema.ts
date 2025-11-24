import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './CouponRedemptionWhereUniqueInput.schema';
import { CouponRedemptionUpdateWithoutCouponInputObjectSchema as CouponRedemptionUpdateWithoutCouponInputObjectSchema } from './CouponRedemptionUpdateWithoutCouponInput.schema';
import { CouponRedemptionUncheckedUpdateWithoutCouponInputObjectSchema as CouponRedemptionUncheckedUpdateWithoutCouponInputObjectSchema } from './CouponRedemptionUncheckedUpdateWithoutCouponInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CouponRedemptionUpdateWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUncheckedUpdateWithoutCouponInputObjectSchema)])
}).strict();
export const CouponRedemptionUpdateWithWhereUniqueWithoutCouponInputObjectSchema: z.ZodType<Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput>;
export const CouponRedemptionUpdateWithWhereUniqueWithoutCouponInputObjectZodSchema = makeSchema();
