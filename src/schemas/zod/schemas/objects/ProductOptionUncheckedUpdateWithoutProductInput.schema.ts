import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ProductOptionValueUncheckedUpdateManyWithoutProductOptionNestedInputObjectSchema as ProductOptionValueUncheckedUpdateManyWithoutProductOptionNestedInputObjectSchema } from './ProductOptionValueUncheckedUpdateManyWithoutProductOptionNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  groupId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  values: z.lazy(() => ProductOptionValueUncheckedUpdateManyWithoutProductOptionNestedInputObjectSchema).optional()
}).strict();
export const ProductOptionUncheckedUpdateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUncheckedUpdateWithoutProductInput>;
export const ProductOptionUncheckedUpdateWithoutProductInputObjectZodSchema = makeSchema();
