import * as z from 'zod';
import type { Prisma } from '@prisma/client';
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
  OptionValue: z.lazy(() => OptionValueCreateNestedManyWithoutGroupInputObjectSchema).optional()
}).strict();
export const OptionGroupCreateWithoutProductOptionsInputObjectSchema: z.ZodType<Prisma.OptionGroupCreateWithoutProductOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCreateWithoutProductOptionsInput>;
export const OptionGroupCreateWithoutProductOptionsInputObjectZodSchema = makeSchema();
