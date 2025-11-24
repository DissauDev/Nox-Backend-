import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateWithoutProductRefInputObjectSchema as OptionValueCreateWithoutProductRefInputObjectSchema } from './OptionValueCreateWithoutProductRefInput.schema';
import { OptionValueUncheckedCreateWithoutProductRefInputObjectSchema as OptionValueUncheckedCreateWithoutProductRefInputObjectSchema } from './OptionValueUncheckedCreateWithoutProductRefInput.schema';
import { OptionValueCreateOrConnectWithoutProductRefInputObjectSchema as OptionValueCreateOrConnectWithoutProductRefInputObjectSchema } from './OptionValueCreateOrConnectWithoutProductRefInput.schema';
import { OptionValueCreateManyProductRefInputEnvelopeObjectSchema as OptionValueCreateManyProductRefInputEnvelopeObjectSchema } from './OptionValueCreateManyProductRefInputEnvelope.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionValueCreateWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueCreateWithoutProductRefInputObjectSchema).array(), z.lazy(() => OptionValueUncheckedCreateWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutProductRefInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OptionValueCreateOrConnectWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueCreateOrConnectWithoutProductRefInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OptionValueCreateManyProductRefInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OptionValueUncheckedCreateNestedManyWithoutProductRefInputObjectSchema: z.ZodType<Prisma.OptionValueUncheckedCreateNestedManyWithoutProductRefInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUncheckedCreateNestedManyWithoutProductRefInput>;
export const OptionValueUncheckedCreateNestedManyWithoutProductRefInputObjectZodSchema = makeSchema();
