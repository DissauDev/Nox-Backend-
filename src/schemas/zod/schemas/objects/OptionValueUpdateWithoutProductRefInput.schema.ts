import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema as FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { OptionGroupUpdateOneRequiredWithoutOptionValueNestedInputObjectSchema as OptionGroupUpdateOneRequiredWithoutOptionValueNestedInputObjectSchema } from './OptionGroupUpdateOneRequiredWithoutOptionValueNestedInput.schema';
import { ProductOptionValueUpdateManyWithoutOptionValueNestedInputObjectSchema as ProductOptionValueUpdateManyWithoutOptionValueNestedInputObjectSchema } from './ProductOptionValueUpdateManyWithoutOptionValueNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  extraPrice: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)]).optional(),
  imageUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isAvailable: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  group: z.lazy(() => OptionGroupUpdateOneRequiredWithoutOptionValueNestedInputObjectSchema).optional(),
  ProductOptionValue: z.lazy(() => ProductOptionValueUpdateManyWithoutOptionValueNestedInputObjectSchema).optional()
}).strict();
export const OptionValueUpdateWithoutProductRefInputObjectSchema: z.ZodType<Prisma.OptionValueUpdateWithoutProductRefInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpdateWithoutProductRefInput>;
export const OptionValueUpdateWithoutProductRefInputObjectZodSchema = makeSchema();
