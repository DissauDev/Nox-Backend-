import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  layout: SortOrderSchema.optional(),
  isPublished: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  author: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional()
}).strict();
export const PageOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PageOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PageOrderByWithRelationInput>;
export const PageOrderByWithRelationInputObjectZodSchema = makeSchema();
