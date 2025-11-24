import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionGroupWhereUniqueInputObjectSchema as OptionGroupWhereUniqueInputObjectSchema } from './OptionGroupWhereUniqueInput.schema';
import { OptionGroupCreateWithoutOptionValueInputObjectSchema as OptionGroupCreateWithoutOptionValueInputObjectSchema } from './OptionGroupCreateWithoutOptionValueInput.schema';
import { OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema as OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema } from './OptionGroupUncheckedCreateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionGroupWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OptionGroupCreateWithoutOptionValueInputObjectSchema), z.lazy(() => OptionGroupUncheckedCreateWithoutOptionValueInputObjectSchema)])
}).strict();
export const OptionGroupCreateOrConnectWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.OptionGroupCreateOrConnectWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionGroupCreateOrConnectWithoutOptionValueInput>;
export const OptionGroupCreateOrConnectWithoutOptionValueInputObjectZodSchema = makeSchema();
