import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueCreateWithoutProductOptionValueInputObjectSchema as OptionValueCreateWithoutProductOptionValueInputObjectSchema } from './OptionValueCreateWithoutProductOptionValueInput.schema';
import { OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema as OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema } from './OptionValueUncheckedCreateWithoutProductOptionValueInput.schema';
import { OptionValueCreateOrConnectWithoutProductOptionValueInputObjectSchema as OptionValueCreateOrConnectWithoutProductOptionValueInputObjectSchema } from './OptionValueCreateOrConnectWithoutProductOptionValueInput.schema';
import { OptionValueWhereUniqueInputObjectSchema as OptionValueWhereUniqueInputObjectSchema } from './OptionValueWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OptionValueCreateWithoutProductOptionValueInputObjectSchema), z.lazy(() => OptionValueUncheckedCreateWithoutProductOptionValueInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OptionValueCreateOrConnectWithoutProductOptionValueInputObjectSchema).optional(),
  connect: z.lazy(() => OptionValueWhereUniqueInputObjectSchema).optional()
}).strict();
export const OptionValueCreateNestedOneWithoutProductOptionValueInputObjectSchema: z.ZodType<Prisma.OptionValueCreateNestedOneWithoutProductOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueCreateNestedOneWithoutProductOptionValueInput>;
export const OptionValueCreateNestedOneWithoutProductOptionValueInputObjectZodSchema = makeSchema();
