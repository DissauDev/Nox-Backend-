import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { ProductScalarRelationFilterObjectSchema as ProductScalarRelationFilterObjectSchema } from './ProductScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { OptionGroupScalarRelationFilterObjectSchema as OptionGroupScalarRelationFilterObjectSchema } from './OptionGroupScalarRelationFilter.schema';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './OptionGroupWhereInput.schema';
import { ProductOptionValueListRelationFilterObjectSchema as ProductOptionValueListRelationFilterObjectSchema } from './ProductOptionValueListRelationFilter.schema'

const productoptionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductOptionWhereInputObjectSchema), z.lazy(() => ProductOptionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductOptionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductOptionWhereInputObjectSchema), z.lazy(() => ProductOptionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  groupId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  product: z.union([z.lazy(() => ProductScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  group: z.union([z.lazy(() => OptionGroupScalarRelationFilterObjectSchema), z.lazy(() => OptionGroupWhereInputObjectSchema)]).optional(),
  values: z.lazy(() => ProductOptionValueListRelationFilterObjectSchema).optional()
}).strict();
export const ProductOptionWhereInputObjectSchema: z.ZodType<Prisma.ProductOptionWhereInput> = productoptionwhereinputSchema as unknown as z.ZodType<Prisma.ProductOptionWhereInput>;
export const ProductOptionWhereInputObjectZodSchema = productoptionwhereinputSchema;
