import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './OptionGroupWhereUniqueInput.schema';
import { OptionGroupCreateWithoutProductOptionsInputObjectSchema as OptionGroupCreateWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateWithoutProductOptionsInput.schema';
import { OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema as OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema } from './OptionGroupUncheckedCreateWithoutProductOptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionGroupWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OptionGroupCreateWithoutProductOptionsInputObjectSchema), z.lazy(() => OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema)])
}).strict();
export const OptionGroupCreateOrConnectWithoutProductOptionsInputObjectSchema: z.ZodType<Prisma.OptionGroupCreateOrConnectWithoutProductOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCreateOrConnectWithoutProductOptionsInput>;
export const OptionGroupCreateOrConnectWithoutProductOptionsInputObjectZodSchema = makeSchema();
