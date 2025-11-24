import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionValueSelectObjectSchema as ProductOptionValueSelectObjectSchema } from './objects/ProductOptionValueSelect.schema';
import { ProductOptionValueUpdateManyMutationInputObjectSchema as ProductOptionValueUpdateManyMutationInputObjectSchema } from './objects/ProductOptionValueUpdateManyMutationInput.schema';
import { ProductOptionValueWhereInputObjectSchema as ProductOptionValueWhereInputObjectSchema } from './objects/ProductOptionValueWhereInput.schema';

export const ProductOptionValueUpdateManyAndReturnSchema: z.ZodType<Prisma.ProductOptionValueUpdateManyAndReturnArgs> = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), data: ProductOptionValueUpdateManyMutationInputObjectSchema, where: ProductOptionValueWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateManyAndReturnArgs>;

export const ProductOptionValueUpdateManyAndReturnZodSchema = z.object({ select: ProductOptionValueSelectObjectSchema.optional(), data: ProductOptionValueUpdateManyMutationInputObjectSchema, where: ProductOptionValueWhereInputObjectSchema.optional() }).strict();