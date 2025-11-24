import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCountOutputTypeSelectObjectSchema as OptionGroupCountOutputTypeSelectObjectSchema } from './OptionGroupCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OptionGroupCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const OptionGroupCountOutputTypeArgsObjectSchema = makeSchema();
export const OptionGroupCountOutputTypeArgsObjectZodSchema = makeSchema();
