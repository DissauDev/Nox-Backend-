import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCountOutputTypeCountProductOptionValueArgsObjectSchema as OptionValueCountOutputTypeCountProductOptionValueArgsObjectSchema } from './OptionValueCountOutputTypeCountProductOptionValueArgs.schema'

const makeSchema = () => z.object({
  ProductOptionValue: z.union([z.boolean(), z.lazy(() => OptionValueCountOutputTypeCountProductOptionValueArgsObjectSchema)]).optional()
}).strict();
export const OptionValueCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.OptionValueCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCountOutputTypeSelect>;
export const OptionValueCountOutputTypeSelectObjectZodSchema = makeSchema();
