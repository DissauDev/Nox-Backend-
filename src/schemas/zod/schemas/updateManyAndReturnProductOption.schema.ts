import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionSelectObjectSchema as ProductOptionSelectObjectSchema } from './objects/ProductOptionSelect.schema';
import { ProductOptionUpdateManyMutationInputObjectSchema as ProductOptionUpdateManyMutationInputObjectSchema } from './objects/ProductOptionUpdateManyMutationInput.schema';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './objects/ProductOptionWhereInput.schema';

export const ProductOptionUpdateManyAndReturnSchema: z.ZodType<Prisma.ProductOptionUpdateManyAndReturnArgs> = z.object({ select: ProductOptionSelectObjectSchema.optional(), data: ProductOptionUpdateManyMutationInputObjectSchema, where: ProductOptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionUpdateManyAndReturnArgs>;

export const ProductOptionUpdateManyAndReturnZodSchema = z.object({ select: ProductOptionSelectObjectSchema.optional(), data: ProductOptionUpdateManyMutationInputObjectSchema, where: ProductOptionWhereInputObjectSchema.optional() }).strict();