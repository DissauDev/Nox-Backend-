import * as z from 'zod';
export const StoreConfigCreateResultSchema = z.object({
  id: z.number().int(),
  taxEnabled: z.boolean(),
  taxPercent: z.number(),
  taxFixed: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  taxLabel: z.string()
});