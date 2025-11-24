import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionUpdateManyMutationInputObjectSchema as ProductOptionUpdateManyMutationInputObjectSchema } from './objects/ProductOptionUpdateManyMutationInput.schema';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './objects/ProductOptionWhereInput.schema';

export const ProductOptionUpdateManySchema: z.ZodType<Prisma.ProductOptionUpdateManyArgs> = z.object({ data: ProductOptionUpdateManyMutationInputObjectSchema, where: ProductOptionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionUpdateManyArgs>;

export const ProductOptionUpdateManyZodSchema = z.object({ data: ProductOptionUpdateManyMutationInputObjectSchema, where: ProductOptionWhereInputObjectSchema.optional() }).strict();