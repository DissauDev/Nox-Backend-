import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateWithoutGroupInputObjectSchema as OptionValueCreateWithoutGroupInputObjectSchema } from './OptionValueCreateWithoutGroupInput.schema';
import { OptionValueUncheckedCreateWithoutGroupInputObjectSchema as OptionValueUncheckedCreateWithoutGroupInputObjectSchema } from './OptionValueUncheckedCreateWithoutGroupInput.schema';
import { OptionValueCreateOrConnectWithoutGroupInputObjectSchema as OptionValueCreateOrConnectWithoutGroupInputObjectSchema } from './OptionValueCreateOrConnectWithoutGroupInput.schema';
import { OptionValueCreateManyGroupInputEnvelopeObjectSchema as OptionValueCreateManyGroupInputEnvelopeObjectSchema } from './OptionValueCreateManyGroupInputEnvelope.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionValueCreateWithoutGroupInputObjectSchema), z.lazy(() => OptionValueCreateWithoutGroupInputObjectSchema).array(), z.lazy(() => OptionValueUncheckedCreateWithoutGroupInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutGroupInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OptionValueCreateOrConnectWithoutGroupInputObjectSchema), z.lazy(() => OptionValueCreateOrConnectWithoutGroupInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OptionValueCreateManyGroupInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OptionValueWhereUniqueInputObjectSchema), z.lazy(() => OptionValueWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OptionValueUncheckedCreateNestedManyWithoutGroupInputObjectSchema: z.ZodType<Prisma.OptionValueUncheckedCreateNestedManyWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUncheckedCreateNestedManyWithoutGroupInput>;
export const OptionValueUncheckedCreateNestedManyWithoutGroupInputObjectZodSchema = makeSchema();
