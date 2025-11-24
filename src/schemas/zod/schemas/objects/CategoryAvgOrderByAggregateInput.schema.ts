import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sortOrder: SortOrderSchema.optional()
}).strict();
export const CategoryAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryAvgOrderByAggregateInput>;
export const CategoryAvgOrderByAggregateInputObjectZodSchema = makeSchema();
