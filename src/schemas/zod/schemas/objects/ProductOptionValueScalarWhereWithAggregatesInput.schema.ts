import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'

const productoptionvaluescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductOptionValueScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductOptionValueScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductOptionValueScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductOptionValueScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProductOptionValueScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  productOptionId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  valueId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const ProductOptionValueScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProductOptionValueScalarWhereWithAggregatesInput> = productoptionvaluescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ProductOptionValueScalarWhereWithAggregatesInput>;
export const ProductOptionValueScalarWhereWithAggregatesInputObjectZodSchema = productoptionvaluescalarwherewithaggregatesinputSchema;
