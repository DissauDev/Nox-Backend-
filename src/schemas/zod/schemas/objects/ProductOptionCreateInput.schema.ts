import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutOptionsInputObjectSchema as ProductCreateNestedOneWithoutOptionsInputObjectSchema } from './ProductCreateNestedOneWithoutOptionsInput.schema';
import { OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema as OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateNestedOneWithoutProductOptionsInput.schema';
import { ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema as ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateNestedManyWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sortOrder: z.number().int().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOptionsInputObjectSchema),
  group: z.lazy(() => OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema),
  values: z.lazy(() => ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema)
}).strict();
export const ProductOptionCreateInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateInput>;
export const ProductOptionCreateInputObjectZodSchema = makeSchema();
