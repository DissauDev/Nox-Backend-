import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  title: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  isPublished: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  author: z.literal(true).optional()
}).strict();
export const PageMaxAggregateInputObjectSchema: z.ZodType<Prisma.PageMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PageMaxAggregateInputType>;
export const PageMaxAggregateInputObjectZodSchema = makeSchema();
