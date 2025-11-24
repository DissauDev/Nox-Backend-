import * as z from 'zod';
import { ProductTypeSchema } from '../../enums/ProductType.schema';
import { ProductStatusSchema } from '../../enums/ProductStatus.schema';
// prettier-ignore
export const ProductInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    salePrice: z.number().optional().nullable(),
    specifications: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    imageLeft: z.unknown().optional().nullable(),
    imageRight: z.unknown().optional().nullable(),
    type: ProductTypeSchema,
    status: ProductStatusSchema,
    categoryId: z.string(),
    category: z.unknown(),
    options: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
    OrderItem: z.array(z.unknown()),
    sortOrder: z.number().int(),
    OptionValue: z.array(z.unknown()),
    isOptionItem: z.boolean(),
    packOptionSurcharge: z.number(),
    packMaxItems: z.number().int().optional().nullable()
}).strict();

export type ProductInputType = z.infer<typeof ProductInputSchema>;
