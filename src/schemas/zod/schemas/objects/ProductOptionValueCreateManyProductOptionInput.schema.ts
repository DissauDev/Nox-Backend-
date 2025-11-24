import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  valueId: z.string()
}).strict();
export const ProductOptionValueCreateManyProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateManyProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateManyProductOptionInput>;
export const ProductOptionValueCreateManyProductOptionInputObjectZodSchema = makeSchema();
