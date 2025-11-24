import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const PageSumAggregateInputObjectSchema: z.ZodType<Prisma.PageSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PageSumAggregateInputType>;
export const PageSumAggregateInputObjectZodSchema = makeSchema();
