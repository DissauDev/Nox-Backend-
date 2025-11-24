import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponUpdateWithoutRedemptionsInputObjectSchema as CouponUpdateWithoutRedemptionsInputObjectSchema } from './CouponUpdateWithoutRedemptionsInput.schema';
import { CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema as CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './CouponUncheckedUpdateWithoutRedemptionsInput.schema';
import { CouponCreateWithoutRedemptionsInputObjectSchema as CouponCreateWithoutRedemptionsInputObjectSchema } from './CouponCreateWithoutRedemptionsInput.schema';
import { CouponUncheckedCreateWithoutRedemptionsInputObjectSchema as CouponUncheckedCreateWithoutRedemptionsInputObjectSchema } from './CouponUncheckedCreateWithoutRedemptionsInput.schema';
import { CouponWhereInputObjectSchema as CouponWhereInputObjectSchema } from './CouponWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CouponUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema)]),
  create: z.union([z.lazy(() => CouponCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => CouponUncheckedCreateWithoutRedemptionsInputObjectSchema)]),
  where: z.lazy(() => CouponWhereInputObjectSchema).optional()
}).strict();
export const CouponUpsertWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.CouponUpsertWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponUpsertWithoutRedemptionsInput>;
export const CouponUpsertWithoutRedemptionsInputObjectZodSchema = makeSchema();
