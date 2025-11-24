import * as z from 'zod';
export const OptionGroupFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  required: z.boolean(),
  minSelectable: z.number().int(),
  maxSelectable: z.number().int(),
  productOptions: z.array(z.unknown()),
  isAvailable: z.boolean(),
  OptionValue: z.array(z.unknown()),
  showImages: z.boolean(),
  selectionTitle: z.string().optional()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});