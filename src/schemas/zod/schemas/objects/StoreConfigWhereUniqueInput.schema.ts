import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const StoreConfigWhereUniqueInputObjectSchema: z.ZodType<Prisma.StoreConfigWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.StoreConfigWhereUniqueInput>;
export const StoreConfigWhereUniqueInputObjectZodSchema = makeSchema();
