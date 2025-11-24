import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { StoreConfigCountOrderByAggregateInputObjectSchema as StoreConfigCountOrderByAggregateInputObjectSchema } from './StoreConfigCountOrderByAggregateInput.schema';
import { StoreConfigAvgOrderByAggregateInputObjectSchema as StoreConfigAvgOrderByAggregateInputObjectSchema } from './StoreConfigAvgOrderByAggregateInput.schema';
import { StoreConfigMaxOrderByAggregateInputObjectSchema as StoreConfigMaxOrderByAggregateInputObjectSchema } from './StoreConfigMaxOrderByAggregateInput.schema';
import { StoreConfigMinOrderByAggregateInputObjectSchema as StoreConfigMinOrderByAggregateInputObjectSchema } from './StoreConfigMinOrderByAggregateInput.schema';
import { StoreConfigSumOrderByAggregateInputObjectSchema as StoreConfigSumOrderByAggregateInputObjectSchema } from './StoreConfigSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  taxEnabled: SortOrderSchema.optional(),
  taxPercent: SortOrderSchema.optional(),
  taxFixed: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  taxLabel: SortOrderSchema.optional(),
  _count: z.lazy(() => StoreConfigCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => StoreConfigAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StoreConfigMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StoreConfigMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => StoreConfigSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StoreConfigOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StoreConfigOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigOrderByWithAggregationInput>;
export const StoreConfigOrderByWithAggregationInputObjectZodSchema = makeSchema();
