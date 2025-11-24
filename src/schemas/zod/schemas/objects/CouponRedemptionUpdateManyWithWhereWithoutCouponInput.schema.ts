import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponRedemptionScalarWhereInputObjectSchema as CouponRedemptionScalarWhereInputObjectSchema } from './CouponRedemptionScalarWhereInput.schema';
import { CouponRedemptionUpdateManyMutationInputObjectSchema as CouponRedemptionUpdateManyMutationInputObjectSchema } from './CouponRedemptionUpdateManyMutationInput.schema';
import { CouponRedemptionUncheckedUpdateManyWithoutCouponInputObjectSchema as CouponRedemptionUncheckedUpdateManyWithoutCouponInputObjectSchema } from './CouponRedemptionUncheckedUpdateManyWithoutCouponInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CouponRedemptionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CouponRedemptionUpdateManyMutationInputObjectSchema), z.lazy(() => CouponRedemptionUncheckedUpdateManyWithoutCouponInputObjectSchema)])
}).strict();
export const CouponRedemptionUpdateManyWithWhereWithoutCouponInputObjectSchema: z.ZodType<Prisma.CouponRedemptionUpdateManyWithWhereWithoutCouponInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionUpdateManyWithWhereWithoutCouponInput>;
export const CouponRedemptionUpdateManyWithWhereWithoutCouponInputObjectZodSchema = makeSchema();
