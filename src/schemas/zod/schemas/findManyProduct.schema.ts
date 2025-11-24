import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductIncludeObjectSchema as ProductIncludeObjectSchema } from './objects/ProductInclude.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './objects/ProductOrderByWithRelationInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './objects/ProductWhereInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';
import { ProductScalarFieldEnumSchema } from './enums/ProductScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductFindManySelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    price: z.boolean().optional(),
    salePrice: z.boolean().optional(),
    specifications: z.boolean().optional(),
    description: z.boolean().optional(),
    imageLeft: z.boolean().optional(),
    imageRight: z.boolean().optional(),
    type: z.boolean().optional(),
    status: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    category: z.boolean().optional(),
    options: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    OrderItem: z.boolean().optional(),
    sortOrder: z.boolean().optional(),
    OptionValue: z.boolean().optional(),
    isOptionItem: z.boolean().optional(),
    packOptionSurcharge: z.boolean().optional(),
    packMaxItems: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProductSelect>;

export const ProductFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    price: z.boolean().optional(),
    salePrice: z.boolean().optional(),
    specifications: z.boolean().optional(),
    description: z.boolean().optional(),
    imageLeft: z.boolean().optional(),
    imageRight: z.boolean().optional(),
    type: z.boolean().optional(),
    status: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    category: z.boolean().optional(),
    options: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    OrderItem: z.boolean().optional(),
    sortOrder: z.boolean().optional(),
    OptionValue: z.boolean().optional(),
    isOptionItem: z.boolean().optional(),
    packOptionSurcharge: z.boolean().optional(),
    packMaxItems: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ProductFindManySchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({ select: ProductFindManySelectSchema.optional(), include: z.lazy(() => ProductIncludeObjectSchema.optional()), orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductFindManyArgs>;

export const ProductFindManyZodSchema = z.object({ select: ProductFindManySelectSchema.optional(), include: z.lazy(() => ProductIncludeObjectSchema.optional()), orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional() }).strict();