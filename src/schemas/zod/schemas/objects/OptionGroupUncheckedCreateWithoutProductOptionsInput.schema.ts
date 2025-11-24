import * as z from 'zod';
import type { Prisma } from '@prisma/client';
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
  OptionValue: z.lazy(() => OptionValueUncheckedCreateNestedManyWithoutGroupInputObjectSchema).optional()
}).strict();
export const OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema: z.ZodType<Prisma.OptionGroupUncheckedCreateWithoutProductOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUncheckedCreateWithoutProductOptionsInput>;
export const OptionGroupUncheckedCreateWithoutProductOptionsInputObjectZodSchema = makeSchema();
