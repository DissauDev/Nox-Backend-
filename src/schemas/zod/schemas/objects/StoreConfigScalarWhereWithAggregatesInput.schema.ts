import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema as FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'

const storeconfigscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => StoreConfigScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StoreConfigScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StoreConfigScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StoreConfigScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StoreConfigScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  taxEnabled: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  taxPercent: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  taxFixed: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  taxLabel: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const StoreConfigScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.StoreConfigScalarWhereWithAggregatesInput> = storeconfigscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.StoreConfigScalarWhereWithAggregatesInput>;
export const StoreConfigScalarWhereWithAggregatesInputObjectZodSchema = storeconfigscalarwherewithaggregatesinputSchema;
