import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  title: z.string(),
  slug: z.string(),
  layout: z.union([JsonNullValueInputSchema, jsonSchema]),
  isPublished: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  author: z.string().optional().nullable()
}).strict();
export const PageUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PageUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PageUncheckedCreateInput>;
export const PageUncheckedCreateInputObjectZodSchema = makeSchema();
