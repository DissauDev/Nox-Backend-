import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageUpdateManyMutationInputObjectSchema as PageUpdateManyMutationInputObjectSchema } from './objects/PageUpdateManyMutationInput.schema';
import { PageWhereInputObjectSchema as PageWhereInputObjectSchema } from './objects/PageWhereInput.schema';

export const PageUpdateManySchema: z.ZodType<Prisma.PageUpdateManyArgs> = z.object({ data: PageUpdateManyMutationInputObjectSchema, where: PageWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PageUpdateManyArgs>;

export const PageUpdateManyZodSchema = z.object({ data: PageUpdateManyMutationInputObjectSchema, where: PageWhereInputObjectSchema.optional() }).strict();