import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductOptionValueCountOrderByAggregateInputObjectSchema as ProductOptionValueCountOrderByAggregateInputObjectSchema } from './ProductOptionValueCountOrderByAggregateInput.schema';
import { ProductOptionValueMaxOrderByAggregateInputObjectSchema as ProductOptionValueMaxOrderByAggregateInputObjectSchema } from './ProductOptionValueMaxOrderByAggregateInput.schema';
import { ProductOptionValueMinOrderByAggregateInputObjectSchema as ProductOptionValueMinOrderByAggregateInputObjectSchema } from './ProductOptionValueMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productOptionId: SortOrderSchema.optional(),
  valueId: SortOrderSchema.optional(),
  _count: z.lazy(() => ProductOptionValueCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProductOptionValueMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProductOptionValueMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProductOptionValueOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProductOptionValueOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueOrderByWithAggregationInput>;
export const ProductOptionValueOrderByWithAggregationInputObjectZodSchema = makeSchema();
