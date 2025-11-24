import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  sortOrder: z.number().int().optional(),
  values: z.lazy(() => ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema).optional()
}).strict();
export const ProductOptionUncheckedCreateWithoutGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutGroupInput>;
export const ProductOptionUncheckedCreateWithoutGroupInputObjectZodSchema = makeSchema();
