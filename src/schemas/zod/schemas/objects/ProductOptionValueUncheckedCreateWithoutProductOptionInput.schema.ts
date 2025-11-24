import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  valueId: z.string()
}).strict();
export const ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUncheckedCreateWithoutProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUncheckedCreateWithoutProductOptionInput>;
export const ProductOptionValueUncheckedCreateWithoutProductOptionInputObjectZodSchema = makeSchema();
