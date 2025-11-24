import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ProductOptionOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionOrderByRelationAggregateInput>;
export const ProductOptionOrderByRelationAggregateInputObjectZodSchema = makeSchema();
