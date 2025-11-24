import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  slug: z.string().optional()
}).strict();
export const PageWhereUniqueInputObjectSchema: z.ZodType<Prisma.PageWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PageWhereUniqueInput>;
export const PageWhereUniqueInputObjectZodSchema = makeSchema();
