import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueCreateWithoutGroupInputObjectSchema as OptionValueCreateWithoutGroupInputObjectSchema } from './OptionValueCreateWithoutGroupInput.schema';
import { OptionValueUncheckedCreateWithoutGroupInputObjectSchema as OptionValueUncheckedCreateWithoutGroupInputObjectSchema } from './OptionValueUncheckedCreateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OptionValueCreateWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutGroupInputObjectSchema)])
}).strict();
export const OptionValueCreateOrConnectWithoutGroupInputObjectSchema: z.ZodType<Prisma.OptionValueCreateOrConnectWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateOrConnectWithoutGroupInput>;
export const OptionValueCreateOrConnectWithoutGroupInputObjectZodSchema = makeSchema();
