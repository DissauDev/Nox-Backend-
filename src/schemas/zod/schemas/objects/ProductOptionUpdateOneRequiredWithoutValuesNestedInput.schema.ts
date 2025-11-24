import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductOptionCreateWithoutValuesInputObjectSchema as ProductOptionCreateWithoutValuesInputObjectSchema } from './ProductOptionCreateWithoutValuesInput.schema';
import { ProductOptionUncheckedCreateWithoutValuesInputObjectSchema as ProductOptionUncheckedCreateWithoutValuesInputObjectSchema } from './ProductOptionUncheckedCreateWithoutValuesInput.schema';
import { ProductOptionCreateOrConnectWithoutValuesInputObjectSchema as ProductOptionCreateOrConnectWithoutValuesInputObjectSchema } from './ProductOptionCreateOrConnectWithoutValuesInput.schema';
import { ProductOptionUpsertWithoutValuesInputObjectSchema as ProductOptionUpsertWithoutValuesInputObjectSchema } from './ProductOptionUpsertWithoutValuesInput.schema';
import { ProductOptionWhereUniqueInputObjectSchema as ProductOptionWhereUniqueInputObjectSchema } from './ProductOptionWhereUniqueInput.schema';
import { ProductOptionUpdateToOneWithWhereWithoutValuesInputObjectSchema as ProductOptionUpdateToOneWithWhereWithoutValuesInputObjectSchema } from './ProductOptionUpdateToOneWithWhereWithoutValuesInput.schema';
import { ProductOptionUpdateWithoutValuesInputObjectSchema as ProductOptionUpdateWithoutValuesInputObjectSchema } from './ProductOptionUpdateWithoutValuesInput.schema';
import { ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema as ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema } from './ProductOptionUncheckedUpdateWithoutValuesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductOptionCreateWithoutValuesInputObjectSchema), z.lazy(() => ProductOptionUncheckedCreateWithoutValuesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductOptionCreateOrConnectWithoutValuesInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductOptionUpsertWithoutValuesInputObjectSchema).optional(),
  connect: z.lazy(() => ProductOptionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductOptionUpdateToOneWithWhereWithoutValuesInputObjectSchema), z.lazy(() => ProductOptionUpdateWithoutValuesInputObjectSchema), z.lazy(() => ProductOptionUncheckedUpdateWithoutValuesInputObjectSchema)]).optional()
}).strict();
export const ProductOptionUpdateOneRequiredWithoutValuesNestedInputObjectSchema: z.ZodType<Prisma.ProductOptionUpdateOneRequiredWithoutValuesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOptionUpdateOneRequiredWithoutValuesNestedInput>;
export const ProductOptionUpdateOneRequiredWithoutValuesNestedInputObjectZodSchema = makeSchema();
