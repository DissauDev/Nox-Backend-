import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'

const productoptionscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductOptionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductOptionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductOptionScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductOptionScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductOptionScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  groupId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sortOrder: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const ProductOptionScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProductOptionScalarWhereWithAggregatesInput> = productoptionscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ProductOptionScalarWhereWithAggregatesInput>;
export const ProductOptionScalarWhereWithAggregatesInputObjectZodSchema = productoptionscalarwherewithaggregatesinputSchema;
