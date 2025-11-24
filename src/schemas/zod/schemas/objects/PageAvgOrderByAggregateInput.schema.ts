import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const PageAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PageAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PageAvgOrderByAggregateInput>;
export const PageAvgOrderByAggregateInputObjectZodSchema = makeSchema();
