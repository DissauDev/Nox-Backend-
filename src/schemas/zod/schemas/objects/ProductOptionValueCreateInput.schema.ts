import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateNestedOneWithoutValuesInputObjectSchema as ProductOptionCreateNestedOneWithoutValuesInputObjectSchema } from './ProductOptionCreateNestedOneWithoutValuesInput.schema';
import { OptionValueCreateNestedOneWithoutProductOptionValueInputObjectSchema as OptionValueCreateNestedOneWithoutProductOptionValueInputObjectSchema } from './OptionValueCreateNestedOneWithoutProductOptionValueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productOption: z.lazy(() => ProductOptionCreateNestedOneWithoutValuesInputObjectSchema),
  optionValue: z.lazy(() => OptionValueCreateNestedOneWithoutProductOptionValueInputObjectSchema)
}).strict();
export const ProductOptionValueCreateInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateInput>;
export const ProductOptionValueCreateInputObjectZodSchema = makeSchema();
