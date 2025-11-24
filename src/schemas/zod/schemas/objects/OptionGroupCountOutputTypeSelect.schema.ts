import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCountOutputTypeCountProductOptionsArgsObjectSchema as OptionGroupCountOutputTypeCountProductOptionsArgsObjectSchema } from './OptionGroupCountOutputTypeCountProductOptionsArgs.schema';
import { OptionGroupCountOutputTypeCountOptionValueArgsObjectSchema as OptionGroupCountOutputTypeCountOptionValueArgsObjectSchema } from './OptionGroupCountOutputTypeCountOptionValueArgs.schema'

const makeSchema = () => z.object({
  productOptions: z.union([z.boolean(), z.lazy(() => OptionGroupCountOutputTypeCountProductOptionsArgsObjectSchema)]).optional(),
  OptionValue: z.union([z.boolean(), z.lazy(() => OptionGroupCountOutputTypeCountOptionValueArgsObjectSchema)]).optional()
}).strict();
export const OptionGroupCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.OptionGroupCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCountOutputTypeSelect>;
export const OptionGroupCountOutputTypeSelectObjectZodSchema = makeSchema();
