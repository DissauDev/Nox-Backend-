import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ProductOptionValueUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateManyMutationInput>;
export const ProductOptionValueUpdateManyMutationInputObjectZodSchema = makeSchema();
