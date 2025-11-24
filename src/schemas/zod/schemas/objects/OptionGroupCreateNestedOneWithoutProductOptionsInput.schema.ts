import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCreateWithoutProductOptionsInputObjectSchema as OptionGroupCreateWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateWithoutProductOptionsInput.schema';
import { OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema as OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema } from './OptionGroupUncheckedCreateWithoutProductOptionsInput.schema';
import { OptionGroupCreateOrConnectWithoutProductOptionsInputObjectSchema as OptionGroupCreateOrConnectWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateOrConnectWithoutProductOptionsInput.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './OptionGroupWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionGroupCreateWithoutProductOptionsInputObjectSchema), z.lazy(() => OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OptionGroupCreateOrConnectWithoutProductOptionsInputObjectSchema).optional(),
  connect: z.lazy(() => OptionGroupWhereUniqueInputObjectSchema).optional()
}).strict();
export const OptionGroupCreateNestedOneWithoutProductOptionsInputObjectSchema: z.ZodType<Prisma.OptionGroupCreateNestedOneWithoutProductOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCreateNestedOneWithoutProductOptionsInput>;
export const OptionGroupCreateNestedOneWithoutProductOptionsInputObjectZodSchema = makeSchema();
