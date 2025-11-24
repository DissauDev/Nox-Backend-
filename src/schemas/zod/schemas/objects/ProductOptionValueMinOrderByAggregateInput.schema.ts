import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productOptionId: SortOrderSchema.optional(),
  valueId: SortOrderSchema.optional()
}).strict();
export const ProductOptionValueMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueMinOrderByAggregateInput>;
export const ProductOptionValueMinOrderByAggregateInputObjectZodSchema = makeSchema();
