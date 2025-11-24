import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutOptionsInputObjectSchema as ProductCreateNestedOneWithoutOptionsInputObjectSchema } from './ProductCreateNestedOneWithoutOptionsInput.schema';
import { OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema as OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateNestedOneWithoutProductOptionsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sortOrder: z.number().int().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOptionsInputObjectSchema),
  group: z.lazy(() => OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema)
}).strict();
export const ProductOptionCreateWithoutValuesInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateWithoutValuesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateWithoutValuesInput>;
export const ProductOptionCreateWithoutValuesInputObjectZodSchema = makeSchema();
