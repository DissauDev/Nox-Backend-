import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  minSelectable: z.literal(true).optional(),
  maxSelectable: z.literal(true).optional()
}).strict();
export const OptionGroupAvgAggregateInputObjectSchema: z.ZodType<Prisma.OptionGroupAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupAvgAggregateInputType>;
export const OptionGroupAvgAggregateInputObjectZodSchema = makeSchema();
