import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupIncludeObjectSchema as OptionGroupIncludeObjectSchema } from './objects/OptionGroupInclude.schema';
import { OptionGroupOrderByWithRelationInputObjectSchema as OptionGroupOrderByWithRelationInputObjectSchema } from './objects/OptionGroupOrderByWithRelationInput.schema';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './objects/OptionGroupWhereInput.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './objects/OptionGroupWhereUniqueInput.schema';
import { OptionGroupScalarFieldEnumSchema } from './enums/OptionGroupScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OptionGroupFindManySelectSchema: z.ZodType<Prisma.OptionGroupSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    required: z.boolean().optional(),
    minSelectable: z.boolean().optional(),
    maxSelectable: z.boolean().optional(),
    productOptions: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    OptionValue: z.boolean().optional(),
    showImages: z.boolean().optional(),
    selectionTitle: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OptionGroupSelect>;

export const OptionGroupFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    required: z.boolean().optional(),
    minSelectable: z.boolean().optional(),
    maxSelectable: z.boolean().optional(),
    productOptions: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    OptionValue: z.boolean().optional(),
    showImages: z.boolean().optional(),
    selectionTitle: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const OptionGroupFindManySchema: z.ZodType<Prisma.OptionGroupFindManyArgs> = z.object({ select: OptionGroupFindManySelectSchema.optional(), include: z.lazy(() => OptionGroupIncludeObjectSchema.optional()), orderBy: z.union([OptionGroupOrderByWithRelationInputObjectSchema, OptionGroupOrderByWithRelationInputObjectSchema.array()]).optional(), where: OptionGroupWhereInputObjectSchema.optional(), cursor: OptionGroupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OptionGroupScalarFieldEnumSchema, OptionGroupScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OptionGroupFindManyArgs>;

export const OptionGroupFindManyZodSchema = z.object({ select: OptionGroupFindManySelectSchema.optional(), include: z.lazy(() => OptionGroupIncludeObjectSchema.optional()), orderBy: z.union([OptionGroupOrderByWithRelationInputObjectSchema, OptionGroupOrderByWithRelationInputObjectSchema.array()]).optional(), where: OptionGroupWhereInputObjectSchema.optional(), cursor: OptionGroupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OptionGroupScalarFieldEnumSchema, OptionGroupScalarFieldEnumSchema.array()]).optional() }).strict();