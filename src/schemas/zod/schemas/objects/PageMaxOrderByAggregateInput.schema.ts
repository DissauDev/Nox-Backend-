import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  isPublished: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  author: SortOrderSchema.optional()
}).strict();
export const PageMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PageMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PageMaxOrderByAggregateInput>;
export const PageMaxOrderByAggregateInputObjectZodSchema = makeSchema();
