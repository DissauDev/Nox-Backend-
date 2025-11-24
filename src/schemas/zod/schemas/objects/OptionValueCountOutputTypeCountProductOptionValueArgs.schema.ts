import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueWhereInputObjectSchema as ProductOptionValueWhereInputObjectSchema } from './ProductOptionValueWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueWhereInputObjectSchema).optional()
}).strict();
export const OptionValueCountOutputTypeCountProductOptionValueArgsObjectSchema = makeSchema();
export const OptionValueCountOutputTypeCountProductOptionValueArgsObjectZodSchema = makeSchema();
