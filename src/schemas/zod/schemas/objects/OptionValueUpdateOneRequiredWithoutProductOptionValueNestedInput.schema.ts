import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateWithoutProductOptionValueInputObjectSchema as OptionValueCreateWithoutProductOptionValueInputObjectSchema } from './OptionValueCreateWithoutProductOptionValueInput.schema';
import { OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema as OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema } from './OptionValueUncheckedCreateWithoutProductOptionValueInput.schema';
import { OptionValueCreateOrConnectWithoutProductOptionValueInputObjectSchema as OptionValueCreateOrConnectWithoutProductOptionValueInputObjectSchema } from './OptionValueCreateOrConnectWithoutProductOptionValueInput.schema';
import { OptionValueUpsertWithoutProductOptionValueInputObjectSchema as OptionValueUpsertWithoutProductOptionValueInputObjectSchema } from './OptionValueUpsertWithoutProductOptionValueInput.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueUpdateToOneWithWhereWithoutProductOptionValueInputObjectSchema as OptionValueUpdateToOneWithWhereWithoutProductOptionValueInputObjectSchema } from './OptionValueUpdateToOneWithWhereWithoutProductOptionValueInput.schema';
import { OptionValueUpdateWithoutProductOptionValueInputObjectSchema as OptionValueUpdateWithoutProductOptionValueInputObjectSchema } from './OptionValueUpdateWithoutProductOptionValueInput.schema';
import { OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema as OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema } from './OptionValueUncheckedUpdateWithoutProductOptionValueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionValueCreateWithoutProductOptionValueInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OptionValueCreateOrConnectWithoutProductOptionValueInputObjectSchema).optional(),
  upsert: z.lazy(() => OptionValueUpsertWithoutProductOptionValueInputObjectSchema).optional(),
  connect: z.lazy(() => OptionValueWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OptionValueUpdateToOneWithWhereWithoutProductOptionValueInputObjectSchema), z.lazy(() => OptionValueUpdateWithoutProductOptionValueInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateWithoutProductOptionValueInputObjectSchema)]).optional()
}).strict();
export const OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInputObjectSchema: z.ZodType<Prisma.OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInput>;
export const OptionValueUpdateOneRequiredWithoutProductOptionValueNestedInputObjectZodSchema = makeSchema();
