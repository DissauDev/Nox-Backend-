import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './CouponRedemptionWhereUniqueInput.schema';
import { CouponRedemptionUpdateWithoutCouponInputObjectSchema as CouponRedemptionUpdateWithoutCouponInputObjectSchema } from './CouponRedemptionUpdateWithoutCouponInput.schema';
import { CouponRedemptionUncheckedUpdateWithoutCouponInputObjectSchema as CouponRedemptionUncheckedUpdateWithoutCouponInputObjectSchema } from './CouponRedemptionUncheckedUpdateWithoutCouponInput.schema';
import { CouponRedemptionCreateWithoutCouponInputObjectSchema as CouponRedemptionCreateWithoutCouponInputObjectSchema } from './CouponRedemptionCreateWithoutCouponInput.schema';
import { CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema as CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema } from './CouponRedemptionUncheckedCreateWithoutCouponInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CouponRedemptionUpdateWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUncheckedUpdateWithoutCouponInputObjectSchema)]),
  create: z.union([z.lazy(() => CouponRedemptionCreateWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema)])
}).strict();
export const CouponRedemptionUpsertWithWhereUniqueWithoutCouponInputObjectSchema: z.ZodType<Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput>;
export const CouponRedemptionUpsertWithWhereUniqueWithoutCouponInputObjectZodSchema = makeSchema();
