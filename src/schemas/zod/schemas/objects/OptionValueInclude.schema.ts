import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupArgsObjectSchema as OptionGroupArgsObjectSchema } from './OptionGroupArgs.schema';
import { ProductOptionValueFindManySchema as ProductOptionValueFindManySchema } from '../findManyProductOptionValue.schema';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { OptionValueCountOutputTypeArgsObjectSchema as OptionValueCountOutputTypeArgsObjectSchema } from './OptionValueCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  group: z.union([z.boolean(), z.lazy(() => OptionGroupArgsObjectSchema)]).optional(),
  ProductOptionValue: z.union([z.boolean(), z.lazy(() => ProductOptionValueFindManySchema)]).optional(),
  productRef: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OptionValueCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OptionValueIncludeObjectSchema: z.ZodType<Prisma.OptionValueInclude> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueInclude>;
export const OptionValueIncludeObjectZodSchema = makeSchema();
