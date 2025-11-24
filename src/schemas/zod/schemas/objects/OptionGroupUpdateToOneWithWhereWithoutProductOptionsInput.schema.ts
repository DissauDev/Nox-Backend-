import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupWhereInputObjectSchema as OptionGroupWhereInputObjectSchema } from './OptionGroupWhereInput.schema';
import { OptionGroupUpdateWithoutProductOptionsInputObjectSchema as OptionGroupUpdateWithoutProductOptionsInputObjectSchema } from './OptionGroupUpdateWithoutProductOptionsInput.schema';
import { OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema as OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema } from './OptionGroupUncheckedUpdateWithoutProductOptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionGroupWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OptionGroupUpdateWithoutProductOptionsInputObjectSchema), z.lazy(() => OptionGroupUncheckedUpdateWithoutProductOptionsInputObjectSchema)])
}).strict();
export const OptionGroupUpdateToOneWithWhereWithoutProductOptionsInputObjectSchema: z.ZodType<Prisma.OptionGroupUpdateToOneWithWhereWithoutProductOptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupUpdateToOneWithWhereWithoutProductOptionsInput>;
export const OptionGroupUpdateToOneWithWhereWithoutProductOptionsInputObjectZodSchema = makeSchema();
