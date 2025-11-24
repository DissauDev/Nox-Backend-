import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './CouponRedemptionWhereUniqueInput.schema';
import { CouponRedemptionCreateWithoutCouponInputObjectSchema as CouponRedemptionCreateWithoutCouponInputObjectSchema } from './CouponRedemptionCreateWithoutCouponInput.schema';
import { CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema as CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema } from './CouponRedemptionUncheckedCreateWithoutCouponInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CouponRedemptionCreateWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema)])
}).strict();
export const CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema: z.ZodType<Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput>;
export const CouponRedemptionCreateOrConnectWithoutCouponInputObjectZodSchema = makeSchema();
