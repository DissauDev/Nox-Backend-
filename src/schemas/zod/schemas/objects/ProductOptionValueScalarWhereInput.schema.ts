import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'

const productoptionvaluescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema), z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema), z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  productOptionId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  valueId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const ProductOptionValueScalarWhereInputObjectSchema: z.ZodType<Prisma.ProductOptionValueScalarWhereInput> = productoptionvaluescalarwhereinputSchema as unknown as z.ZodType<Prisma.ProductOptionValueScalarWhereInput>;
export const ProductOptionValueScalarWhereInputObjectZodSchema = productoptionvaluescalarwhereinputSchema;
