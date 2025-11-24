import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './objects/PageSelect.schema';
import { PageUpdateInputObjectSchema as PageUpdateInputObjectSchema } from './objects/PageUpdateInput.schema';
import { PageUncheckedUpdateInputObjectSchema as PageUncheckedUpdateInputObjectSchema } from './objects/PageUncheckedUpdateInput.schema';
import { PageWhereUniqueInputObjectSchema as PageWhereUniqueInputObjectSchema } from './objects/PageWhereUniqueInput.schema';

export const PageUpdateOneSchema: z.ZodType<Prisma.PageUpdateArgs> = z.object({ select: PageSelectObjectSchema.optional(),  data: z.union([PageUpdateInputObjectSchema, PageUncheckedUpdateInputObjectSchema]), where: PageWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PageUpdateArgs>;

export const PageUpdateOneZodSchema = z.object({ select: PageSelectObjectSchema.optional(),  data: z.union([PageUpdateInputObjectSchema, PageUncheckedUpdateInputObjectSchema]), where: PageWhereUniqueInputObjectSchema }).strict();