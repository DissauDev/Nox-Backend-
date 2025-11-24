import * as z from 'zod';
// prettier-ignore
export const PageResultSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    slug: z.string(),
    layout: z.unknown(),
    isPublished: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    author: z.string().nullable()
}).strict();

export type PageResultType = z.infer<typeof PageResultSchema>;
