import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  groupId: z.literal(true).optional(),
  sortOrder: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ProductOptionCountAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCountAggregateInputType>;
export const ProductOptionCountAggregateInputObjectZodSchema = makeSchema();
