import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema'

const productoptionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductOptionScalarWhereInputObjectSchema), z.lazy(() => ProductOptionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductOptionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductOptionScalarWhereInputObjectSchema), z.lazy(() => ProductOptionScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  groupId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const ProductOptionScalarWhereInputObjectSchema: z.ZodType<Prisma.ProductOptionScalarWhereInput> = productoptionscalarwhereinputSchema as unknown as z.ZodType<Prisma.ProductOptionScalarWhereInput>;
export const ProductOptionScalarWhereInputObjectZodSchema = productoptionscalarwhereinputSchema;
