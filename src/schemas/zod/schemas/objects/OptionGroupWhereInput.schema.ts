import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { ProductOptionListRelationFilterObjectSchema as ProductOptionListRelationFilterObjectSchema } from './ProductOptionListRelationFilter.schema';
import { OptionValueListRelationFilterObjectSchema as OptionValueListRelationFilterObjectSchema } from './OptionValueListRelationFilter.schema'

const optiongroupwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OptionGroupWhereInputObjectSchema), z.lazy(() => OptionGroupWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OptionGroupWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OptionGroupWhereInputObjectSchema), z.lazy(() => OptionGroupWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  required: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  minSelectable: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  maxSelectable: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  isAvailable: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  showImages: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  selectionTitle: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  productOptions: z.lazy(() => ProductOptionListRelationFilterObjectSchema).optional(),
  OptionValue: z.lazy(() => OptionValueListRelationFilterObjectSchema).optional()
}).strict();
export const OptionGroupWhereInputObjectSchema: z.ZodType<Prisma.OptionGroupWhereInput> = optiongroupwhereinputSchema as unknown as z.ZodType<Prisma.OptionGroupWhereInput>;
export const OptionGroupWhereInputObjectZodSchema = optiongroupwhereinputSchema;
