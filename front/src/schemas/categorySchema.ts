import { z } from 'zod';
import { CategoryPurpose } from '../types/categoryTypes';

export const categorySchema = z.object({
  description: z.string()
    .min(1, 'Descrição é obrigatória')
    .max(400, 'Descrição deve ter no máximo 400 caracteres'),
  purpose: z.string()
    .refine((value) => ['1', '2', '3'].includes(value), {
      message: 'Propósito inválido',
    })
    .transform((value) => value as CategoryPurpose)
});

export type CategoryFormData = {
  description: string;
  purpose: string;
};
