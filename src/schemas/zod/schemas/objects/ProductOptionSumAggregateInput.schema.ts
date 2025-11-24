import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductOptionSumAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionSumAggregateInputType>;
export const ProductOptionSumAggregateInputObjectZodSchema = makeSchema();
