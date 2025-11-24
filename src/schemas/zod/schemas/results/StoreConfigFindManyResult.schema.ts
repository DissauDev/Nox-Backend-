import * as z from 'zod';
export const StoreConfigFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  taxEnabled: z.boolean(),
  taxPercent: z.number(),
  taxFixed: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  taxLabel: z.string()
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