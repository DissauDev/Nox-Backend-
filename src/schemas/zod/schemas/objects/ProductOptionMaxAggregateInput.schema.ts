import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  groupId: z.literal(true).optional(),
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductOptionMaxAggregateInputObjectSchema: z.ZodType<Prisma.ProductOptionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionMaxAggregateInputType>;
export const ProductOptionMaxAggregateInputObjectZodSchema = makeSchema();
