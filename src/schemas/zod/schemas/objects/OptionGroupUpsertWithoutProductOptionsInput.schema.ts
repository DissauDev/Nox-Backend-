import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupUpdateWithoutProductOptionsInputObjectSchema as OptionGroupUpdateWithoutProductOptionsInputObjectSchema } from './OptionGroupUpdateWithoutProductOptionsInput.schema';
import { OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema as OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema } from './OptionGroupUncheckedUpdateWithoutProductOptionsInput.schema';
import { OptionGroupCreateWithoutProductOptionsInputObjectSchema as OptionGroupCreateWithoutProductOptionsInputObjectSchema } from './OptionGroupCreateWithoutProductOptionsInput.schema';
import { OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema as OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema } from './OptionGroupUncheckedCreateWithoutProductOptionsInput.schema';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './OptionGroupWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OptionGroupUpdateWithoutProductOptionsInputObjectSchema), z.lazy(() => OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema)]),
  create: z.union([z.lazy(() => OptionGroupCreateWithoutProductOptionsInputObjectSchema), z.lazy(() => OptionGroupUncheckedCreateWithoutProductOptionsInputObjectSchema)]),
  where: z.lazy(() => OptionGroupWhereInputObjectSchema).optional()
}).strict();
export const OptionGroupUpsertWithoutProductOptionsInputObjectSchema: z.ZodType<Prisma.OptionGroupUpsertWithoutProductOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUpsertWithoutProductOptionsInput>;
export const OptionGroupUpsertWithoutProductOptionsInputObjectZodSchema = makeSchema();
