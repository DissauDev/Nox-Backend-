import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionSelectObjectSchema as ProductOptionSelectObjectSchema } from './objects/ProductOptionSelect.schema';
import { ProductOptionIncludeObjectSchema as ProductOptionIncludeObjectSchema } from './objects/ProductOptionInclude.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './objects/ProductOptionWhereUniqueInput.schema';

export const ProductOptionDeleteOneSchema: z.ZodType<Prisma.ProductOptionDeleteArgs> = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), where: ProductOptionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductOptionDeleteArgs>;

export const ProductOptionDeleteOneZodSchema = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), where: ProductOptionWhereUniqueInputObjectSchema }).strict();