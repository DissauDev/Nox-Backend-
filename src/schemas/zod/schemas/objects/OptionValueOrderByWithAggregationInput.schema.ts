import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OptionValueCountOrderByAggregateInputObjectSchema as OptionValueCountOrderByAggregateInputObjectSchema } from './OptionValueCountOrderByAggregateInput.schema';
import { OptionValueAvgOrderByAggregateInputObjectSchema as OptionValueAvgOrderByAggregateInputObjectSchema } from './OptionValueAvgOrderByAggregateInput.schema';
import { OptionValueMaxOrderByAggregateInputObjectSchema as OptionValueMaxOrderByAggregateInputObjectSchema } from './OptionValueMaxOrderByAggregateInput.schema';
import { OptionValueMinOrderByAggregateInputObjectSchema as OptionValueMinOrderByAggregateInputObjectSchema } from './OptionValueMinOrderByAggregateInput.schema';
import { OptionValueSumOrderByAggregateInputObjectSchema as OptionValueSumOrderByAggregateInputObjectSchema } from './OptionValueSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  extraPrice: SortOrderSchema.optional(),
  imageUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  description: SortOrderSchema.optional(),
  isAvailable: SortOrderSchema.optional(),
  productRefId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sortOrder: SortOrderSchema.optional(),
  _count: z.lazy(() => OptionValueCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => OptionValueAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OptionValueMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OptionValueMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => OptionValueSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OptionValueOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OptionValueOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueOrderByWithAggregationInput>;
export const OptionValueOrderByWithAggregationInputObjectZodSchema = makeSchema();
