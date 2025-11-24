import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sortOrder: SortOrderSchema.optional()
}).strict();
export const ProductOptionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionAvgOrderByAggregateInput>;
export const ProductOptionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
