import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateNestedOneWithoutProductOptionValueInputObjectSchema as OptionValueCreateNestedOneWithoutProductOptionValueInputObjectSchema } from './OptionValueCreateNestedOneWithoutProductOptionValueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  optionValue: z.lazy(() => OptionValueCreateNestedOneWithoutProductOptionValueInputObjectSchema)
}).strict();
export const ProductOptionValueCreateWithoutProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueCreateWithoutProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueCreateWithoutProductOptionInput>;
export const ProductOptionValueCreateWithoutProductOptionInputObjectZodSchema = makeSchema();
