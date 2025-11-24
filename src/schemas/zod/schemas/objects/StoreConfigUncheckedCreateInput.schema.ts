import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  taxEnabled: z.boolean().optional(),
  taxPercent: z.number().optional(),
  taxFixed: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  taxLabel: z.string().optional()
}).strict();
export const StoreConfigUncheckedCreateInputObjectSchema: z.ZodType<Prisma.StoreConfigUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigUncheckedCreateInput>;
export const StoreConfigUncheckedCreateInputObjectZodSchema = makeSchema();
