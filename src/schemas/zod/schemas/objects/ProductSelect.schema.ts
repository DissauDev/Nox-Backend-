import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryArgsObjectSchema as CategoryArgsObjectSchema } from './CategoryArgs.schema';
import { ProductOptionFindManySchema as ProductOptionFindManySchema } from '../findManyProductOption.schema';
import { OrderItemFindManySchema as OrderItemFindManySchema } from '../findManyOrderItem.schema';
import { OptionValueFindManySchema as OptionValueFindManySchema } from '../findManyOptionValue.schema';
import { ProductCountOutputTypeArgsObjectSchema as ProductCountOutputTypeArgsObjectSchema } from './ProductCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  price: z.boolean().optional(),
  salePrice: z.boolean().optional(),
  specifications: z.boolean().optional(),
  description: z.boolean().optional(),
  imageLeft: z.boolean().optional(),
  imageRight: z.boolean().optional(),
  type: z.boolean().optional(),
  status: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  category: z.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)]).optional(),
  options: z.union([z.boolean(), z.lazy(() => ProductOptionFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  OrderItem: z.union([z.boolean(), z.lazy(() => OrderItemFindManySchema)]).optional(),
  sortOrder: z.boolean().optional(),
  OptionValue: z.union([z.boolean(), z.lazy(() => OptionValueFindManySchema)]).optional(),
  isOptionItem: z.boolean().optional(),
  packOptionSurcharge: z.boolean().optional(),
  packMaxItems: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ProductSelectObjectSchema: z.ZodType<Prisma.ProductSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductSelect>;
export const ProductSelectObjectZodSchema = makeSchema();
