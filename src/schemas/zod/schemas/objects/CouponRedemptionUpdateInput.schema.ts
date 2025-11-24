import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CouponUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema as CouponUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema } from './CouponUpdateOneRequiredWithoutRedemptionsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  orderId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  redeemedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  coupon: z.lazy(() => CouponUpdateOneRequiredWithoutRedemptionsNestedInputObjectSchema).optional()
}).strict();
export const CouponRedemptionUpdateInputObjectSchema: z.ZodType<Prisma.CouponRedemptionUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CouponRedemptionUpdateInput>;
export const CouponRedemptionUpdateInputObjectZodSchema = makeSchema();
