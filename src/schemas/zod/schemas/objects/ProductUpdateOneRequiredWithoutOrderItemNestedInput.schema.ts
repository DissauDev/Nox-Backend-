import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutOrderItemInputObjectSchema as ProductCreateWithoutOrderItemInputObjectSchema } from './ProductCreateWithoutOrderItemInput.schema';
import { ProductUncheckedCreateWithoutOrderItemInputObjectSchema as ProductUncheckedCreateWithoutOrderItemInputObjectSchema } from './ProductUncheckedCreateWithoutOrderItemInput.schema';
import { ProductCreateOrConnectWithoutOrderItemInputObjectSchema as ProductCreateOrConnectWithoutOrderItemInputObjectSchema } from './ProductCreateOrConnectWithoutOrderItemInput.schema';
import { ProductUpsertWithoutOrderItemInputObjectSchema as ProductUpsertWithoutOrderItemInputObjectSchema } from './ProductUpsertWithoutOrderItemInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutOrderItemInputObjectSchema as ProductUpdateToOneWithWhereWithoutOrderItemInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutOrderItemInput.schema';
import { ProductUpdateWithoutOrderItemInputObjectSchema as ProductUpdateWithoutOrderItemInputObjectSchema } from './ProductUpdateWithoutOrderItemInput.schema';
import { ProductUncheckedUpdateWithoutOrderItemInputObjectSchema as ProductUncheckedUpdateWithoutOrderItemInputObjectSchema } from './ProductUncheckedUpdateWithoutOrderItemInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOrderItemInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOrderItemInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOrderItemInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutOrderItemInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutOrderItemInputObjectSchema), z.lazy(() => ProductUpdateWithoutOrderItemInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutOrderItemInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutOrderItemNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutOrderItemNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutOrderItemNestedInput>;
export const ProductUpdateOneRequiredWithoutOrderItemNestedInputObjectZodSchema = makeSchema();
