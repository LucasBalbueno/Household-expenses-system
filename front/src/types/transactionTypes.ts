export const TypeTransaction = {
  DESPESA: 'Despesa',
  RECEITA: 'Receita',
} as const;

export type TypeTransaction = typeof TypeTransaction[keyof typeof TypeTransaction];

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  typeTransaction: TypeTransaction;
  categoryDescription: string;
  personName: string;
};

export type TransactionData = {
  description: string;
  amount: number;
  typeTransaction: number;
  categoryId: string;
  personId: string;
};

export type TransactionFormProps = {
  initialValues?: Partial<Transaction>;
};

export type TransactionItemProps = {
  transaction: Transaction;
};

export type TransactionContextType = {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  createTransaction: (transaction: TransactionData) => Promise<void>;
}