import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ProductOptionUpdateOneRequiredWithoutValuesNestedInputObjectSchema as ProductOptionUpdateOneRequiredWithoutValuesNestedInputObjectSchema } from './ProductOptionUpdateOneRequiredWithoutValuesNestedInput.schema';
import { OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInputObjectSchema as OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInputObjectSchema } from './OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  productOption: z.lazy(() => ProductOptionUpdateOneRequiredWithoutValuesNestedInputObjectSchema).optional(),
  optionValue: z.lazy(() => OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInputObjectSchema).optional()
}).strict();
export const ProductOptionValueUpdateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateInput>;
export const ProductOptionValueUpdateInputObjectZodSchema = makeSchema();
