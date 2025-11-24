import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryArgsObjectSchema as CategoryArgsObjectSchema } from './CategoryArgs.schema';
import { ProductOptionFindManySchema as ProductOptionFindManySchema } from '../findManyProductOption.schema';
import { OrderItemFindManySchema as OrderItemFindManySchema } from '../findManyOrderItem.schema';
import { OptionValueFindManySchema as OptionValueFindManySchema } from '../findManyOptionValue.schema';
import { ProductCountOutputTypeArgsObjectSchema as ProductCountOutputTypeArgsObjectSchema } from './ProductCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  category: z.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)]).optional(),
  options: z.union([z.boolean(), z.lazy(() => ProductOptionFindManySchema)]).optional(),
  OrderItem: z.union([z.boolean(), z.lazy(() => OrderItemFindManySchema)]).optional(),
  OptionValue: z.union([z.boolean(), z.lazy(() => OptionValueFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductIncludeObjectSchema: z.ZodType<Prisma.ProductInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProductInclude>;
export const ProductIncludeObjectZodSchema = makeSchema();
