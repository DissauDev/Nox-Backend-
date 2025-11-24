import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productOptionId: z.string(),
  valueId: z.string()
}).strict();
export const ProductOptionValueUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUncheckedCreateInput>;
export const ProductOptionValueUncheckedCreateInputObjectZodSchema = makeSchema();
