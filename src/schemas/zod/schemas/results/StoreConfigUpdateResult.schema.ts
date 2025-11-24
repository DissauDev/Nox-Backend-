import * as z from 'zod';
export const StoreConfigUpdateResultSchema = z.nullable(z.object({
  id: z.number().int(),
  taxEnabled: z.boolean(),
  taxPercent: z.number(),
  taxFixed: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  taxLabel: z.string()
}));