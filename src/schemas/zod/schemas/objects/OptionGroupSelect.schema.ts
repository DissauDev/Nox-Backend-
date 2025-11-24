import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionFindManySchema as ProductOptionFindManySchema } from '../findManyProductOption.schema';
import { OptionValueFindManySchema as OptionValueFindManySchema } from '../findManyOptionValue.schema';
import { OptionGroupCountOutputTypeArgsObjectSchema as OptionGroupCountOutputTypeArgsObjectSchema } from './OptionGroupCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  required: z.boolean().optional(),
  minSelectable: z.boolean().optional(),
  maxSelectable: z.boolean().optional(),
  productOptions: z.union([z.boolean(), z.lazy(() => ProductOptionFindManySchema)]).optional(),
  isAvailable: z.boolean().optional(),
  OptionValue: z.union([z.boolean(), z.lazy(() => OptionValueFindManySchema)]).optional(),
  showImages: z.boolean().optional(),
  selectionTitle: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => OptionGroupCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OptionGroupSelectObjectSchema: z.ZodType<Prisma.OptionGroupSelect> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupSelect>;
export const OptionGroupSelectObjectZodSchema = makeSchema();
