import * as z from 'zod';
// prettier-ignore
export const OptionGroupResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    required: z.boolean(),
    minSelectable: z.number().int(),
    maxSelectable: z.number().int(),
    productOptions: z.array(z.unknown()),
    isAvailable: z.boolean(),
    OptionValue: z.array(z.unknown()),
    showImages: z.boolean(),
    selectionTitle: z.string().nullable()
}).strict();

export type OptionGroupResultType = z.infer<typeof OptionGroupResultSchema>;
