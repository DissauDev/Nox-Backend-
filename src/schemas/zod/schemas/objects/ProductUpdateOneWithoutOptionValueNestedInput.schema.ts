import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutOptionValueInputObjectSchema as ProductCreateWithoutOptionValueInputObjectSchema } from './ProductCreateWithoutOptionValueInput.schema';
import { ProductUncheckedCreateWithoutOptionValueInputObjectSchema as ProductUncheckedCreateWithoutOptionValueInputObjectSchema } from './ProductUncheckedCreateWithoutOptionValueInput.schema';
import { ProductCreateOrConnectWithoutOptionValueInputObjectSchema as ProductCreateOrConnectWithoutOptionValueInputObjectSchema } from './ProductCreateOrConnectWithoutOptionValueInput.schema';
import { ProductUpsertWithoutOptionValueInputObjectSchema as ProductUpsertWithoutOptionValueInputObjectSchema } from './ProductUpsertWithoutOptionValueInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutOptionValueInputObjectSchema as ProductUpdateToOneWithWhereWithoutOptionValueInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutOptionValueInput.schema';
import { ProductUpdateWithoutOptionValueInputObjectSchema as ProductUpdateWithoutOptionValueInputObjectSchema } from './ProductUpdateWithoutOptionValueInput.schema';
import { ProductUncheckedUpdateWithoutOptionValueInputObjectSchema as ProductUncheckedUpdateWithoutOptionValueInputObjectSchema } from './ProductUncheckedUpdateWithoutOptionValueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutOptionValueInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOptionValueInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutOptionValueInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ProductWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutOptionValueInputObjectSchema), z.lazy(() => ProductUpdateWithoutOptionValueInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutOptionValueInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneWithoutOptionValueNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneWithoutOptionValueNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneWithoutOptionValueNestedInput>;
export const ProductUpdateOneWithoutOptionValueNestedInputObjectZodSchema = makeSchema();
