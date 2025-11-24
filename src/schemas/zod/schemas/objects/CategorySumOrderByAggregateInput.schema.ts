import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sortOrder: SortOrderSchema.optional()
}).strict();
export const CategorySumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategorySumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategorySumOrderByAggregateInput>;
export const CategorySumOrderByAggregateInputObjectZodSchema = makeSchema();
