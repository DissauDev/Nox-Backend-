import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionSelectObjectSchema as ProductOptionSelectObjectSchema } from './objects/ProductOptionSelect.schema';
import { ProductOptionIncludeObjectSchema as ProductOptionIncludeObjectSchema } from './objects/ProductOptionInclude.schema';
import { ProductOptionCreateInputObjectSchema as ProductOptionCreateInputObjectSchema } from './objects/ProductOptionCreateInput.schema';
import { ProductOptionUncheckedCreateInputObjectSchema as ProductOptionUncheckedCreateInputObjectSchema } from './objects/ProductOptionUncheckedCreateInput.schema';

export const ProductOptionCreateOneSchema: z.ZodType<Prisma.ProductOptionCreateArgs> = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), data: z.union([ProductOptionCreateInputObjectSchema, ProductOptionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProductOptionCreateArgs>;

export const ProductOptionCreateOneZodSchema = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), data: z.union([ProductOptionCreateInputObjectSchema, ProductOptionUncheckedCreateInputObjectSchema]) }).strict();