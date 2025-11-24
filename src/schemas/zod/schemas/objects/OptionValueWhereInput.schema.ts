import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { OptionGroupScalarRelationFilterObjectSchema as OptionGroupScalarRelationFilterObjectSchema } from './OptionGroupScalarRelationFilter.schema';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './OptionGroupWhereInput.schema';
import { ProductOptionValueListRelationFilterObjectSchema as ProductOptionValueListRelationFilterObjectSchema } from './ProductOptionValueListRelationFilter.schema';
import { ProductNullableScalarRelationFilterObjectSchema as ProductNullableScalarRelationFilterObjectSchema } from './ProductNullableScalarRelationFilter.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const optionvaluewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OptionValueWhereInputObjectSchema), z.lazy(() => OptionValueWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OptionValueWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OptionValueWhereInputObjectSchema), z.lazy(() => OptionValueWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  groupId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  extraPrice: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  imageUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  isAvailable: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  productRefId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  group: z.union([z.lazy(() => OptionGroupScalarRelationFilterObjectSchema), z.lazy(() => OptionGroupWhereInputObjectSchema)]).optional(),
  ProductOptionValue: z.lazy(() => ProductOptionValueListRelationFilterObjectSchema).optional(),
  productRef: z.union([z.lazy(() => ProductNullableScalarRelationFilterObjectSchema), z.lazy(() => ProductWhereInputObjectSchema)]).optional()
}).strict();
export const OptionValueWhereInputObjectSchema: z.ZodType<Prisma.OptionValueWhereInput> = optionvaluewhereinputSchema as unknown as z.ZodType<Prisma.OptionValueWhereInput>;
export const OptionValueWhereInputObjectZodSchema = optionvaluewhereinputSchema;
