import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueScalarWhereInputObjectSchema as ProductOptionValueScalarWhereInputObjectSchema } from './ProductOptionValueScalarWhereInput.schema';
import { ProductOptionValueUpdateManyMutationInputObjectSchema as ProductOptionValueUpdateManyMutationInputObjectSchema } from './ProductOptionValueUpdateManyMutationInput.schema';
import { ProductOptionValueUncheckedUpdateManyWithoutOptionValueInputObjectSchema as ProductOptionValueUncheckedUpdateManyWithoutOptionValueInputObjectSchema } from './ProductOptionValueUncheckedUpdateManyWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductOptionValueUpdateManyMutationInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedUpdateManyWithoutOptionValueInputObjectSchema)])
}).strict();
export const ProductOptionValueUpdateManyWithWhereWithoutOptionValueInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateManyWithWhereWithoutOptionValueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateManyWithWhereWithoutOptionValueInput>;
export const ProductOptionValueUpdateManyWithWhereWithoutOptionValueInputObjectZodSchema = makeSchema();
