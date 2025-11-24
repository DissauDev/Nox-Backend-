import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionSelectObjectSchema as ProductOptionSelectObjectSchema } from './objects/ProductOptionSelect.schema';
import { ProductOptionIncludeObjectSchema as ProductOptionIncludeObjectSchema } from './objects/ProductOptionInclude.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './objects/ProductOptionWhereUniqueInput.schema';
import { ProductOptionCreateInputObjectSchema as ProductOptionCreateInputObjectSchema } from './objects/ProductOptionCreateInput.schema';
import { ProductOptionUncheckedCreateInputObjectSchema as ProductOptionUncheckedCreateInputObjectSchema } from './objects/ProductOptionUncheckedCreateInput.schema';
import { ProductOptionUpdateInputObjectSchema as ProductOptionUpdateInputObjectSchema } from './objects/ProductOptionUpdateInput.schema';
import { ProductOptionUncheckedUpdateInputObjectSchema as ProductOptionUncheckedUpdateInputObjectSchema } from './objects/ProductOptionUncheckedUpdateInput.schema';

export const ProductOptionUpsertOneSchema: z.ZodType<Prisma.ProductOptionUpsertArgs> = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), where: ProductOptionWhereUniqueInputObjectSchema, create: z.union([ ProductOptionCreateInputObjectSchema, ProductOptionUncheckedCreateInputObjectSchema ]), update: z.union([ ProductOptionUpdateInputObjectSchema, ProductOptionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ProductOptionUpsertArgs>;

export const ProductOptionUpsertOneZodSchema = z.object({ select: ProductOptionSelectObjectSchema.optional(), include: ProductOptionIncludeObjectSchema.optional(), where: ProductOptionWhereUniqueInputObjectSchema, create: z.union([ ProductOptionCreateInputObjectSchema, ProductOptionUncheckedCreateInputObjectSchema ]), update: z.union([ ProductOptionUpdateInputObjectSchema, ProductOptionUncheckedUpdateInputObjectSchema ]) }).strict();