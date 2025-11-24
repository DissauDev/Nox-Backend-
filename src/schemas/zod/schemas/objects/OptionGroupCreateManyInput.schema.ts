import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  required: z.boolean().optional(),
  minSelectable: z.number().int().optional(),
  maxSelectable: z.number().int().optional(),
  isAvailable: z.boolean().optional(),
  showImages: z.boolean().optional(),
  selectionTitle: z.string().optional().nullable()
}).strict();
export const OptionGroupCreateManyInputObjectSchema: z.ZodType<Prisma.OptionGroupCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCreateManyInput>;
export const OptionGroupCreateManyInputObjectZodSchema = makeSchema();
