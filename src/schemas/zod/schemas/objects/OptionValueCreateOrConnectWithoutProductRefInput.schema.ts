import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueCreateWithoutProductRefInputObjectSchema as OptionValueCreateWithoutProductRefInputObjectSchema } from './OptionValueCreateWithoutProductRefInput.schema';
import { OptionValueUncheckedCreateWithoutProductRefInputObjectSchema as OptionValueUncheckedCreateWithoutProductRefInputObjectSchema } from './OptionValueUncheckedCreateWithoutProductRefInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OptionValueCreateWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutProductRefInputObjectSchema)])
}).strict();
export const OptionValueCreateOrConnectWithoutProductRefInputObjectSchema: z.ZodType<Prisma.OptionValueCreateOrConnectWithoutProductRefInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateOrConnectWithoutProductRefInput>;
export const OptionValueCreateOrConnectWithoutProductRefInputObjectZodSchema = makeSchema();
