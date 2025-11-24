import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OptionValueOrderByWithRelationInputObjectSchema as OptionValueOrderByWithRelationInputObjectSchema } from './objects/OptionValueOrderByWithRelationInput.schema';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './objects/OptionValueWhereInput.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './objects/OptionValueWhereUniqueInput.schema';
import { OptionValueCountAggregateInputObjectSchema as OptionValueCountAggregateInputObjectSchema } from './objects/OptionValueCountAggregateInput.schema';

export const OptionValueCountSchema: z.ZodType<Prisma.OptionValueCountArgs> = z.object({ orderBy: z.union([OptionValueOrderByWithRelationInputObjectSchema, OptionValueOrderByWithRelationInputObjectSchema.array()]).optional(), where: OptionValueWhereInputObjectSchema.optional(), cursor: OptionValueWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OptionValueCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.OptionValueCountArgs>;

export const OptionValueCountZodSchema = z.object({ orderBy: z.union([OptionValueOrderByWithRelationInputObjectSchema, OptionValueOrderByWithRelationInputObjectSchema.array()]).optional(), where: OptionValueWhereInputObjectSchema.optional(), cursor: OptionValueWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OptionValueCountAggregateInputObjectSchema ]).optional() }).strict();