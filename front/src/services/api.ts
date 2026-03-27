import axios from "axios";

// ***** ATENÇÂO *****
// URL da API (MUDAR PARA A PORTA QUE O BACKEND ESTÁ RODANDO)
const API_URL = "http://localhost:5163";

// Configuração da API (baseURL + /api)
export const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Função para validar erros
export const validationError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error("Detalhes do erro axios:", error.response?.status, error.response?.data);
  }
}