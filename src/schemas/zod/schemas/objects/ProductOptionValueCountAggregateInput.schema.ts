import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productOptionId: z.literal(true).optional(),
  valueId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ProductOptionValueCountAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCountAggregateInputType>;
export const ProductOptionValueCountAggregateInputObjectZodSchema = makeSchema();
