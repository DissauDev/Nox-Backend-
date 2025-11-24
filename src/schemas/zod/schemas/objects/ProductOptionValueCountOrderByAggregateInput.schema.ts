import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productOptionId: SortOrderSchema.optional(),
  valueId: SortOrderSchema.optional()
}).strict();
export const ProductOptionValueCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCountOrderByAggregateInput>;
export const ProductOptionValueCountOrderByAggregateInputObjectZodSchema = makeSchema();
