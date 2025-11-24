import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionScalarWhereInputObjectSchema as ProductOptionScalarWhereInputObjectSchema } from './ProductOptionScalarWhereInput.schema';
import { ProductOptionUpdateManyMutationInputObjectSchema as ProductOptionUpdateManyMutationInputObjectSchema } from './ProductOptionUpdateManyMutationInput.schema';
import { ProductOptionUncheckedUpdateManyWithoutProductInputObjectSchema as ProductOptionUncheckedUpdateManyWithoutProductInputObjectSchema } from './ProductOptionUncheckedUpdateManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductOptionUpdateManyMutationInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateManyWithoutProductInputObjectSchema)])
}).strict();
export const ProductOptionUpdateManyWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateManyWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateManyWithWhereWithoutProductInput>;
export const ProductOptionUpdateManyWithWhereWithoutProductInputObjectZodSchema = makeSchema();
