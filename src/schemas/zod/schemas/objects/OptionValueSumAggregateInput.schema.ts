import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  extraPrice: z.literal(true).optional(),
  sortOrder: z.literal(true).optional()
}).strict();
export const OptionValueSumAggregateInputObjectSchema: z.ZodType<Prisma.OptionValueSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueSumAggregateInputType>;
export const OptionValueSumAggregateInputObjectZodSchema = makeSchema();
