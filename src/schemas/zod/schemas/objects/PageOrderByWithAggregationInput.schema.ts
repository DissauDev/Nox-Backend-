import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PageCountOrderByAggregateInputObjectSchema as PageCountOrderByAggregateInputObjectSchema } from './PageCountOrderByAggregateInput.schema';
import { PageAvgOrderByAggregateInputObjectSchema as PageAvgOrderByAggregateInputObjectSchema } from './PageAvgOrderByAggregateInput.schema';
import { PageMaxOrderByAggregateInputObjectSchema as PageMaxOrderByAggregateInputObjectSchema } from './PageMaxOrderByAggregateInput.schema';
import { PageMinOrderByAggregateInputObjectSchema as PageMinOrderByAggregateInputObjectSchema } from './PageMinOrderByAggregateInput.schema';
import { PageSumOrderByAggregateInputObjectSchema as PageSumOrderByAggregateInputObjectSchema } from './PageSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  layout: SortOrderSchema.optional(),
  isPublished: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  author: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => PageCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PageAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PageMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PageMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PageSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PageOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PageOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PageOrderByWithAggregationInput>;
export const PageOrderByWithAggregationInputObjectZodSchema = makeSchema();
