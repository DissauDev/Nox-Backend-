import * as z from 'zod';
export const OptionGroupGroupByResultSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  required: z.boolean(),
  minSelectable: z.number().int(),
  maxSelectable: z.number().int(),
  isAvailable: z.boolean(),
  showImages: z.boolean(),
  selectionTitle: z.string(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    required: z.number(),
    minSelectable: z.number(),
    maxSelectable: z.number(),
    productOptions: z.number(),
    isAvailable: z.number(),
    OptionValue: z.number(),
    showImages: z.number(),
    selectionTitle: z.number()
  }).optional(),
  _sum: z.object({
    minSelectable: z.number().nullable(),
    maxSelectable: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    minSelectable: z.number().nullable(),
    maxSelectable: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    minSelectable: z.number().int().nullable(),
    maxSelectable: z.number().int().nullable(),
    selectionTitle: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    minSelectable: z.number().int().nullable(),
    maxSelectable: z.number().int().nullable(),
    selectionTitle: z.string().nullable()
  }).nullable().optional()
}));