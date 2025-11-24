import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ProductUpdateOneRequiredWithoutOptionsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutOptionsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutOptionsNestedInput.schema';
import { OptionGroupUpdateOneRequiredWithoutProductOptionsNestedInputObjectSchema as OptionGroupUpdateOneRequiredWithoutProductOptionsNestedInputObjectSchema } from './OptionGroupUpdateOneRequiredWithoutProductOptionsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOptionsNestedInputObjectSchema).optional(),
  group: z.lazy(() => OptionGroupUpdateOneRequiredWithoutProductOptionsNestedInputObjectSchema).optional()
}).strict();
export const ProductOptionUpdateWithoutValuesInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateWithoutValuesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateWithoutValuesInput>;
export const ProductOptionUpdateWithoutValuesInputObjectZodSchema = makeSchema();
