import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const PageSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PageSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PageSumOrderByAggregateInput>;
export const PageSumOrderByAggregateInputObjectZodSchema = makeSchema();
