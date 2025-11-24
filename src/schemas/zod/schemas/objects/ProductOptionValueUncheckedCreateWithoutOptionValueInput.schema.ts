import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productOptionId: z.string()
}).strict();
export const ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUncheckedCreateWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUncheckedCreateWithoutOptionValueInput>;
export const ProductOptionValueUncheckedCreateWithoutOptionValueInputObjectZodSchema = makeSchema();
