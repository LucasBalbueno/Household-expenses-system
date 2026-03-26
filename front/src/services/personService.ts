import axios from "axios";
import type { Person } from "../types/personType";

// ***** ATENÇÂO *****
// URL da API (MUDAR PARA A PORTA QUE O BACKEND ESTÁ RODANDO)
const API_URL = "http://localhost:5163";

// Configuração da API (baseURL + /api)
const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Função para validar erros
const validationError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error("Detalhes do erro axios:", error.response?.status, error.response?.data);
  }
}

export const personService = {
  // Serviço para buscar todas as pessoas
  async getAll(): Promise<Person[]> {
    try {
      const response = await api.get("/people");
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },

  // Serviço para criar uma pessoa
  async create(person: Person): Promise<Person[]> {
    try {
      const response = await api.post("/people", person);
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },
};