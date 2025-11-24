import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  taxPercent: SortOrderSchema.optional(),
  taxFixed: SortOrderSchema.optional()
}).strict();
export const StoreConfigSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StoreConfigSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigSumOrderByAggregateInput>;
export const StoreConfigSumOrderByAggregateInputObjectZodSchema = makeSchema();
