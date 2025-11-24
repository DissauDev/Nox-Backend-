import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueUpdateWithoutGroupInputObjectSchema as OptionValueUpdateWithoutGroupInputObjectSchema } from './OptionValueUpdateWithoutGroupInput.schema';
import { OptionValueUncheckedUpdateWithoutGroupInputObjectSchema as OptionValueUncheckedUpdateWithoutGroupInputObjectSchema } from './OptionValueUncheckedUpdateWithoutGroupInput.schema';
import { OptionValueCreateWithoutGroupInputObjectSchema as OptionValueCreateWithoutGroupInputObjectSchema } from './OptionValueCreateWithoutGroupInput.schema';
import { OptionValueUncheckedCreateWithoutGroupInputObjectSchema as OptionValueUncheckedCreateWithoutGroupInputObjectSchema } from './OptionValueUncheckedCreateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OptionValueUpdateWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateWithoutGroupInputObjectSchema)]),
  create: z.union([z.lazy(() => OptionValueCreateWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutGroupInputObjectSchema)])
}).strict();
export const OptionValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema: z.ZodType<Prisma.OptionValueUpsertWithWhereUniqueWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpsertWithWhereUniqueWithoutGroupInput>;
export const OptionValueUpsertWithWhereUniqueWithoutGroupInputObjectZodSchema = makeSchema();
