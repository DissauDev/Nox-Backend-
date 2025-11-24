import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './objects/PageSelect.schema';
import { PageWhereUniqueInputObjectSchema as PageWhereUniqueInputObjectSchema } from './objects/PageWhereUniqueInput.schema';
import { PageCreateInputObjectSchema as PageCreateInputObjectSchema } from './objects/PageCreateInput.schema';
import { PageUncheckedCreateInputObjectSchema as PageUncheckedCreateInputObjectSchema } from './objects/PageUncheckedCreateInput.schema';
import { PageUpdateInputObjectSchema as PageUpdateInputObjectSchema } from './objects/PageUpdateInput.schema';
import { PageUncheckedUpdateInputObjectSchema as PageUncheckedUpdateInputObjectSchema } from './objects/PageUncheckedUpdateInput.schema';

export const PageUpsertOneSchema: z.ZodType<Prisma.PageUpsertArgs> = z.object({ select: PageSelectObjectSchema.optional(),  where: PageWhereUniqueInputObjectSchema, create: z.union([ PageCreateInputObjectSchema, PageUncheckedCreateInputObjectSchema ]), update: z.union([ PageUpdateInputObjectSchema, PageUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.PageUpsertArgs>;

export const PageUpsertOneZodSchema = z.object({ select: PageSelectObjectSchema.optional(),  where: PageWhereUniqueInputObjectSchema, create: z.union([ PageCreateInputObjectSchema, PageUncheckedCreateInputObjectSchema ]), update: z.union([ PageUpdateInputObjectSchema, PageUncheckedUpdateInputObjectSchema ]) }).strict();