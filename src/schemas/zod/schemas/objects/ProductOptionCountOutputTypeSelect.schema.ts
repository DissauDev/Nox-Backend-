import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCountOutputTypeCountValuesArgsObjectSchema as ProductOptionCountOutputTypeCountValuesArgsObjectSchema } from './ProductOptionCountOutputTypeCountValuesArgs.schema'

const makeSchema = () => z.object({
  values: z.union([z.boolean(), z.lazy(() => ProductOptionCountOutputTypeCountValuesArgsObjectSchema)]).optional()
}).strict();
export const ProductOptionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProductOptionCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionCountOutputTypeSelect>;
export const ProductOptionCountOutputTypeSelectObjectZodSchema = makeSchema();
