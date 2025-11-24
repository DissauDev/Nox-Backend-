import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereInputObjectSchema as OptionValueWhereInputObjectSchema } from './OptionValueWhereInput.schema';
import { OptionValueUpdateWithoutProductOptionValueInputObjectSchema as OptionValueUpdateWithoutProductOptionValueInputObjectSchema } from './OptionValueUpdateWithoutProductOptionValueInput.schema';
import { OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema as OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema } from './OptionValueUncheckedUpdateWithoutProductOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OptionValueUpdateWithoutProductOptionValueInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema)])
}).strict();
export const OptionValueUpdateToOneWithWhereWithoutProductOptionValueInputObjectSchema: z.ZodType<Prisma.OptionValueUpdateToOneWithWhereWithoutProductOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpdateToOneWithWhereWithoutProductOptionValueInput>;
export const OptionValueUpdateToOneWithWhereWithoutProductOptionValueInputObjectZodSchema = makeSchema();
