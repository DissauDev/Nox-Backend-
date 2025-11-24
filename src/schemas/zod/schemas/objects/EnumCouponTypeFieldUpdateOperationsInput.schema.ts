import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponTypeSchema } from '../enums/CouponType.schema'

const makeSchema = () => z.object({
  set: CouponTypeSchema.optional()
}).strict();
export const EnumCouponTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCouponTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCouponTypeFieldUpdateOperationsInput>;
export const EnumCouponTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
