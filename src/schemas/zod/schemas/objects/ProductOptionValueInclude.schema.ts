import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionArgsObjectSchema as ProductOptionArgsObjectSchema } from './ProductOptionArgs.schema';
import { OptionValueArgsObjectSchema as OptionValueArgsObjectSchema } from './OptionValueArgs.schema'

const makeSchema = () => z.object({
  productOption: z.union([z.boolean(), z.lazy(() => ProductOptionArgsObjectSchema)]).optional(),
  optionValue: z.union([z.boolean(), z.lazy(() => OptionValueArgsObjectSchema)]).optional()
}).strict();
export const ProductOptionValueIncludeObjectSchema: z.ZodType<Prisma.ProductOptionValueInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueInclude>;
export const ProductOptionValueIncludeObjectZodSchema = makeSchema();
