import { useState, useEffect, useCallback } from 'react';
import type { Transaction, TransactionData } from '../types/transactionTypes';
import { transactionService } from '../services/transactionService';

export function useTransactions() {
  // Inicializa os estados com valores padrão
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca todas as transações
  // UseCallback usa cache para evitar recriação desnecessária (re-renderizações)
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (error) {
      setError("Não foi possível carregar as transações");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cria uma nova transação e atualiza a lista de transações
  // UseCallback usa cache para evitar recriação desnecessária (re-renderizações)
  const createTransaction = useCallback(async (transaction: TransactionData) => {
    try {
      await transactionService.create(transaction);
      await fetchTransactions();
    } catch (error) {
      throw error;
    }
  }, [fetchTransactions]);

  // Carrega as transações quando o hook é inicializado
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Retorna os valores e funções
  return { transactions, loading, error, fetchTransactions, createTransaction };
}
