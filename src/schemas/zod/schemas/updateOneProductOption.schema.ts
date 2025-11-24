import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionSelectObjectSchema as ProductOptionSelectObjectSchema } from './objects/ProductOptionSelect.schema';
import { ProductOptionIncludeObjectSchema as ProductOptionIncludeObjectSchema } from './objects/ProductOptionInclude.schema';
import { ProductOptionUpdateInputObjectSchema as ProductOptionUpdateInputObjectSchema } from './objects/ProductOptionUpdateInput.schema';
import { ProductOptionUncheckedUpdateInputObjectSchema as ProductOptionUncheckedUpdateInputObjectSchema } from './objects/ProductOptionUncheckedUpdateInput.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './objects/ProductOptionWhereUniqueInput.schema';

export const ProductOptionUpdateOneSchema: z.ZodType<Prisma.ProductOptionUpdateArgs> = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), data: z.union([ProductOptionUpdateInputObjectSchema, ProductOptionUncheckedUpdateInputObjectSchema]), where: ProductOptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductOptionUpdateArgs>;

export const ProductOptionUpdateOneZodSchema = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), data: z.union([ProductOptionUpdateInputObjectSchema, ProductOptionUncheckedUpdateInputObjectSchema]), where: ProductOptionWhereUniqueInputObjectSchema }).strict();