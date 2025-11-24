import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionValueScalarWhereInputObjectSchema as ProductOptionValueScalarWhereInputObjectSchema } from './ProductOptionValueScalarWhereInput.schema';
import { ProductOptionValueUpdateManyMutationInputObjectSchema as ProductOptionValueUpdateManyMutationInputObjectSchema } from './ProductOptionValueUpdateManyMutationInput.schema';
import { ProductOptionValueUncheckedUpdateManyWithoutProductOptionInputObjectSchema as ProductOptionValueUncheckedUpdateManyWithoutProductOptionInputObjectSchema } from './ProductOptionValueUncheckedUpdateManyWithoutProductOptionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionValueScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductOptionValueUpdateManyMutationInputObjectSchema), z.lazy(() => ProductOptionValueUncheckedUpdateManyWithoutProductOptionInputObjectSchema)])
}).strict();
export const ProductOptionValueUpdateManyWithWhereWithoutProductOptionInputObjectSchema: z.ZodType<Prisma.ProductOptionValueUpdateManyWithWhereWithoutProductOptionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionValueUpdateManyWithWhereWithoutProductOptionInput>;
export const ProductOptionValueUpdateManyWithWhereWithoutProductOptionInputObjectZodSchema = makeSchema();
