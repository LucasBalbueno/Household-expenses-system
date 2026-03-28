import type { Transaction, TransactionData } from "../types/transactionTypes";
import { api, validationError } from "./api";

export const transactionService = {
  // Serviço para buscar todas as transações
  async getAll(): Promise<Transaction[]> {
    try {
      const response = await api.get("/transactions");
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },

  // Serviço para criar uma transação
  async create(transaction: TransactionData): Promise<Transaction[]> {
    try {
      const response = await api.post("/transactions", transaction);
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },
};