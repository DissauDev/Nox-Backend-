import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  groupId: z.string(),
  sortOrder: z.number().int().optional(),
  values: z.lazy(() => ProductOptionValueUncheckedCreateNestedManyWithoutProductOptionInputObjectSchema)
}).strict();
export const ProductOptionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUncheckedCreateInput>;
export const ProductOptionUncheckedCreateInputObjectZodSchema = makeSchema();
