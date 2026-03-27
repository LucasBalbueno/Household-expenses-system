
import { api, validationError } from "./api";
import type { Person, PersonData } from "../types/peopleTypes";

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
  async create(person: PersonData): Promise<Person[]> {
    try {
      const response = await api.post("/people", person);
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },

  // Serviço para atualizar uma pessoa
  async update(id: number, person: PersonData): Promise<Person[]> {
    try {
      const response = await api.put(`/people/${id}`, person);
      return response.data;
    } catch (error) {
      validationError(error);
      throw error;
    }
  },

  // Serviço para deletar uma pessoa
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/people/${id}`);
    } catch (error) {
      validationError(error);
      throw error;
    }
  }
};