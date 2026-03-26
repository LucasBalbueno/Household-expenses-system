import { z } from 'zod';

export const personSchema = z.object({
  nome: z.string()
    .min(1, 'Nome é obrigatório')
    .max(200, 'Nome deve ter no máximo 200 caracteres'),
  idade: z.string()
    .min(1, 'Idade é obrigatória')
});

export type PersonFormData = z.infer<typeof personSchema>;
