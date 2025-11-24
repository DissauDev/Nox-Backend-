import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productOptionId: z.literal(true).optional(),
  valueId: z.literal(true).optional()
}).strict();
export const ProductOptionValueMaxAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueMaxAggregateInputType>;
export const ProductOptionValueMaxAggregateInputObjectZodSchema = makeSchema();
