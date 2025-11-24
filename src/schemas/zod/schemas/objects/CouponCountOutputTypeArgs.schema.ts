import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CouponCountOutputTypeSelectObjectSchema as CouponCountOutputTypeSelectObjectSchema } from './CouponCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CouponCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CouponCountOutputTypeArgsObjectSchema = makeSchema();
export const CouponCountOutputTypeArgsObjectZodSchema = makeSchema();
