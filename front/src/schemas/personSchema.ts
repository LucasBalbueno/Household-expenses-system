import { z } from 'zod';

export const personSchema = z.object({
  nome: z.string()
    .min(1, 'Nome é obrigatório')
    .max(200, 'Nome deve ter no máximo 200 caracteres'),
  idade: z.string()
    .min(1, 'Idade é obrigatória')
    .refine((val) => parseInt(val) > 0, 'Idade deve ser maior que 0')
    .refine((val) => parseInt(val) <= 120, 'Idade deve ser menor que 120')
});

export type PersonFormData = z.infer<typeof personSchema>;
