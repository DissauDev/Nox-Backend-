import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const OptionValueWhereUniqueInputObjectSchema: z.ZodType<Prisma.OptionValueWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueWhereUniqueInput>;
export const OptionValueWhereUniqueInputObjectZodSchema = makeSchema();
