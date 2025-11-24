import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

const pagewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PageWhereInputObjectSchema), z.lazy(() => PageWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PageWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PageWhereInputObjectSchema), z.lazy(() => PageWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  layout: z.lazy(() => JsonFilterObjectSchema).optional(),
  isPublished: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  author: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const PageWhereInputObjectSchema: z.ZodType<Prisma.PageWhereInput> = pagewhereinputSchema as unknown as z.ZodType<Prisma.PageWhereInput>;
export const PageWhereInputObjectZodSchema = pagewhereinputSchema;
