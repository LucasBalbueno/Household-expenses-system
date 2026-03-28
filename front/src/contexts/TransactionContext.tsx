import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import type { TransactionContextType } from '../types/transactionTypes';

// Cria o contexto com o contrato
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Provider que expõe os dados e funções
export function TransactionProvider({ children }: { children: ReactNode }) {
  // Usa o hook para buscar funções de transactions
  const { transactions, loading, error, fetchTransactions, createTransaction } = useTransactions();

  return (
    <TransactionContext.Provider value={{
      transactions,
      loading,
      error,
      fetchTransactions,
      createTransaction
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

// Hook para usar o contexto
export function useTransactionContext() {
  // Verifica se o contexto foi fornecido corretamente
  const context = useContext(TransactionContext);

  // Se o contexto não for fornecido, ou seja, se tentar usar o hook fora de TransactionProvider, lança um erro
  if (context === undefined) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
}
