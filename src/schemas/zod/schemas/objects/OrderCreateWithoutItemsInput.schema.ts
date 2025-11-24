import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { UserCreateNestedOneWithoutOrdersInputObjectSchema as UserCreateNestedOneWithoutOrdersInputObjectSchema } from './UserCreateNestedOneWithoutOrdersInput.schema'

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
  user: z.lazy(() => UserCreateNestedOneWithoutOrdersInputObjectSchema).optional()
}).strict();
export const OrderCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.OrderCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateWithoutItemsInput>;
export const OrderCreateWithoutItemsInputObjectZodSchema = makeSchema();
