import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueSelectObjectSchema as ProductOptionValueSelectObjectSchema } from './objects/ProductOptionValueSelect.schema';
import { ProductOptionValueIncludeObjectSchema as ProductOptionValueIncludeObjectSchema } from './objects/ProductOptionValueInclude.schema';
import { ProductOptionValueWhereUniqueInputObjectSchema as ProductOptionValueWhereUniqueInputObjectSchema } from './objects/ProductOptionValueWhereUniqueInput.schema';
import { ProductOptionValueCreateInputObjectSchema as ProductOptionValueCreateInputObjectSchema } from './objects/ProductOptionValueCreateInput.schema';
import { ProductOptionValueUncheckedCreateInputObjectSchema as ProductOptionValueUncheckedCreateInputObjectSchema } from './objects/ProductOptionValueUncheckedCreateInput.schema';
import { ProductOptionValueUpdateInputObjectSchema as ProductOptionValueUpdateInputObjectSchema } from './objects/ProductOptionValueUpdateInput.schema';
import { ProductOptionValueUncheckedUpdateInputObjectSchema as ProductOptionValueUncheckedUpdateInputObjectSchema } from './objects/ProductOptionValueUncheckedUpdateInput.schema';

export const ProductOptionValueUpsertOneSchema: z.ZodType<Prisma.ProductOptionValueUpsertArgs> = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), where: ProductOptionValueWhereUniqueInputObjectSchema, create: z.union([ ProductOptionValueCreateInputObjectSchema, ProductOptionValueUncheckedCreateInputObjectSchema ]), update: z.union([ ProductOptionValueUpdateInputObjectSchema, ProductOptionValueUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueUpsertArgs>;

export const ProductOptionValueUpsertOneZodSchema = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), include: ProductOptionValueIncludeObjectSchema.optional(), where: ProductOptionValueWhereUniqueInputObjectSchema, create: z.union([ ProductOptionValueCreateInputObjectSchema, ProductOptionValueUncheckedCreateInputObjectSchema ]), update: z.union([ ProductOptionValueUpdateInputObjectSchema, ProductOptionValueUncheckedUpdateInputObjectSchema ]) }).strict();