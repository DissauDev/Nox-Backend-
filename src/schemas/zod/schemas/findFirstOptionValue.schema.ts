import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueIncludeObjectSchema as OptionValueIncludeObjectSchema } from './objects/OptionValueInclude.schema';
import { OptionValueOrderByWithRelationInputObjectSchema as OptionValueOrderByWithRelationInputObjectSchema } from './objects/OptionValueOrderByWithRelationInput.schema';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './objects/OptionValueWhereInput.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './objects/OptionValueWhereUniqueInput.schema';
import { OptionValueScalarFieldEnumSchema } from './enums/OptionValueScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OptionValueFindFirstSelectSchema: z.ZodType<Prisma.OptionValueSelect> = z.object({
    id: z.boolean().optional(),
    group: z.boolean().optional(),
    groupId: z.boolean().optional(),
    name: z.boolean().optional(),
    extraPrice: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    description: z.boolean().optional(),
    ProductOptionValue: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    productRef: z.boolean().optional(),
    productRefId: z.boolean().optional(),
    sortOrder: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OptionValueSelect>;

export const OptionValueFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    group: z.boolean().optional(),
    groupId: z.boolean().optional(),
    name: z.boolean().optional(),
    extraPrice: z.boolean().optional(),
    imageUrl: z.boolean().optional(),
    description: z.boolean().optional(),
    ProductOptionValue: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    productRef: z.boolean().optional(),
    productRefId: z.boolean().optional(),
    sortOrder: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const OptionValueFindFirstSchema: z.ZodType<Prisma.OptionValueFindFirstArgs> = z.object({ select: OptionValueFindFirstSelectSchema.optional(), include: z.lazy(() => OptionValueIncludeObjectSchema.optional()), orderBy: z.union([OptionValueOrderByWithRelationInputObjectSchema, OptionValueOrderByWithRelationInputObjectSchema.array()]).optional(), where: OptionValueWhereInputObjectSchema.optional(), cursor: OptionValueWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OptionValueScalarFieldEnumSchema, OptionValueScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OptionValueFindFirstArgs>;

export const OptionValueFindFirstZodSchema = z.object({ select: OptionValueFindFirstSelectSchema.optional(), include: z.lazy(() => OptionValueIncludeObjectSchema.optional()), orderBy: z.union([OptionValueOrderByWithRelationInputObjectSchema, OptionValueOrderByWithRelationInputObjectSchema.array()]).optional(), where: OptionValueWhereInputObjectSchema.optional(), cursor: OptionValueWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OptionValueScalarFieldEnumSchema, OptionValueScalarFieldEnumSchema.array()]).optional() }).strict();