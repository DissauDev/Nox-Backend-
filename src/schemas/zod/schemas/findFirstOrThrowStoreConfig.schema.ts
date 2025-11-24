import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigOrderByWithRelationInputObjectSchema as StoreConfigOrderByWithRelationInputObjectSchema } from './objects/StoreConfigOrderByWithRelationInput.schema';
import { StoreConfigWhereInputObjectSchema as StoreConfigWhereInputObjectSchema } from './objects/StoreConfigWhereInput.schema';
import { StoreConfigWhereUniqueInputObjectSchema as StoreConfigWhereUniqueInputObjectSchema } from './objects/StoreConfigWhereUniqueInput.schema';
import { StoreConfigScalarFieldEnumSchema } from './enums/StoreConfigScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const StoreConfigFindFirstOrThrowSelectSchema: z.ZodType<Prisma.StoreConfigSelect> = z.object({
    id: z.boolean().optional(),
    taxEnabled: z.boolean().optional(),
    taxPercent: z.boolean().optional(),
    taxFixed: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    taxLabel: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.StoreConfigSelect>;

export const StoreConfigFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    taxEnabled: z.boolean().optional(),
    taxPercent: z.boolean().optional(),
    taxFixed: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    taxLabel: z.boolean().optional()
  }).strict();

export const StoreConfigFindFirstOrThrowSchema: z.ZodType<Prisma.StoreConfigFindFirstOrThrowArgs> = z.object({ select: StoreConfigFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([StoreConfigOrderByWithRelationInputObjectSchema, StoreConfigOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreConfigWhereInputObjectSchema.optional(), cursor: StoreConfigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StoreConfigScalarFieldEnumSchema, StoreConfigScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.StoreConfigFindFirstOrThrowArgs>;

export const StoreConfigFindFirstOrThrowZodSchema = z.object({ select: StoreConfigFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([StoreConfigOrderByWithRelationInputObjectSchema, StoreConfigOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreConfigWhereInputObjectSchema.optional(), cursor: StoreConfigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([StoreConfigScalarFieldEnumSchema, StoreConfigScalarFieldEnumSchema.array()]).optional() }).strict();