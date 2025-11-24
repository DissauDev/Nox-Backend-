import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateNestedOneWithoutValuesInputObjectSchema as ProductOptionCreateNestedOneWithoutValuesInputObjectSchema } from './ProductOptionCreateNestedOneWithoutValuesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  productOption: z.lazy(() => ProductOptionCreateNestedOneWithoutValuesInputObjectSchema)
}).strict();
export const ProductOptionValueCreateWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateWithoutOptionValueInput>;
export const ProductOptionValueCreateWithoutOptionValueInputObjectZodSchema = makeSchema();
