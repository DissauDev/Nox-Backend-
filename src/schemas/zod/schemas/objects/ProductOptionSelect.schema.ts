import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { OptionGroupArgsObjectSchema as OptionGroupArgsObjectSchema } from './OptionGroupArgs.schema';
import { ProductOptionValueFindManySchema as ProductOptionValueFindManySchema } from '../findManyProductOptionValue.schema';
import { ProductOptionCountOutputTypeArgsObjectSchema as ProductOptionCountOutputTypeArgsObjectSchema } from './ProductOptionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  productId: z.boolean().optional(),
  groupId: z.boolean().optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  group: z.union([z.boolean(), z.lazy(() => OptionGroupArgsObjectSchema)]).optional(),
  values: z.union([z.boolean(), z.lazy(() => ProductOptionValueFindManySchema)]).optional(),
  sortOrder: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductOptionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductOptionSelectObjectSchema: z.ZodType<Prisma.ProductOptionSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionSelect>;
export const ProductOptionSelectObjectZodSchema = makeSchema();
