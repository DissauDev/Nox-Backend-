import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupSelectObjectSchema as OptionGroupSelectObjectSchema } from './OptionGroupSelect.schema';
import { OptionGroupIncludeObjectSchema as OptionGroupIncludeObjectSchema } from './OptionGroupInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OptionGroupSelectObjectSchema).optional(),
  include: z.lazy(() => OptionGroupIncludeObjectSchema).optional()
}).strict();
export const OptionGroupArgsObjectSchema = makeSchema();
export const OptionGroupArgsObjectZodSchema = makeSchema();
