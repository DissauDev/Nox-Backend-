import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ProductOptionValueOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueOrderByRelationAggregateInput>;
export const ProductOptionValueOrderByRelationAggregateInputObjectZodSchema = makeSchema();
