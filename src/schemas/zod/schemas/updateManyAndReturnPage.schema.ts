import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './objects/PageSelect.schema';
import { PageUpdateManyMutationInputObjectSchema as PageUpdateManyMutationInputObjectSchema } from './objects/PageUpdateManyMutationInput.schema';
import { PageWhereInputObjectSchema as PageWhereInputObjectSchema } from './objects/PageWhereInput.schema';

export const PageUpdateManyAndReturnSchema: z.ZodType<Prisma.PageUpdateManyAndReturnArgs> = z.object({ select: PageSelectObjectSchema.optional(), data: PageUpdateManyMutationInputObjectSchema, where: PageWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PageUpdateManyAndReturnArgs>;

export const PageUpdateManyAndReturnZodSchema = z.object({ select: PageSelectObjectSchema.optional(), data: PageUpdateManyMutationInputObjectSchema, where: PageWhereInputObjectSchema.optional() }).strict();