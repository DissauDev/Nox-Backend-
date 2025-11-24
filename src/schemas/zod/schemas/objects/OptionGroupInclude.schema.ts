import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionFindManySchema as ProductOptionFindManySchema } from '../findManyProductOption.schema';
import { OptionValueFindManySchema as OptionValueFindManySchema } from '../findManyOptionValue.schema';
import { OptionGroupCountOutputTypeArgsObjectSchema as OptionGroupCountOutputTypeArgsObjectSchema } from './OptionGroupCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  productOptions: z.union([z.boolean(), z.lazy(() => ProductOptionFindManySchema)]).optional(),
  OptionValue: z.union([z.boolean(), z.lazy(() => OptionValueFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OptionGroupCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OptionGroupIncludeObjectSchema: z.ZodType<Prisma.OptionGroupInclude> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupInclude>;
export const OptionGroupIncludeObjectZodSchema = makeSchema();
