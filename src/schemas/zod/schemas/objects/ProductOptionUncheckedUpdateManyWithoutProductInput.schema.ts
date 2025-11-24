import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  groupId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ProductOptionUncheckedUpdateManyWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUncheckedUpdateManyWithoutProductInput>;
export const ProductOptionUncheckedUpdateManyWithoutProductInputObjectZodSchema = makeSchema();
