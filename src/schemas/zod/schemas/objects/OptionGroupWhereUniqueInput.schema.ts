import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const OptionGroupWhereUniqueInputObjectSchema: z.ZodType<Prisma.OptionGroupWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupWhereUniqueInput>;
export const OptionGroupWhereUniqueInputObjectZodSchema = makeSchema();
