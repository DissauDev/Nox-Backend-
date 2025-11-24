import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  taxEnabled: z.boolean().optional(),
  taxPercent: z.boolean().optional(),
  taxFixed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  taxLabel: z.boolean().optional()
}).strict();
export const StoreConfigSelectObjectSchema: z.ZodType<Prisma.StoreConfigSelect> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigSelect>;
export const StoreConfigSelectObjectZodSchema = makeSchema();
