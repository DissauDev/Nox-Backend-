import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OptionValueScalarWhereInputObjectSchema as OptionValueScalarWhereInputObjectSchema } from './OptionValueScalarWhereInput.schema';
import { OptionValueUpdateManyMutationInputObjectSchema as OptionValueUpdateManyMutationInputObjectSchema } from './OptionValueUpdateManyMutationInput.schema';
import { OptionValueUncheckedUpdateManyWithoutGroupInputObjectSchema as OptionValueUncheckedUpdateManyWithoutGroupInputObjectSchema } from './OptionValueUncheckedUpdateManyWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OptionValueScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OptionValueUpdateManyMutationInputObjectSchema), z.lazy(() => OptionValueUncheckedUpdateManyWithoutGroupInputObjectSchema)])
}).strict();
export const OptionValueUpdateManyWithWhereWithoutGroupInputObjectSchema: z.ZodType<Prisma.OptionValueUpdateManyWithWhereWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.OptionValueUpdateManyWithWhereWithoutGroupInput>;
export const OptionValueUpdateManyWithWhereWithoutGroupInputObjectZodSchema = makeSchema();
