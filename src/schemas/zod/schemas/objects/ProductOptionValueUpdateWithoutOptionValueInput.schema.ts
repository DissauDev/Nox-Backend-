import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ProductOptionUpdateOneRequiredWithoutValuesNestedInputObjectSchema as ProductOptionUpdateOneRequiredWithoutValuesNestedInputObjectSchema } from './ProductOptionUpdateOneRequiredWithoutValuesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  productOption: z.lazy(() => ProductOptionUpdateOneRequiredWithoutValuesNestedInputObjectSchema).optional()
}).strict();
export const ProductOptionValueUpdateWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateWithoutOptionValueInput>;
export const ProductOptionValueUpdateWithoutOptionValueInputObjectZodSchema = makeSchema();
