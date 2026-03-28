import { api, validationError } from "./api";
import type { ReportByPerson, ReportByCategory } from "../types/reportTypes";

export const reportService = {
  // Serviço para buscar o total por pessoa
  async getTotalByPerson(): Promise<ReportByPerson> {
    try {
      const response = await api.get("/reports/get-total-by-person");
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },

  // Serviço para buscar o total por categoria
  async getTotalByCategory(): Promise<ReportByCategory> {
    try {
      const response = await api.get("/reports/get-total-by-category");
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },
};