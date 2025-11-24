import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponCreateWithoutRedemptionsInputObjectSchema as CouponCreateWithoutRedemptionsInputObjectSchema } from './CouponCreateWithoutRedemptionsInput.schema';
import { CouponUncheckedCreateWithoutRedemptionsInputObjectSchema as CouponUncheckedCreateWithoutRedemptionsInputObjectSchema } from './CouponUncheckedCreateWithoutRedemptionsInput.schema';
import { CouponCreateOrConnectWithoutRedemptionsInputObjectSchema as CouponCreateOrConnectWithoutRedemptionsInputObjectSchema } from './CouponCreateOrConnectWithoutRedemptionsInput.schema';
import { CouponUpsertWithoutRedemptionsInputObjectSchema as CouponUpsertWithoutRedemptionsInputObjectSchema } from './CouponUpsertWithoutRedemptionsInput.schema';
import { CouponWhereUniqueInputObjectSchema as CouponWhereUniqueInputObjectSchema } from './CouponWhereUniqueInput.schema';
import { CouponUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema as CouponUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema } from './CouponUpdateToOneWithWhereWithoutRedemptionsInput.schema';
import { CouponUpdateWithoutRedemptionsInputObjectSchema as CouponUpdateWithoutRedemptionsInputObjectSchema } from './CouponUpdateWithoutRedemptionsInput.schema';
import { CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema as CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './CouponUncheckedUpdateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CouponCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => CouponUncheckedCreateWithoutRedemptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CouponCreateOrConnectWithoutRedemptionsInputObjectSchema).optional(),
  upsert: z.lazy(() => CouponUpsertWithoutRedemptionsInputObjectSchema).optional(),
  connect: z.lazy(() => CouponWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CouponUpdateToOneWithWhereWithoutRedemptionsInputObjectSchema), z.lazy(() => CouponUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => CouponUncheckedUpdateWithoutRedemptionsInputObjectSchema)]).optional()
}).strict();
export const CouponUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema: z.ZodType<Prisma.CouponUpdateOneRequiredWithoutRedemptionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponUpdateOneRequiredWithoutRedemptionsNestedInput>;
export const CouponUpdateOneRequiredWithoutRedemptionsNestedInputObjectZodSchema = makeSchema();
