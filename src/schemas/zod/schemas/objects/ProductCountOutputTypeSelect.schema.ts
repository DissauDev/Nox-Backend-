import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCountOutputTypeCountOptionsArgsObjectSchema as ProductCountOutputTypeCountOptionsArgsObjectSchema } from './ProductCountOutputTypeCountOptionsArgs.schema';
import { ProductCountOutputTypeCountOrderItemArgsObjectSchema as ProductCountOutputTypeCountOrderItemArgsObjectSchema } from './ProductCountOutputTypeCountOrderItemArgs.schema';
import { ProductCountOutputTypeCountOptionValueArgsObjectSchema as ProductCountOutputTypeCountOptionValueArgsObjectSchema } from './ProductCountOutputTypeCountOptionValueArgs.schema'

const makeSchema = () => z.object({
  options: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountOptionsArgsObjectSchema)]).optional(),
  OrderItem: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountOrderItemArgsObjectSchema)]).optional(),
  OptionValue: z.union([z.boolean(), z.lazy(() => ProductCountOutputTypeCountOptionValueArgsObjectSchema)]).optional()
}).strict();
export const ProductCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductCountOutputTypeSelect>;
export const ProductCountOutputTypeSelectObjectZodSchema = makeSchema();
