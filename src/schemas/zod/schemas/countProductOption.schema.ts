import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductOptionOrderByWithRelationInputObjectSchema as ProductOptionOrderByWithRelationInputObjectSchema } from './objects/ProductOptionOrderByWithRelationInput.schema';
import { ProductOptionWhereInputObjectSchema as ProductOptionWhereInputObjectSchema } from './objects/ProductOptionWhereInput.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './objects/ProductOptionWhereUniqueInput.schema';
import { ProductOptionCountAggregateInputObjectSchema as ProductOptionCountAggregateInputObjectSchema } from './objects/ProductOptionCountAggregateInput.schema';

export const ProductOptionCountSchema: z.ZodType<Prisma.ProductOptionCountArgs> = z.object({ orderBy: z.union([ProductOptionOrderByWithRelationInputObjectSchema, ProductOptionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductOptionWhereInputObjectSchema.optional(), cursor: ProductOptionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProductOptionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductOptionCountArgs>;

export const ProductOptionCountZodSchema = z.object({ orderBy: z.union([ProductOptionOrderByWithRelationInputObjectSchema, ProductOptionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductOptionWhereInputObjectSchema.optional(), cursor: ProductOptionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ProductOptionCountAggregateInputObjectSchema ]).optional() }).strict();