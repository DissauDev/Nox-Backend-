import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionScalarWhereInputObjectSchema as ProductOptionScalarWhereInputObjectSchema } from './ProductOptionScalarWhereInput.schema';
import { ProductOptionUpdateManyMutationInputObjectSchema as ProductOptionUpdateManyMutationInputObjectSchema } from './ProductOptionUpdateManyMutationInput.schema';
import { ProductOptionUncheckedUpdateManyWithoutGroupInputObjectSchema as ProductOptionUncheckedUpdateManyWithoutGroupInputObjectSchema } from './ProductOptionUncheckedUpdateManyWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductOptionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ProductOptionUpdateManyMutationInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateManyWithoutGroupInputObjectSchema)])
}).strict();
export const ProductOptionUpdateManyWithWhereWithoutGroupInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateManyWithWhereWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateManyWithWhereWithoutGroupInput>;
export const ProductOptionUpdateManyWithWhereWithoutGroupInputObjectZodSchema = makeSchema();
