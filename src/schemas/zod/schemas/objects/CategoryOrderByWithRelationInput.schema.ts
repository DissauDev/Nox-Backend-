import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductOrderByRelationAggregateInputObjectSchema as ProductOrderByRelationAggregateInputObjectSchema } from './ProductOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  onCarousel: SortOrderSchema.optional(),
  imageUrl: SortOrderSchema.optional(),
  shortDescription: SortOrderSchema.optional(),
  longDescription: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CategoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryOrderByWithRelationInput>;
export const CategoryOrderByWithRelationInputObjectZodSchema = makeSchema();
