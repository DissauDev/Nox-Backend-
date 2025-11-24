import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionArgsObjectSchema as ProductOptionArgsObjectSchema } from './ProductOptionArgs.schema';
import { OptionValueArgsObjectSchema as OptionValueArgsObjectSchema } from './OptionValueArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  productOptionId: z.boolean().optional(),
  valueId: z.boolean().optional(),
  productOption: z.union([z.boolean(), z.lazy(() => ProductOptionArgsObjectSchema)]).optional(),
  optionValue: z.union([z.boolean(), z.lazy(() => OptionValueArgsObjectSchema)]).optional()
}).strict();
export const ProductOptionValueSelectObjectSchema: z.ZodType<Prisma.ProductOptionValueSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueSelect>;
export const ProductOptionValueSelectObjectZodSchema = makeSchema();
