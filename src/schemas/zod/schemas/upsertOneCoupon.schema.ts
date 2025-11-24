import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CouponSelectObjectSchema as CouponSelectObjectSchema } from './objects/CouponSelect.schema';
import { CouponIncludeObjectSchema as CouponIncludeObjectSchema } from './objects/CouponInclude.schema';
import { CouponWhereUniqueInputObjectSchema as CouponWhereUniqueInputObjectSchema } from './objects/CouponWhereUniqueInput.schema';
import { CouponCreateInputObjectSchema as CouponCreateInputObjectSchema } from './objects/CouponCreateInput.schema';
import { CouponUncheckedCreateInputObjectSchema as CouponUncheckedCreateInputObjectSchema } from './objects/CouponUncheckedCreateInput.schema';
import { CouponUpdateInputObjectSchema as CouponUpdateInputObjectSchema } from './objects/CouponUpdateInput.schema';
import { CouponUncheckedUpdateInputObjectSchema as CouponUncheckedUpdateInputObjectSchema } from './objects/CouponUncheckedUpdateInput.schema';

export const CouponUpsertOneSchema: z.ZodType<Prisma.CouponUpsertArgs> = z.object({ select: CouponSelectObjectSchema.optional(), include: CouponIncludeObjectSchema.optional(), where: CouponWhereUniqueInputObjectSchema, create: z.union([ CouponCreateInputObjectSchema, CouponUncheckedCreateInputObjectSchema ]), update: z.union([ CouponUpdateInputObjectSchema, CouponUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CouponUpsertArgs>;

export const CouponUpsertOneZodSchema = z.object({ select: CouponSelectObjectSchema.optional(), include: CouponIncludeObjectSchema.optional(), where: CouponWhereUniqueInputObjectSchema, create: z.union([ CouponCreateInputObjectSchema, CouponUncheckedCreateInputObjectSchema ]), update: z.union([ CouponUpdateInputObjectSchema, CouponUncheckedUpdateInputObjectSchema ]) }).strict();