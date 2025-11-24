import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageWhereInputObjectSchema as PageWhereInputObjectSchema } from './objects/PageWhereInput.schema';

export const PageDeleteManySchema: z.ZodType<Prisma.PageDeleteManyArgs> = z.object({ where: PageWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PageDeleteManyArgs>;

export const PageDeleteManyZodSchema = z.object({ where: PageWhereInputObjectSchema.optional() }).strict();