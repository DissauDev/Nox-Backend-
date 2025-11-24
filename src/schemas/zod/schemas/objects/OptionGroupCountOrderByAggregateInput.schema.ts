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
export const OptionGroupCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OptionGroupCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCountOrderByAggregateInput>;
export const OptionGroupCountOrderByAggregateInputObjectZodSchema = makeSchema();
