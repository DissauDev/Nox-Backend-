import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  required: SortOrderSchema.optional(),
  minSelectable: SortOrderSchema.optional(),
  maxSelectable: SortOrderSchema.optional(),
  isAvailable: SortOrderSchema.optional(),
  showImages: SortOrderSchema.optional(),
  selectionTitle: SortOrderSchema.optional()
}).strict();
export const OptionGroupMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OptionGroupMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupMaxOrderByAggregateInput>;
export const OptionGroupMaxOrderByAggregateInputObjectZodSchema = makeSchema();
