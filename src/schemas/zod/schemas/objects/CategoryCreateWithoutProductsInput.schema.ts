import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductStatusSchema } from '../enums/ProductStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  status: ProductStatusSchema.optional(),
  onCarousel: z.boolean().optional(),
  imageUrl: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  createdAt: z.coerce.date().optional(),
  sortOrder: z.number().int().optional()
}).strict();
export const CategoryCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.CategoryCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateWithoutProductsInput>;
export const CategoryCreateWithoutProductsInputObjectZodSchema = makeSchema();
