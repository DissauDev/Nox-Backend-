import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema';
import { OptionValueCreateWithoutProductOptionValueInputObjectSchema as OptionValueCreateWithoutProductOptionValueInputObjectSchema } from './OptionValueCreateWithoutProductOptionValueInput.schema';
import { OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema as OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema } from './OptionValueUncheckedCreateWithoutProductOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OptionValueCreateWithoutProductOptionValueInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema)])
}).strict();
export const OptionValueCreateOrConnectWithoutProductOptionValueInputObjectSchema: z.ZodType<Prisma.OptionValueCreateOrConnectWithoutProductOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateOrConnectWithoutProductOptionValueInput>;
export const OptionValueCreateOrConnectWithoutProductOptionValueInputObjectZodSchema = makeSchema();
