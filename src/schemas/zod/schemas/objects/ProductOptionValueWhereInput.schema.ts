import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { ProductOptionScalarRelationFilterObjectSchema as ProductOptionScalarRelationFilterObjectSchema } from './ProductOptionScalarRelationFilter.schema';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './ProductOptionWhereInput.schema';
import { OptionValueScalarRelationFilterObjectSchema as OptionValueScalarRelationFilterObjectSchema } from './OptionValueScalarRelationFilter.schema';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './OptionValueWhereInput.schema'

const productoptionvaluewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductOptionValueWhereInputObjectSchema), z.lazy(() => ProductOptionValueWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductOptionValueWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductOptionValueWhereInputObjectSchema), z.lazy(() => ProductOptionValueWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  productOptionId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  valueId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  productOption: z.union([z.lazy(() => ProductOptionScalarRelationFilterObjectSchema), z.lazy(() => ProductOptionWhereInputObjectSchema)]).optional(),
  optionValue: z.union([z.lazy(() => OptionValueScalarRelationFilterObjectSchema), z.lazy(() => OptionValueWhereInputObjectSchema)]).optional()
}).strict();
export const ProductOptionValueWhereInputObjectSchema: z.ZodType<Prisma.ProductOptionValueWhereInput> = productoptionvaluewhereinputSchema as unknown as z.ZodType<Prisma.ProductOptionValueWhereInput>;
export const ProductOptionValueWhereInputObjectZodSchema = productoptionvaluewhereinputSchema;
