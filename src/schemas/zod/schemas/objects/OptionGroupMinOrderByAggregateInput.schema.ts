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
export const OptionGroupMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OptionGroupMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupMinOrderByAggregateInput>;
export const OptionGroupMinOrderByAggregateInputObjectZodSchema = makeSchema();
