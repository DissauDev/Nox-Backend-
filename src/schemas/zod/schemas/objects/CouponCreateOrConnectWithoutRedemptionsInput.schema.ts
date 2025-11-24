import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponWhereUniqueInputObjectSchema as CouponWhereUniqueInputObjectSchema } from './CouponWhereUniqueInput.schema';
import { CouponCreateWithoutRedemptionsInputObjectSchema as CouponCreateWithoutRedemptionsInputObjectSchema } from './CouponCreateWithoutRedemptionsInput.schema';
import { CouponUncheckedCreateWithoutRedemptionsInputObjectSchema as CouponUncheckedCreateWithoutRedemptionsInputObjectSchema } from './CouponUncheckedCreateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CouponWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CouponCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => CouponUncheckedCreateWithoutRedemptionsInputObjectSchema)])
}).strict();
export const CouponCreateOrConnectWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.CouponCreateOrConnectWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponCreateOrConnectWithoutRedemptionsInput>;
export const CouponCreateOrConnectWithoutRedemptionsInputObjectZodSchema = makeSchema();
