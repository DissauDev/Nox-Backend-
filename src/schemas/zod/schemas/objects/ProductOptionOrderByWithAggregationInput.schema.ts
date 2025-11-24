import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductOptionCountOrderByAggregateInputObjectSchema as ProductOptionCountOrderByAggregateInputObjectSchema } from './ProductOptionCountOrderByAggregateInput.schema';
import { ProductOptionAvgOrderByAggregateInputObjectSchema as ProductOptionAvgOrderByAggregateInputObjectSchema } from './ProductOptionAvgOrderByAggregateInput.schema';
import { ProductOptionMaxOrderByAggregateInputObjectSchema as ProductOptionMaxOrderByAggregateInputObjectSchema } from './ProductOptionMaxOrderByAggregateInput.schema';
import { ProductOptionMinOrderByAggregateInputObjectSchema as ProductOptionMinOrderByAggregateInputObjectSchema } from './ProductOptionMinOrderByAggregateInput.schema';
import { ProductOptionSumOrderByAggregateInputObjectSchema as ProductOptionSumOrderByAggregateInputObjectSchema } from './ProductOptionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  _count: z.lazy(() => ProductOptionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ProductOptionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProductOptionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProductOptionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ProductOptionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProductOptionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProductOptionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionOrderByWithAggregationInput>;
export const ProductOptionOrderByWithAggregationInputObjectZodSchema = makeSchema();
