import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  quantity: z.number().int(),
  price: z.number(),
  chosenOptions: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional()
}).strict();
export const OrderItemCreateManyOrderInputObjectSchema: z.ZodType<Prisma.OrderItemCreateManyOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateManyOrderInput>;
export const OrderItemCreateManyOrderInputObjectZodSchema = makeSchema();
