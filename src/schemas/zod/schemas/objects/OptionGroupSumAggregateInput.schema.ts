import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  minSelectable: z.literal(true).optional(),
  maxSelectable: z.literal(true).optional()
}).strict();
export const OptionGroupSumAggregateInputObjectSchema: z.ZodType<Prisma.OptionGroupSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupSumAggregateInputType>;
export const OptionGroupSumAggregateInputObjectZodSchema = makeSchema();
