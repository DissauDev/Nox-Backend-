import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  taxPercent: z.literal(true).optional(),
  taxFixed: z.literal(true).optional()
}).strict();
export const StoreConfigAvgAggregateInputObjectSchema: z.ZodType<Prisma.StoreConfigAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigAvgAggregateInputType>;
export const StoreConfigAvgAggregateInputObjectZodSchema = makeSchema();
