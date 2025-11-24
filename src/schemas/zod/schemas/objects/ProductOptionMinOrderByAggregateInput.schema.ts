import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional()
}).strict();
export const ProductOptionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionMinOrderByAggregateInput>;
export const ProductOptionMinOrderByAggregateInputObjectZodSchema = makeSchema();
