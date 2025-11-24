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
  updatedAt: z.coerce.date().optional(),
  author: z.string().optional().nullable()
}).strict();
export const PageCreateManyInputObjectSchema: z.ZodType<Prisma.PageCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PageCreateManyInput>;
export const PageCreateManyInputObjectZodSchema = makeSchema();
