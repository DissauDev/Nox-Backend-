import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponCreateWithoutRedemptionsInputObjectSchema as CouponCreateWithoutRedemptionsInputObjectSchema } from './CouponCreateWithoutRedemptionsInput.schema';
import { CouponUncheckedCreateWithoutRedemptionsInputObjectSchema as CouponUncheckedCreateWithoutRedemptionsInputObjectSchema } from './CouponUncheckedCreateWithoutRedemptionsInput.schema';
import { CouponCreateOrConnectWithoutRedemptionsInputObjectSchema as CouponCreateOrConnectWithoutRedemptionsInputObjectSchema } from './CouponCreateOrConnectWithoutRedemptionsInput.schema';
import { CouponWhereUniqueInputObjectSchema as CouponWhereUniqueInputObjectSchema } from './CouponWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CouponCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => CouponUncheckedCreateWithoutRedemptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CouponCreateOrConnectWithoutRedemptionsInputObjectSchema).optional(),
  connect: z.lazy(() => CouponWhereUniqueInputObjectSchema).optional()
}).strict();
export const CouponCreateNestedOneWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.CouponCreateNestedOneWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponCreateNestedOneWithoutRedemptionsInput>;
export const CouponCreateNestedOneWithoutRedemptionsInputObjectZodSchema = makeSchema();
