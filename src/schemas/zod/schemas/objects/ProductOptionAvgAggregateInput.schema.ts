import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductOptionAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionAvgAggregateInputType>;
export const ProductOptionAvgAggregateInputObjectZodSchema = makeSchema();
