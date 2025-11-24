import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './CouponWhereInput.schema';
import { CouponUpdateWithoutRedemptionsInputObjectSchema as CouponUpdateWithoutRedemptionsInputObjectSchema } from './CouponUpdateWithoutRedemptionsInput.schema';
import { CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema as CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './CouponUncheckedUpdateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CouponWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CouponUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema)])
}).strict();
export const CouponUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.CouponUpdateToOneWithWhereWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponUpdateToOneWithWhereWithoutRedemptionsInput>;
export const CouponUpdateToOneWithWhereWithoutRedemptionsInputObjectZodSchema = makeSchema();
