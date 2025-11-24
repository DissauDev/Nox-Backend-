import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  extraPrice: SortOrderSchema.optional(),
  imageUrl: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  isAvailable: SortOrderSchema.optional(),
  productRefId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional()
}).strict();
export const OptionValueMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OptionValueMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueMaxOrderByAggregateInput>;
export const OptionValueMaxOrderByAggregateInputObjectZodSchema = makeSchema();
