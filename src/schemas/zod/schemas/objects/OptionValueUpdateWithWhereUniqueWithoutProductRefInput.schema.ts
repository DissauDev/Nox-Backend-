import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueUpdateWithoutProductRefInputObjectSchema as OptionValueUpdateWithoutProductRefInputObjectSchema } from './OptionValueUpdateWithoutProductRefInput.schema';
import { OptionValueUncheckedUpdateWithoutProductRefInputObjectSchema as OptionValueUncheckedUpdateWithoutProductRefInputObjectSchema } from './OptionValueUncheckedUpdateWithoutProductRefInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OptionValueUpdateWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateWithoutProductRefInputObjectSchema)])
}).strict();
export const OptionValueUpdateWithWhereUniqueWithoutProductRefInputObjectSchema: z.ZodType<Prisma.OptionValueUpdateWithWhereUniqueWithoutProductRefInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpdateWithWhereUniqueWithoutProductRefInput>;
export const OptionValueUpdateWithWhereUniqueWithoutProductRefInputObjectZodSchema = makeSchema();
