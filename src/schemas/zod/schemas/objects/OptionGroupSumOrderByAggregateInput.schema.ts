import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  minSelectable: SortOrderSchema.optional(),
  maxSelectable: SortOrderSchema.optional()
}).strict();
export const OptionGroupSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OptionGroupSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupSumOrderByAggregateInput>;
export const OptionGroupSumOrderByAggregateInputObjectZodSchema = makeSchema();
