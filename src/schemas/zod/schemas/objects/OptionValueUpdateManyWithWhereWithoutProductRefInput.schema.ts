import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueScalarWhereInputObjectSchema as OptionValueScalarWhereInputObjectSchema } from './OptionValueScalarWhereInput.schema';
import { OptionValueUpdateManyMutationInputObjectSchema as OptionValueUpdateManyMutationInputObjectSchema } from './OptionValueUpdateManyMutationInput.schema';
import { OptionValueUncheckedUpdateManyWithoutProductRefInputObjectSchema as OptionValueUncheckedUpdateManyWithoutProductRefInputObjectSchema } from './OptionValueUncheckedUpdateManyWithoutProductRefInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OptionValueUpdateManyMutationInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateManyWithoutProductRefInputObjectSchema)])
}).strict();
export const OptionValueUpdateManyWithWhereWithoutProductRefInputObjectSchema: z.ZodType<Prisma.OptionValueUpdateManyWithWhereWithoutProductRefInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpdateManyWithWhereWithoutProductRefInput>;
export const OptionValueUpdateManyWithWhereWithoutProductRefInputObjectZodSchema = makeSchema();
