import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { StoreConfigOrderByWithRelationInputObjectSchema as StoreConfigOrderByWithRelationInputObjectSchema } from './objects/StoreConfigOrderByWithRelationInput.schema';
import { StoreConfigWhereInputObjectSchema as StoreConfigWhereInputObjectSchema } from './objects/StoreConfigWhereInput.schema';
import { StoreConfigWhereUniqueInputObjectSchema as StoreConfigWhereUniqueInputObjectSchema } from './objects/StoreConfigWhereUniqueInput.schema';
import { StoreConfigCountAggregateInputObjectSchema as StoreConfigCountAggregateInputObjectSchema } from './objects/StoreConfigCountAggregateInput.schema';

export const StoreConfigCountSchema: z.ZodType<Prisma.StoreConfigCountArgs> = z.object({ orderBy: z.union([StoreConfigOrderByWithRelationInputObjectSchema, StoreConfigOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreConfigWhereInputObjectSchema.optional(), cursor: StoreConfigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StoreConfigCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.StoreConfigCountArgs>;

export const StoreConfigCountZodSchema = z.object({ orderBy: z.union([StoreConfigOrderByWithRelationInputObjectSchema, StoreConfigOrderByWithRelationInputObjectSchema.array()]).optional(), where: StoreConfigWhereInputObjectSchema.optional(), cursor: StoreConfigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), StoreConfigCountAggregateInputObjectSchema ]).optional() }).strict();