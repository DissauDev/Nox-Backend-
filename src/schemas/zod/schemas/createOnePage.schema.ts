import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PageSelectObjectSchema as PageSelectObjectSchema } from './objects/PageSelect.schema';
import { PageCreateInputObjectSchema as PageCreateInputObjectSchema } from './objects/PageCreateInput.schema';
import { PageUncheckedCreateInputObjectSchema as PageUncheckedCreateInputObjectSchema } from './objects/PageUncheckedCreateInput.schema';

export const PageCreateOneSchema: z.ZodType<Prisma.PageCreateArgs> = z.object({ select: PageSelectObjectSchema.optional(),  data: z.union([PageCreateInputObjectSchema, PageUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.PageCreateArgs>;

export const PageCreateOneZodSchema = z.object({ select: PageSelectObjectSchema.optional(),  data: z.union([PageCreateInputObjectSchema, PageUncheckedCreateInputObjectSchema]) }).strict();