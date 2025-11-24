import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './OptionGroupWhereInput.schema';
import { OptionGroupUpdateWithoutOptionValueInputObjectSchema as OptionGroupUpdateWithoutOptionValueInputObjectSchema } from './OptionGroupUpdateWithoutOptionValueInput.schema';
import { OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema as OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema } from './OptionGroupUncheckedUpdateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionGroupWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OptionGroupUpdateWithoutOptionValueInputObjectSchema), z.lazy(() => OptionGroupUncheckedUpdateWithoutOptionValueInputObjectSchema)])
}).strict();
export const OptionGroupUpdateToOneWithWhereWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.OptionGroupUpdateToOneWithWhereWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUpdateToOneWithWhereWithoutOptionValueInput>;
export const OptionGroupUpdateToOneWithWhereWithoutOptionValueInputObjectZodSchema = makeSchema();
