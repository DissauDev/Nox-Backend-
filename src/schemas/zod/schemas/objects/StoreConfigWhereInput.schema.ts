import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'

const storeconfigwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StoreConfigWhereInputObjectSchema), z.lazy(() => StoreConfigWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StoreConfigWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StoreConfigWhereInputObjectSchema), z.lazy(() => StoreConfigWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  taxEnabled: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  taxPercent: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  taxFixed: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  taxLabel: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const StoreConfigWhereInputObjectSchema: z.ZodType<Prisma.StoreConfigWhereInput> = storeconfigwhereinputSchema as unknown as z.ZodType<Prisma.StoreConfigWhereInput>;
export const StoreConfigWhereInputObjectZodSchema = storeconfigwhereinputSchema;
