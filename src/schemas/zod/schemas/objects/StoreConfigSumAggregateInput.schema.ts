import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  taxPercent: z.literal(true).optional(),
  taxFixed: z.literal(true).optional()
}).strict();
export const StoreConfigSumAggregateInputObjectSchema: z.ZodType<Prisma.StoreConfigSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigSumAggregateInputType>;
export const StoreConfigSumAggregateInputObjectZodSchema = makeSchema();
