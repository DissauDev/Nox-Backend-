import * as z from 'zod';
export const PageDeleteManyResultSchema = z.object({
  count: z.number()
});