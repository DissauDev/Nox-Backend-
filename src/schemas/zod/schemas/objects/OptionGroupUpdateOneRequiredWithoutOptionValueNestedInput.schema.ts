import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupCreateWithoutOptionValueInputObjectSchema as OptionGroupCreateWithoutOptionValueInputObjectSchema } from './OptionGroupCreateWithoutOptionValueInput.schema';
import { OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema as OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema } from './OptionGroupUncheckedCreateWithoutOptionValueInput.schema';
import { OptionGroupCreateOrConnectWithoutOptionValueInputObjectSchema as OptionGroupCreateOrConnectWithoutOptionValueInputObjectSchema } from './OptionGroupCreateOrConnectWithoutOptionValueInput.schema';
import { OptionGroupUpsertWithoutOptionValueInputObjectSchema as OptionGroupUpsertWithoutOptionValueInputObjectSchema } from './OptionGroupUpsertWithoutOptionValueInput.schema';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './OptionGroupWhereUniqueInput.schema';
import { OptionGroupUpdateToOneWithWhereWithoutOptionValueInputObjectSchema as OptionGroupUpdateToOneWithWhereWithoutOptionValueInputObjectSchema } from './OptionGroupUpdateToOneWithWhereWithoutOptionValueInput.schema';
import { OptionGroupUpdateWithoutOptionValueInputObjectSchema as OptionGroupUpdateWithoutOptionValueInputObjectSchema } from './OptionGroupUpdateWithoutOptionValueInput.schema';
import { OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema as OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema } from './OptionGroupUncheckedUpdateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionGroupCreateWithoutOptionValueInputObjectSchema), z.lazy(() => OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OptionGroupCreateOrConnectWithoutOptionValueInputObjectSchema).optional(),
  upsert: z.lazy(() => OptionGroupUpsertWithoutOptionValueInputObjectSchema).optional(),
  connect: z.lazy(() => OptionGroupWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OptionGroupUpdateToOneWithWhereWithoutOptionValueInputObjectSchema), z.lazy(() => OptionGroupUpdateWithoutOptionValueInputObjectSchema), z.lazy(() => OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema)]).optional()
}).strict();
export const OptionGroupUpdateOneRequiredWithoutOptionValueNestedInputObjectSchema: z.ZodType<Prisma.OptionGroupUpdateOneRequiredWithoutOptionValueNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUpdateOneRequiredWithoutOptionValueNestedInput>;
export const OptionGroupUpdateOneRequiredWithoutOptionValueNestedInputObjectZodSchema = makeSchema();
