import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema as OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateNestedOneWithoutProductOptionsInput.schema';
import { ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema as ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema } from './ProductOptionValueCreateNestedManyWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  sortOrder: z.number().int().optional(),
  group: z.lazy(() => OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema),
  values: z.lazy(() => ProductOptionValueCreateNestedManyWithoutProductOptionInputObjectSchema).optional()
}).strict();
export const ProductOptionCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCreateWithoutProductInput>;
export const ProductOptionCreateWithoutProductInputObjectZodSchema = makeSchema();
