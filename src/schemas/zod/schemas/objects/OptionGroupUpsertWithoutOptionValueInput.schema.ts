import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupUpdateWithoutOptionValueInputObjectSchema as OptionGroupUpdateWithoutOptionValueInputObjectSchema } from './OptionGroupUpdateWithoutOptionValueInput.schema';
import { OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema as OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema } from './OptionGroupUncheckedUpdateWithoutOptionValueInput.schema';
import { OptionGroupCreateWithoutOptionValueInputObjectSchema as OptionGroupCreateWithoutOptionValueInputObjectSchema } from './OptionGroupCreateWithoutOptionValueInput.schema';
import { OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema as OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema } from './OptionGroupUncheckedCreateWithoutOptionValueInput.schema';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './OptionGroupWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OptionGroupUpdateWithoutOptionValueInputObjectSchema), z.lazy(() => OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema)]),
  create: z.union([z.lazy(() => OptionGroupCreateWithoutOptionValueInputObjectSchema), z.lazy(() => OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema)]),
  where: z.lazy(() => OptionGroupWhereInputObjectSchema).optional()
}).strict();
export const OptionGroupUpsertWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.OptionGroupUpsertWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUpsertWithoutOptionValueInput>;
export const OptionGroupUpsertWithoutOptionValueInputObjectZodSchema = makeSchema();
