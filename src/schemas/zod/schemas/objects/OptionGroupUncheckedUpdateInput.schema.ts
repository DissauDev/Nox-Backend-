import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { ProductOptionUncheckedUpdateManyWithoutGroupNestedInputObjectSchema as ProductOptionUncheckedUpdateManyWithoutGroupNestedInputObjectSchema } from './ProductOptionUncheckedUpdateManyWithoutGroupNestedInput.schema';
import { OptionValueUncheckedUpdateManyWithoutGroupNestedInputObjectSchema as OptionValueUncheckedUpdateManyWithoutGroupNestedInputObjectSchema } from './OptionValueUncheckedUpdateManyWithoutGroupNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  required: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  minSelectable: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  maxSelectable: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  isAvailable: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  showImages: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  selectionTitle: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  productOptions: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutGroupNestedInputObjectSchema).optional(),
  OptionValue: z.lazy(() => OptionValueUncheckedUpdateManyWithoutGroupNestedInputObjectSchema).optional()
}).strict();
export const OptionGroupUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.OptionGroupUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUncheckedUpdateInput>;
export const OptionGroupUncheckedUpdateInputObjectZodSchema = makeSchema();
