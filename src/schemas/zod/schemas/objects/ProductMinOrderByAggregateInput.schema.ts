import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  salePrice: SortOrderSchema.optional(),
  specifications: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  isOptionItem: SortOrderSchema.optional(),
  packOptionSurcharge: SortOrderSchema.optional(),
  packMaxItems: SortOrderSchema.optional()
}).strict();
export const ProductMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductMinOrderByAggregateInput>;
export const ProductMinOrderByAggregateInputObjectZodSchema = makeSchema();
