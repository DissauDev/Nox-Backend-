import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  groupId: z.string(),
  sortOrder: z.number().int().optional(),
  values: z.lazy(() => ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema).optional()
}).strict();
export const ProductOptionUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutProductInput>;
export const ProductOptionUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();
