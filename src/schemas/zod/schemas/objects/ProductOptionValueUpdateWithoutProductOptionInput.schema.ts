import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInputObjectSchema as OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInputObjectSchema } from './OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  optionValue: z.lazy(() => OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInputObjectSchema).optional()
}).strict();
export const ProductOptionValueUpdateWithoutProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateWithoutProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateWithoutProductOptionInput>;
export const ProductOptionValueUpdateWithoutProductOptionInputObjectZodSchema = makeSchema();
