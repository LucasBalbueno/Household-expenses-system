import { z } from 'zod';

// Validação dos dados do formulário de transação
export const transactionSchema = z.object({
  description: z.string()
    .min(1, 'Descrição é obrigatória')
    .max(400, 'Descrição deve ter no máximo 400 caracteres'),
  amount: z.union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === 'number') return val;
      const clean = val.replace(/\D/g, '');
      return clean ? parseFloat(clean) / 100 : 0;
    })
    .pipe(z.number()
      .positive('O valor deve ser maior que zero')
      .max(999999.99, 'O valor deve ser menor que 999.999,99')),
  typeTransaction: z.string()
    .refine((value) => ['1', '2'].includes(value), {
      message: 'Tipo de transação inválido',
    }),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  personId: z.string().min(1, 'Pessoa é obrigatória')
});

// Tipo inferido dos dados do formulário de transação
export type TransactionFormInput = z.input<typeof transactionSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;
