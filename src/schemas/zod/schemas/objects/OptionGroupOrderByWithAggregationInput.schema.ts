import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OptionGroupCountOrderByAggregateInputObjectSchema as OptionGroupCountOrderByAggregateInputObjectSchema } from './OptionGroupCountOrderByAggregateInput.schema';
import { OptionGroupAvgOrderByAggregateInputObjectSchema as OptionGroupAvgOrderByAggregateInputObjectSchema } from './OptionGroupAvgOrderByAggregateInput.schema';
import { OptionGroupMaxOrderByAggregateInputObjectSchema as OptionGroupMaxOrderByAggregateInputObjectSchema } from './OptionGroupMaxOrderByAggregateInput.schema';
import { OptionGroupMinOrderByAggregateInputObjectSchema as OptionGroupMinOrderByAggregateInputObjectSchema } from './OptionGroupMinOrderByAggregateInput.schema';
import { OptionGroupSumOrderByAggregateInputObjectSchema as OptionGroupSumOrderByAggregateInputObjectSchema } from './OptionGroupSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  required: SortOrderSchema.optional(),
  minSelectable: SortOrderSchema.optional(),
  maxSelectable: SortOrderSchema.optional(),
  isAvailable: SortOrderSchema.optional(),
  showImages: SortOrderSchema.optional(),
  selectionTitle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => OptionGroupCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => OptionGroupAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OptionGroupMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OptionGroupMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => OptionGroupSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OptionGroupOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OptionGroupOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupOrderByWithAggregationInput>;
export const OptionGroupOrderByWithAggregationInputObjectZodSchema = makeSchema();
