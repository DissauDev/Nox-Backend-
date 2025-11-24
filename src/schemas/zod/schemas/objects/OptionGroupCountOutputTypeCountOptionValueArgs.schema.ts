import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './OptionValueWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereInputObjectSchema).optional()
}).strict();
export const OptionGroupCountOutputTypeCountOptionValueArgsObjectSchema = makeSchema();
export const OptionGroupCountOutputTypeCountOptionValueArgsObjectZodSchema = makeSchema();
