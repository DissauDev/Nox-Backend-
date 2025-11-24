import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueUpdateWithoutGroupInputObjectSchema as OptionValueUpdateWithoutGroupInputObjectSchema } from './OptionValueUpdateWithoutGroupInput.schema';
import { OptionValueUncheckedUpdateWithoutGroupInputObjectSchema as OptionValueUncheckedUpdateWithoutGroupInputObjectSchema } from './OptionValueUncheckedUpdateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OptionValueUpdateWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateWithoutGroupInputObjectSchema)])
}).strict();
export const OptionValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema: z.ZodType<Prisma.OptionValueUpdateWithWhereUniqueWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpdateWithWhereUniqueWithoutGroupInput>;
export const OptionValueUpdateWithWhereUniqueWithoutGroupInputObjectZodSchema = makeSchema();
