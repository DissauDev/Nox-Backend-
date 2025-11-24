import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateWithoutProductRefInputObjectSchema as OptionValueCreateWithoutProductRefInputObjectSchema } from './OptionValueCreateWithoutProductRefInput.schema';
import { OptionValueUncheckedCreateWithoutProductRefInputObjectSchema as OptionValueUncheckedCreateWithoutProductRefInputObjectSchema } from './OptionValueUncheckedCreateWithoutProductRefInput.schema';
import { OptionValueCreateOrConnectWithoutProductRefInputObjectSchema as OptionValueCreateOrConnectWithoutProductRefInputObjectSchema } from './OptionValueCreateOrConnectWithoutProductRefInput.schema';
import { OptionValueUpsertWithWhereUniqueWithoutProductRefInputObjectSchema as OptionValueUpsertWithWhereUniqueWithoutProductRefInputObjectSchema } from './OptionValueUpsertWithWhereUniqueWithoutProductRefInput.schema';
import { OptionValueCreateManyProductRefInputEnvelopeObjectSchema as OptionValueCreateManyProductRefInputEnvelopeObjectSchema } from './OptionValueCreateManyProductRefInputEnvelope.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueUpdateWithWhereUniqueWithoutProductRefInputObjectSchema as OptionValueUpdateWithWhereUniqueWithoutProductRefInputObjectSchema } from './OptionValueUpdateWithWhereUniqueWithoutProductRefInput.schema';
import { OptionValueUpdateManyWithWhereWithoutProductRefInputObjectSchema as OptionValueUpdateManyWithWhereWithoutProductRefInputObjectSchema } from './OptionValueUpdateManyWithWhereWithoutProductRefInput.schema';
import { OptionValueScalarWhereInputObjectSchema as OptionValueScalarWhereInputObjectSchema } from './OptionValueScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionValueCreateWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueCreateWithoutProductRefInputObjectSchema).array(), z.lazy(() => OptionValueUncheckedCreateWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutProductRefInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OptionValueCreateOrConnectWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueCreateOrConnectWithoutProductRefInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OptionValueUpsertWithWhereUniqueWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUpsertWithWhereUniqueWithoutProductRefInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OptionValueCreateManyProductRefInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OptionValueUpdateWithWhereUniqueWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUpdateWithWhereUniqueWithoutProductRefInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OptionValueUpdateManyWithWhereWithoutProductRefInputObjectSchema), z.lazy(() => OptionValueUpdateManyWithWhereWithoutProductRefInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OptionValueScalarWhereInputObjectSchema), z.lazy(() => OptionValueScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OptionValueUncheckedUpdateManyWithoutProductRefNestedInputObjectSchema: z.ZodType<Prisma.OptionValueUncheckedUpdateManyWithoutProductRefNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUncheckedUpdateManyWithoutProductRefNestedInput>;
export const OptionValueUncheckedUpdateManyWithoutProductRefNestedInputObjectZodSchema = makeSchema();
