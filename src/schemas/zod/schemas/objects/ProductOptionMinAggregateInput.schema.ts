import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  groupId: z.literal(true).optional(),
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductOptionMinAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionMinAggregateInputType>;
export const ProductOptionMinAggregateInputObjectZodSchema = makeSchema();
