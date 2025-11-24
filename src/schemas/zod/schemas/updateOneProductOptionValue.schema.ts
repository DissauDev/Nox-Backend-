import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueSelectObjectSchema as ProductOptionValueSelectObjectSchema } from './objects/ProductOptionValueSelect.schema';
import { ProductOptionValueIncludeObjectSchema as ProductOptionValueIncludeObjectSchema } from './objects/ProductOptionValueInclude.schema';
import { ProductOptionValueUpdateInputObjectSchema as ProductOptionValueUpdateInputObjectSchema } from './objects/ProductOptionValueUpdateInput.schema';
import { ProductOptionValueUncheckedUpdateInputObjectSchema as ProductOptionValueUncheckedUpdateInputObjectSchema } from './objects/ProductOptionValueUncheckedUpdateInput.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './objects/ProductOptionValueWhereUniqueInput.schema';

export const ProductOptionValueUpdateOneSchema: z.ZodType<Prisma.ProductOptionValueUpdateArgs> = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), data: z.union([ProductOptionValueUpdateInputObjectSchema, ProductOptionValueUncheckedUpdateInputObjectSchema]), where: ProductOptionValueWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateArgs>;

export const ProductOptionValueUpdateOneZodSchema = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), data: z.union([ProductOptionValueUpdateInputObjectSchema, ProductOptionValueUncheckedUpdateInputObjectSchema]), where: ProductOptionValueWhereUniqueInputObjectSchema }).strict();