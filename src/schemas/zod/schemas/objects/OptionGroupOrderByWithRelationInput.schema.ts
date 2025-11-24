import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProductOptionOrderByRelationAggregateInputObjectSchema as ProductOptionOrderByRelationAggregateInputObjectSchema } from './ProductOptionOrderByRelationAggregateInput.schema';
import { OptionValueOrderByRelationAggregateInputObjectSchema as OptionValueOrderByRelationAggregateInputObjectSchema } from './OptionValueOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  required: SortOrderSchema.optional(),
  minSelectable: SortOrderSchema.optional(),
  maxSelectable: SortOrderSchema.optional(),
  isAvailable: SortOrderSchema.optional(),
  showImages: SortOrderSchema.optional(),
  selectionTitle: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  productOptions: z.lazy(() => ProductOptionOrderByRelationAggregateInputObjectSchema).optional(),
  OptionValue: z.lazy(() => OptionValueOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const OptionGroupOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OptionGroupOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupOrderByWithRelationInput>;
export const OptionGroupOrderByWithRelationInputObjectZodSchema = makeSchema();
