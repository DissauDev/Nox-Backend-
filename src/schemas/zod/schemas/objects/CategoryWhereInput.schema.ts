import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumProductStatusFilterObjectSchema as EnumProductStatusFilterObjectSchema } from './EnumProductStatusFilter.schema';
import { ProductStatusSchema } from '../enums/ProductStatus.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { ProductListRelationFilterObjectSchema as ProductListRelationFilterObjectSchema } from './ProductListRelationFilter.schema'

const categorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CategoryWhereInputObjectSchema), z.lazy(() => CategoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CategoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CategoryWhereInputObjectSchema), z.lazy(() => CategoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumProductStatusFilterObjectSchema), ProductStatusSchema]).optional(),
  onCarousel: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  imageUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  shortDescription: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  longDescription: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  products: z.lazy(() => ProductListRelationFilterObjectSchema).optional()
}).strict();
export const CategoryWhereInputObjectSchema: z.ZodType<Prisma.CategoryWhereInput> = categorywhereinputSchema as unknown as z.ZodType<Prisma.CategoryWhereInput>;
export const CategoryWhereInputObjectZodSchema = categorywhereinputSchema;
