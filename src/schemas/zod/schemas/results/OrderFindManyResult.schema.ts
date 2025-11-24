import * as z from 'zod';
export const OrderFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  orderNumber: z.string(),
  status: z.unknown(),
  createdAt: z.date(),
  totalAmount: z.number(),
  subtotal: z.number(),
  paymentMethod: z.string(),
  stripePaymentIntentId: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  customerName: z.string(),
  customerLastname: z.string().optional(),
  customerEmail: z.string(),
  customerPhone: z.string().optional(),
  customerAddress: z.string(),
  apartment: z.string().optional(),
  company: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  zipcode: z.string().optional(),
  specifications: z.string().optional(),
  items: z.array(z.unknown())
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});