import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  extraPrice: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional()
}).strict();
export const OptionValueAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OptionValueAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueAvgOrderByAggregateInput>;
export const OptionValueAvgOrderByAggregateInputObjectZodSchema = makeSchema();
