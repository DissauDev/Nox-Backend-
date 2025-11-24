import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ProductUpdateOneRequiredWithoutOptionsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutOptionsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutOptionsNestedInput.schema';
import { ProductOptionValueUpdateManyWithoutProductOptionNestedInputObjectSchema as ProductOptionValueUpdateManyWithoutProductOptionNestedInputObjectSchema } from './ProductOptionValueUpdateManyWithoutProductOptionNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOptionsNestedInputObjectSchema).optional(),
  values: z.lazy(() => ProductOptionValueUpdateManyWithoutProductOptionNestedInputObjectSchema).optional()
}).strict();
export const ProductOptionUpdateWithoutGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateWithoutGroupInput>;
export const ProductOptionUpdateWithoutGroupInputObjectZodSchema = makeSchema();
