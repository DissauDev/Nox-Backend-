import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  status: z.literal(true).optional(),
  onCarousel: z.literal(true).optional(),
  imageUrl: z.literal(true).optional(),
  shortDescription: z.literal(true).optional(),
  longDescription: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  sortOrder: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CategoryCountAggregateInputObjectSchema: z.ZodType<Prisma.CategoryCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCountAggregateInputType>;
export const CategoryCountAggregateInputObjectZodSchema = makeSchema();
