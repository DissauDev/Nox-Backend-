import * as z from 'zod';
// prettier-ignore
export const PageModelSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    slug: z.string(),
    layout: z.unknown(),
    isPublished: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    author: z.string().nullable()
}).strict();

export type PagePureType = z.infer<typeof PageModelSchema>;
