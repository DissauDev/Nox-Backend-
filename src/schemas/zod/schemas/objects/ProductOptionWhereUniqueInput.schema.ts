import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ProductOptionWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProductOptionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionWhereUniqueInput>;
export const ProductOptionWhereUniqueInputObjectZodSchema = makeSchema();
