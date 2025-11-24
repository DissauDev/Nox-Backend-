import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutOptionsInputObjectSchema as ProductCreateWithoutOptionsInputObjectSchema } from './ProductCreateWithoutOptionsInput.schema';
import { ProductUncheckedCreateWithoutOptionsInputObjectSchema as ProductUncheckedCreateWithoutOptionsInputObjectSchema } from './ProductUncheckedCreateWithoutOptionsInput.schema';
import { ProductCreateOrConnectWithoutOptionsInputObjectSchema as ProductCreateOrConnectWithoutOptionsInputObjectSchema } from './ProductCreateOrConnectWithoutOptionsInput.schema';
import { ProductUpsertWithoutOptionsInputObjectSchema as ProductUpsertWithoutOptionsInputObjectSchema } from './ProductUpsertWithoutOptionsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutOptionsInputObjectSchema as ProductUpdateToOneWithWhereWithoutOptionsInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutOptionsInput.schema';
import { ProductUpdateWithoutOptionsInputObjectSchema as ProductUpdateWithoutOptionsInputObjectSchema } from './ProductUpdateWithoutOptionsInput.schema';
import { ProductUncheckedUpdateWithoutOptionsInputObjectSchema as ProductUncheckedUpdateWithoutOptionsInputObjectSchema } from './ProductUncheckedUpdateWithoutOptionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOptionsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOptionsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutOptionsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutOptionsInputObjectSchema), z.lazy(() => ProductUpdateWithoutOptionsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutOptionsInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutOptionsNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutOptionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutOptionsNestedInput>;
export const ProductUpdateOneRequiredWithoutOptionsNestedInputObjectZodSchema = makeSchema();
