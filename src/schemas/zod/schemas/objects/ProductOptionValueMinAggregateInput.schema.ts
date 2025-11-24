import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productOptionId: z.literal(true).optional(),
  valueId: z.literal(true).optional()
}).strict();
export const ProductOptionValueMinAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueMinAggregateInputType>;
export const ProductOptionValueMinAggregateInputObjectZodSchema = makeSchema();
