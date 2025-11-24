import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionUncheckedCreateNestedManyWithoutGroupInputObjectSchema as ProductOptionUncheckedCreateNestedManyWithoutGroupInputObjectSchema } from './ProductOptionUncheckedCreateNestedManyWithoutGroupInput.schema';
import { OptionValueUncheckedCreateNestedManyWithoutGroupInputObjectSchema as OptionValueUncheckedCreateNestedManyWithoutGroupInputObjectSchema } from './OptionValueUncheckedCreateNestedManyWithoutGroupInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  required: z.boolean().optional(),
  minSelectable: z.number().int().optional(),
  maxSelectable: z.number().int().optional(),
  isAvailable: z.boolean().optional(),
  showImages: z.boolean().optional(),
  selectionTitle: z.string().optional().nullable(),
  productOptions: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutGroupInputObjectSchema),
  OptionValue: z.lazy(() => OptionValueUncheckedCreateNestedManyWithoutGroupInputObjectSchema)
}).strict();
export const OptionGroupUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OptionGroupUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUncheckedCreateInput>;
export const OptionGroupUncheckedCreateInputObjectZodSchema = makeSchema();
