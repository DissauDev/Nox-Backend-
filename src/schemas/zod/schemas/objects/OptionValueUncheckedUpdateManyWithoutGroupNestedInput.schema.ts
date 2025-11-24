import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateWithoutGroupInputObjectSchema as OptionValueCreateWithoutGroupInputObjectSchema } from './OptionValueCreateWithoutGroupInput.schema';
import { OptionValueUncheckedCreateWithoutGroupInputObjectSchema as OptionValueUncheckedCreateWithoutGroupInputObjectSchema } from './OptionValueUncheckedCreateWithoutGroupInput.schema';
import { OptionValueCreateOrConnectWithoutGroupInputObjectSchema as OptionValueCreateOrConnectWithoutGroupInputObjectSchema } from './OptionValueCreateOrConnectWithoutGroupInput.schema';
import { OptionValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema as OptionValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema } from './OptionValueUpsertWithWhereUniqueWithoutGroupInput.schema';
import { OptionValueCreateManyGroupInputEnvelopeObjectSchema as OptionValueCreateManyGroupInputEnvelopeObjectSchema } from './OptionValueCreateManyGroupInputEnvelope.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema as OptionValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema } from './OptionValueUpdateWithWhereUniqueWithoutGroupInput.schema';
import { OptionValueUpdateManyWithWhereWithoutGroupInputObjectSchema as OptionValueUpdateManyWithWhereWithoutGroupInputObjectSchema } from './OptionValueUpdateManyWithWhereWithoutGroupInput.schema';
import { OptionValueScalarWhereInputObjectSchema as OptionValueScalarWhereInputObjectSchema } from './OptionValueScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionValueCreateWithoutGroupInputObjectSchema), z.lazy(() => OptionValueCreateWithoutGroupInputObjectSchema).array(), z.lazy(() => OptionValueUncheckedCreateWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutGroupInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OptionValueCreateOrConnectWithoutGroupInputObjectSchema), z.lazy(() => OptionValueCreateOrConnectWithoutGroupInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OptionValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUpsertWithWhereUniqueWithoutGroupInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OptionValueCreateManyGroupInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OptionValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUpdateWithWhereUniqueWithoutGroupInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OptionValueUpdateManyWithWhereWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUpdateManyWithWhereWithoutGroupInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OptionValueScalarWhereInputObjectSchema), z.lazy(() => OptionValueScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OptionValueUncheckedUpdateManyWithoutGroupNestedInputObjectSchema: z.ZodType<Prisma.OptionValueUncheckedUpdateManyWithoutGroupNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUncheckedUpdateManyWithoutGroupNestedInput>;
export const OptionValueUncheckedUpdateManyWithoutGroupNestedInputObjectZodSchema = makeSchema();
