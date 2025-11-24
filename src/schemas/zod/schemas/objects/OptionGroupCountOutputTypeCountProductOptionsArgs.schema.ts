import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './ProductOptionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionWhereInputObjectSchema).optional()
}).strict();
export const OptionGroupCountOutputTypeCountProductOptionsArgsObjectSchema = makeSchema();
export const OptionGroupCountOutputTypeCountProductOptionsArgsObjectZodSchema = makeSchema();
