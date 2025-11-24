import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { OptionGroupArgsObjectSchema as OptionGroupArgsObjectSchema } from './OptionGroupArgs.schema';
import { ProductOptionValueFindManySchema as ProductOptionValueFindManySchema } from '../findManyProductOptionValue.schema';
import { ProductOptionCountOutputTypeArgsObjectSchema as ProductOptionCountOutputTypeArgsObjectSchema } from './ProductOptionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  group: z.union([z.boolean(), z.lazy(() => OptionGroupArgsObjectSchema)]).optional(),
  values: z.union([z.boolean(), z.lazy(() => ProductOptionValueFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductOptionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductOptionIncludeObjectSchema: z.ZodType<Prisma.ProductOptionInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionInclude>;
export const ProductOptionIncludeObjectZodSchema = makeSchema();
