import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCreateWithoutOptionValueInputObjectSchema as OptionGroupCreateWithoutOptionValueInputObjectSchema } from './OptionGroupCreateWithoutOptionValueInput.schema';
import { OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema as OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema } from './OptionGroupUncheckedCreateWithoutOptionValueInput.schema';
import { OptionGroupCreateOrConnectWithoutOptionValueInputObjectSchema as OptionGroupCreateOrConnectWithoutOptionValueInputObjectSchema } from './OptionGroupCreateOrConnectWithoutOptionValueInput.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './OptionGroupWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionGroupCreateWithoutOptionValueInputObjectSchema), z.lazy(() => OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OptionGroupCreateOrConnectWithoutOptionValueInputObjectSchema).optional(),
  connect: z.lazy(() => OptionGroupWhereUniqueInputObjectSchema).optional()
}).strict();
export const OptionGroupCreateNestedOneWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.OptionGroupCreateNestedOneWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCreateNestedOneWithoutOptionValueInput>;
export const OptionGroupCreateNestedOneWithoutOptionValueInputObjectZodSchema = makeSchema();
