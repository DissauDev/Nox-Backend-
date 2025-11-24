import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueUpdateWithoutProductRefInputObjectSchema as OptionValueUpdateWithoutProductRefInputObjectSchema } from './OptionValueUpdateWithoutProductRefInput.schema';
import { OptionValueUncheckedUpdateWithoutProductRefInputObjectSchema as OptionValueUncheckedUpdateWithoutProductRefInputObjectSchema } from './OptionValueUncheckedUpdateWithoutProductRefInput.schema';
import { OptionValueCreateWithoutProductRefInputObjectSchema as OptionValueCreateWithoutProductRefInputObjectSchema } from './OptionValueCreateWithoutProductRefInput.schema';
import { OptionValueUncheckedCreateWithoutProductRefInputObjectSchema as OptionValueUncheckedCreateWithoutProductRefInputObjectSchema } from './OptionValueUncheckedCreateWithoutProductRefInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OptionValueUpdateWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateWithoutProductRefInputObjectSchema)]),
  create: z.union([z.lazy(() => OptionValueCreateWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutProductRefInputObjectSchema)])
}).strict();
export const OptionValueUpsertWithWhereUniqueWithoutProductRefInputObjectSchema: z.ZodType<Prisma.OptionValueUpsertWithWhereUniqueWithoutProductRefInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpsertWithWhereUniqueWithoutProductRefInput>;
export const OptionValueUpsertWithWhereUniqueWithoutProductRefInputObjectZodSchema = makeSchema();
