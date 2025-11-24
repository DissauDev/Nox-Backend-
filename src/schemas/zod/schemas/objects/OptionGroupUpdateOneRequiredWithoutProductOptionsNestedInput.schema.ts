import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCreateWithoutProductOptionsInputObjectSchema as OptionGroupCreateWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateWithoutProductOptionsInput.schema';
import { OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema as OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema } from './OptionGroupUncheckedCreateWithoutProductOptionsInput.schema';
import { OptionGroupCreateOrConnectWithoutProductOptionsInputObjectSchema as OptionGroupCreateOrConnectWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateOrConnectWithoutProductOptionsInput.schema';
import { OptionGroupUpsertWithoutProductOptionsInputObjectSchema as OptionGroupUpsertWithoutProductOptionsInputObjectSchema } from './OptionGroupUpsertWithoutProductOptionsInput.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './OptionGroupWhereUniqueInput.schema';
import { OptionGroupUpdateToOneWithWhereWithoutProductOptionsInputObjectSchema as OptionGroupUpdateToOneWithWhereWithoutProductOptionsInputObjectSchema } from './OptionGroupUpdateToOneWithWhereWithoutProductOptionsInput.schema';
import { OptionGroupUpdateWithoutProductOptionsInputObjectSchema as OptionGroupUpdateWithoutProductOptionsInputObjectSchema } from './OptionGroupUpdateWithoutProductOptionsInput.schema';
import { OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema as OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema } from './OptionGroupUncheckedUpdateWithoutProductOptionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionGroupCreateWithoutProductOptionsInputObjectSchema), z.lazy(() => OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OptionGroupCreateOrConnectWithoutProductOptionsInputObjectSchema).optional(),
  upsert: z.lazy(() => OptionGroupUpsertWithoutProductOptionsInputObjectSchema).optional(),
  connect: z.lazy(() => OptionGroupWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OptionGroupUpdateToOneWithWhereWithoutProductOptionsInputObjectSchema), z.lazy(() => OptionGroupUpdateWithoutProductOptionsInputObjectSchema), z.lazy(() => OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema)]).optional()
}).strict();
export const OptionGroupUpdateOneRequiredWithoutProductOptionsNestedInputObjectSchema: z.ZodType<Prisma.OptionGroupUpdateOneRequiredWithoutProductOptionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUpdateOneRequiredWithoutProductOptionsNestedInput>;
export const OptionGroupUpdateOneRequiredWithoutProductOptionsNestedInputObjectZodSchema = makeSchema();
