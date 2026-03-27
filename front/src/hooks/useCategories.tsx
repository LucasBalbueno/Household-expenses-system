import { useState, useEffect, useCallback } from 'react';
import type { Category, CategoryData } from '../types/categoryTypes';
import { categoryService } from '../services/categoryService';

export function useCategories() {
  // Inicializa os estados com valores padrão
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca todas as categorias
  // UseCallback usa cache para evitar recriação desnecessária (re-renderizações)
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      setError("Não foi possível carregar as categorias");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cria uma nova categoria e atualiza a lista de categorias
  // UseCallback usa cache para evitar recriação desnecessária (re-renderizações)
  const createCategory = useCallback(async (category: CategoryData) => {
    try {
      await categoryService.create(category);
      await fetchCategories();
    } catch (error) {
      throw error;
    }
  }, [fetchCategories]);

  // Carrega as categorias quando o hook é inicializado
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Retorna os valores e funções
  return { categories, loading, error, fetchCategories, createCategory };
}
