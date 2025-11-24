import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionGroupOrderByWithRelationInputObjectSchema as OptionGroupOrderByWithRelationInputObjectSchema } from './objects/OptionGroupOrderByWithRelationInput.schema';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './objects/OptionGroupWhereInput.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './objects/OptionGroupWhereUniqueInput.schema';
import { OptionGroupCountAggregateInputObjectSchema as OptionGroupCountAggregateInputObjectSchema } from './objects/OptionGroupCountAggregateInput.schema';

export const OptionGroupCountSchema: z.ZodType<Prisma.OptionGroupCountArgs> = z.object({ orderBy: z.union([OptionGroupOrderByWithRelationInputObjectSchema, OptionGroupOrderByWithRelationInputObjectSchema.array()]).optional(), where: OptionGroupWhereInputObjectSchema.optional(), cursor: OptionGroupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OptionGroupCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.OptionGroupCountArgs>;

export const OptionGroupCountZodSchema = z.object({ orderBy: z.union([OptionGroupOrderByWithRelationInputObjectSchema, OptionGroupOrderByWithRelationInputObjectSchema.array()]).optional(), where: OptionGroupWhereInputObjectSchema.optional(), cursor: OptionGroupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OptionGroupCountAggregateInputObjectSchema ]).optional() }).strict();