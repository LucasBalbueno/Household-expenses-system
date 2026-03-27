import type { Category, CategoryData } from "../types/categoryTypes";
import { api, validationError } from "./api";
// import type { Person, PersonData } from "../types/peopleTypes";

export const categoryService = {
  // Serviço para buscar todas as categorias
  async getAll(): Promise<Category[]> {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },

  // Serviço para criar uma categoria
  async create(category: CategoryData): Promise<Category[]> {
    try {
      const response = await api.post("/categories", category);
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },
};