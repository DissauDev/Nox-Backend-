import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional()
}).strict();
export const ProductOptionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionMaxOrderByAggregateInput>;
export const ProductOptionMaxOrderByAggregateInputObjectZodSchema = makeSchema();
