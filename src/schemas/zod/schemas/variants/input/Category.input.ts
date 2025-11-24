import * as z from 'zod';
import { ProductStatusSchema } from '../../enums/ProductStatus.schema';
// prettier-ignore
export const CategoryInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    status: ProductStatusSchema,
    onCarousel: z.boolean(),
    imageUrl: z.string(),
    shortDescription: z.string(),
    longDescription: z.string(),
    createdAt: z.date(),
    products: z.array(z.unknown()),
    sortOrder: z.number().int()
}).strict();

export type CategoryInputType = z.infer<typeof CategoryInputSchema>;
