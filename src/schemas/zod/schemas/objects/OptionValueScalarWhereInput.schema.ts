import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema'

const optionvaluescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OptionValueScalarWhereInputObjectSchema), z.lazy(() => OptionValueScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OptionValueScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OptionValueScalarWhereInputObjectSchema), z.lazy(() => OptionValueScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  groupId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  extraPrice: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  imageUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  isAvailable: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  productRefId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const OptionValueScalarWhereInputObjectSchema: z.ZodType<Prisma.OptionValueScalarWhereInput> = optionvaluescalarwhereinputSchema as unknown as z.ZodType<Prisma.OptionValueScalarWhereInput>;
export const OptionValueScalarWhereInputObjectZodSchema = optionvaluescalarwhereinputSchema;
