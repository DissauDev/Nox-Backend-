import * as z from 'zod';
export const OptionValueUpsertResultSchema = z.object({
  id: z.string(),
  group: z.unknown(),
  groupId: z.string(),
  name: z.string(),
  extraPrice: z.number(),
  imageUrl: z.string().optional(),
  description: z.string(),
  ProductOptionValue: z.array(z.unknown()),
  isAvailable: z.boolean(),
  productRef: z.unknown().optional(),
  productRefId: z.string().optional(),
  sortOrder: z.number().int()
});