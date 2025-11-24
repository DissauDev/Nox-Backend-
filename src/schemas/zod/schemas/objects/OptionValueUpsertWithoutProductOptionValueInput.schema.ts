import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueUpdateWithoutProductOptionValueInputObjectSchema as OptionValueUpdateWithoutProductOptionValueInputObjectSchema } from './OptionValueUpdateWithoutProductOptionValueInput.schema';
import { OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema as OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema } from './OptionValueUncheckedUpdateWithoutProductOptionValueInput.schema';
import { OptionValueCreateWithoutProductOptionValueInputObjectSchema as OptionValueCreateWithoutProductOptionValueInputObjectSchema } from './OptionValueCreateWithoutProductOptionValueInput.schema';
import { OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema as OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema } from './OptionValueUncheckedCreateWithoutProductOptionValueInput.schema';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './OptionValueWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OptionValueUpdateWithoutProductOptionValueInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema)]),
  create: z.union([z.lazy(() => OptionValueCreateWithoutProductOptionValueInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema)]),
  where: z.lazy(() => OptionValueWhereInputObjectSchema).optional()
}).strict();
export const OptionValueUpsertWithoutProductOptionValueInputObjectSchema: z.ZodType<Prisma.OptionValueUpsertWithoutProductOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpsertWithoutProductOptionValueInput>;
export const OptionValueUpsertWithoutProductOptionValueInputObjectZodSchema = makeSchema();
