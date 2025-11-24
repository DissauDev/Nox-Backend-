import * as z from 'zod';
import { ProductTypeSchema } from '../../enums/ProductType.schema';
import { ProductStatusSchema } from '../../enums/ProductStatus.schema';
// prettier-ignore
export const ProductModelSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    salePrice: z.number().nullable(),
    specifications: z.string().nullable(),
    description: z.string().nullable(),
    imageLeft: z.unknown().nullable(),
    imageRight: z.unknown().nullable(),
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
    packMaxItems: z.number().int().nullable()
}).strict();

export type ProductPureType = z.infer<typeof ProductModelSchema>;
