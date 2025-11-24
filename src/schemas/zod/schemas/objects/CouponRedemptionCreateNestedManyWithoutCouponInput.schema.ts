import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionCreateWithoutCouponInputObjectSchema as CouponRedemptionCreateWithoutCouponInputObjectSchema } from './CouponRedemptionCreateWithoutCouponInput.schema';
import { CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema as CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema } from './CouponRedemptionUncheckedCreateWithoutCouponInput.schema';
import { CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema as CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema } from './CouponRedemptionCreateOrConnectWithoutCouponInput.schema';
import { CouponRedemptionCreateManyCouponInputEnvelopeObjectSchema as CouponRedemptionCreateManyCouponInputEnvelopeObjectSchema } from './CouponRedemptionCreateManyCouponInputEnvelope.schema';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './CouponRedemptionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CouponRedemptionCreateWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionCreateWithoutCouponInputObjectSchema).array(), z.lazy(() => CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CouponRedemptionCreateManyCouponInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema), z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CouponRedemptionCreateNestedManyWithoutCouponInputObjectSchema: z.ZodType<Prisma.CouponRedemptionCreateNestedManyWithoutCouponInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionCreateNestedManyWithoutCouponInput>;
export const CouponRedemptionCreateNestedManyWithoutCouponInputObjectZodSchema = makeSchema();
