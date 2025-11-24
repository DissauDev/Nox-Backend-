import * as z from 'zod';
// prettier-ignore
export const PageInputSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    slug: z.string(),
    layout: z.unknown(),
    isPublished: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    author: z.string().optional().nullable()
}).strict();

export type PageInputType = z.infer<typeof PageInputSchema>;
