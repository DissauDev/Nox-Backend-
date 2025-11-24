import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionCreateWithoutCouponInputObjectSchema as CouponRedemptionCreateWithoutCouponInputObjectSchema } from './CouponRedemptionCreateWithoutCouponInput.schema';
import { CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema as CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema } from './CouponRedemptionUncheckedCreateWithoutCouponInput.schema';
import { CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema as CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema } from './CouponRedemptionCreateOrConnectWithoutCouponInput.schema';
import { CouponRedemptionUpsertWithWhereUniqueWithoutCouponInputObjectSchema as CouponRedemptionUpsertWithWhereUniqueWithoutCouponInputObjectSchema } from './CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput.schema';
import { CouponRedemptionCreateManyCouponInputEnvelopeObjectSchema as CouponRedemptionCreateManyCouponInputEnvelopeObjectSchema } from './CouponRedemptionCreateManyCouponInputEnvelope.schema';
import { CouponRedemptionWhereUniqueInputObjectSchema as CouponRedemptionWhereUniqueInputObjectSchema } from './CouponRedemptionWhereUniqueInput.schema';
import { CouponRedemptionUpdateWithWhereUniqueWithoutCouponInputObjectSchema as CouponRedemptionUpdateWithWhereUniqueWithoutCouponInputObjectSchema } from './CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput.schema';
import { CouponRedemptionUpdateManyWithWhereWithoutCouponInputObjectSchema as CouponRedemptionUpdateManyWithWhereWithoutCouponInputObjectSchema } from './CouponRedemptionUpdateManyWithWhereWithoutCouponInput.schema';
import { CouponRedemptionScalarWhereInputObjectSchema as CouponRedemptionScalarWhereInputObjectSchema } from './CouponRedemptionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CouponRedemptionCreateWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionCreateWithoutCouponInputObjectSchema).array(), z.lazy(() => CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUncheckedCreateWithoutCouponInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionCreateOrConnectWithoutCouponInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CouponRedemptionUpsertWithWhereUniqueWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUpsertWithWhereUniqueWithoutCouponInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CouponRedemptionCreateManyCouponInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema), z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema), z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema), z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema), z.lazy(() => CouponRedemptionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CouponRedemptionUpdateWithWhereUniqueWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUpdateWithWhereUniqueWithoutCouponInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CouponRedemptionUpdateManyWithWhereWithoutCouponInputObjectSchema), z.lazy(() => CouponRedemptionUpdateManyWithWhereWithoutCouponInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CouponRedemptionScalarWhereInputObjectSchema), z.lazy(() => CouponRedemptionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CouponRedemptionUpdateManyWithoutCouponNestedInputObjectSchema: z.ZodType<Prisma.CouponRedemptionUpdateManyWithoutCouponNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionUpdateManyWithoutCouponNestedInput>;
export const CouponRedemptionUpdateManyWithoutCouponNestedInputObjectZodSchema = makeSchema();
