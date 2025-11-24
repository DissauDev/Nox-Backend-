import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  groupId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductOptionUncheckedCreateWithoutValuesInputObjectSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutValuesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutValuesInput>;
export const ProductOptionUncheckedCreateWithoutValuesInputObjectZodSchema = makeSchema();
