import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CategoryCountOrderByAggregateInputObjectSchema as CategoryCountOrderByAggregateInputObjectSchema } from './CategoryCountOrderByAggregateInput.schema';
import { CategoryAvgOrderByAggregateInputObjectSchema as CategoryAvgOrderByAggregateInputObjectSchema } from './CategoryAvgOrderByAggregateInput.schema';
import { CategoryMaxOrderByAggregateInputObjectSchema as CategoryMaxOrderByAggregateInputObjectSchema } from './CategoryMaxOrderByAggregateInput.schema';
import { CategoryMinOrderByAggregateInputObjectSchema as CategoryMinOrderByAggregateInputObjectSchema } from './CategoryMinOrderByAggregateInput.schema';
import { CategorySumOrderByAggregateInputObjectSchema as CategorySumOrderByAggregateInputObjectSchema } from './CategorySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  onCarousel: SortOrderSchema.optional(),
  imageUrl: SortOrderSchema.optional(),
  shortDescription: SortOrderSchema.optional(),
  longDescription: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CategoryAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CategorySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CategoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryOrderByWithAggregationInput>;
export const CategoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
