import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductStatusSchema } from '../enums/ProductStatus.schema';
import { ProductCreateNestedManyWithoutCategoryInputObjectSchema as ProductCreateNestedManyWithoutCategoryInputObjectSchema } from './ProductCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  status: ProductStatusSchema.optional(),
  onCarousel: z.boolean().optional(),
  imageUrl: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  createdAt: z.coerce.date().optional(),
  sortOrder: z.number().int().optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutCategoryInputObjectSchema)
}).strict();
export const CategoryCreateInputObjectSchema: z.ZodType<Prisma.CategoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateInput>;
export const CategoryCreateInputObjectZodSchema = makeSchema();
