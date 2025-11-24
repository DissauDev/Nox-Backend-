import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutOptionsInputObjectSchema as ProductCreateNestedOneWithoutOptionsInputObjectSchema } from './ProductCreateNestedOneWithoutOptionsInput.schema';
import { ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema as ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateNestedManyWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sortOrder: z.number().int().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOptionsInputObjectSchema),
  values: z.lazy(() => ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema).optional()
}).strict();
export const ProductOptionCreateWithoutGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateWithoutGroupInput>;
export const ProductOptionCreateWithoutGroupInputObjectZodSchema = makeSchema();
