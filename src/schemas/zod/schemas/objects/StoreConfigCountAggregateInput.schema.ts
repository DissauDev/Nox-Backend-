import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  taxEnabled: z.literal(true).optional(),
  taxPercent: z.literal(true).optional(),
  taxFixed: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  taxLabel: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const StoreConfigCountAggregateInputObjectSchema: z.ZodType<Prisma.StoreConfigCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigCountAggregateInputType>;
export const StoreConfigCountAggregateInputObjectZodSchema = makeSchema();
