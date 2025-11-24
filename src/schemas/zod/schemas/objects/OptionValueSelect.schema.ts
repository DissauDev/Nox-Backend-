import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupArgsObjectSchema as OptionGroupArgsObjectSchema } from './OptionGroupArgs.schema';
import { ProductOptionValueFindManySchema as ProductOptionValueFindManySchema } from '../findManyProductOptionValue.schema';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { OptionValueCountOutputTypeArgsObjectSchema as OptionValueCountOutputTypeArgsObjectSchema } from './OptionValueCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  group: z.union([z.boolean(), z.lazy(() => OptionGroupArgsObjectSchema)]).optional(),
  groupId: z.boolean().optional(),
  name: z.boolean().optional(),
  extraPrice: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  description: z.boolean().optional(),
  ProductOptionValue: z.union([z.boolean(), z.lazy(() => ProductOptionValueFindManySchema)]).optional(),
  isAvailable: z.boolean().optional(),
  productRef: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  productRefId: z.boolean().optional(),
  sortOrder: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => OptionValueCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OptionValueSelectObjectSchema: z.ZodType<Prisma.OptionValueSelect> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueSelect>;
export const OptionValueSelectObjectZodSchema = makeSchema();
