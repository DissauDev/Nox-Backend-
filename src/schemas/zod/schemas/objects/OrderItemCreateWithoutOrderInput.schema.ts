import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ProductCreateNestedOneWithoutOrderItemInputObjectSchema as ProductCreateNestedOneWithoutOrderItemInputObjectSchema } from './ProductCreateNestedOneWithoutOrderItemInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  price: z.number(),
  chosenOptions: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOrderItemInputObjectSchema)
}).strict();
export const OrderItemCreateWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderItemCreateWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateWithoutOrderInput>;
export const OrderItemCreateWithoutOrderInputObjectZodSchema = makeSchema();
