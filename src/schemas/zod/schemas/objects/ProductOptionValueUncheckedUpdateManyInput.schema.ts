import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  productOptionId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  valueId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ProductOptionValueUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUncheckedUpdateManyInput>;
export const ProductOptionValueUncheckedUpdateManyInputObjectZodSchema = makeSchema();
