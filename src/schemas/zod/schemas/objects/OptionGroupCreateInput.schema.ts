import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateNestedManyWithoutGroupInputObjectSchema as ProductOptionCreateNestedManyWithoutGroupInputObjectSchema } from './ProductOptionCreateNestedManyWithoutGroupInput.schema';
import { OptionValueCreateNestedManyWithoutGroupInputObjectSchema as OptionValueCreateNestedManyWithoutGroupInputObjectSchema } from './OptionValueCreateNestedManyWithoutGroupInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  required: z.boolean().optional(),
  minSelectable: z.number().int().optional(),
  maxSelectable: z.number().int().optional(),
  isAvailable: z.boolean().optional(),
  showImages: z.boolean().optional(),
  selectionTitle: z.string().optional().nullable(),
  productOptions: z.lazy(() => ProductOptionCreateNestedManyWithoutGroupInputObjectSchema),
  OptionValue: z.lazy(() => OptionValueCreateNestedManyWithoutGroupInputObjectSchema)
}).strict();
export const OptionGroupCreateInputObjectSchema: z.ZodType<Prisma.OptionGroupCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCreateInput>;
export const OptionGroupCreateInputObjectZodSchema = makeSchema();
