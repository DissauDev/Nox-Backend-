import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  extraPrice: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional()
}).strict();
export const OptionValueSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OptionValueSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueSumOrderByAggregateInput>;
export const OptionValueSumOrderByAggregateInputObjectZodSchema = makeSchema();
