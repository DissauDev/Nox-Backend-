import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema as OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './OrderItemUncheckedCreateNestedManyWithoutOrderInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderNumber: z.string(),
  status: OrderStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  totalAmount: z.number(),
  subtotal: z.number(),
  paymentMethod: z.string(),
  stripePaymentIntentId: z.string(),
  customerName: z.string(),
  customerLastname: z.string().optional().nullable(),
  customerEmail: z.string(),
  customerPhone: z.string().optional().nullable(),
  customerAddress: z.string(),
  apartment: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  billingCity: z.string().optional().nullable(),
  billingState: z.string().optional().nullable(),
  zipcode: z.string().optional().nullable(),
  specifications: z.string().optional().nullable(),
  items: z.lazy(() => OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional()
}).strict();
export const OrderUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUncheckedCreateWithoutUserInput>;
export const OrderUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
