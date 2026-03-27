import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { CategoryContextType } from '../types/categoryTypes';
import { useCategories } from '../hooks/useCategories';

// Cria o contexto com o contrato
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Provider que expõe os dados e funções
export function CategoryProvider({ children }: { children: ReactNode }) {
  // Usa o hook para buscar funções de categories
  const { categories, loading, error, fetchCategories, createCategory } = useCategories();

  return (
    <CategoryContext.Provider value={{
      categories,
      loading,
      error,
      fetchCategories,
      createCategory
    }}>
      {children}
    </CategoryContext.Provider>
  );
}

// Hook para usar o contexto
export function useCategoryContext() {
  // Verifica se o contexto foi fornecido corretamente
  const context = useContext(CategoryContext);

  // Se o contexto não for fornecido, ou seja, se tentar usar o hook fora de CategoryProvider, lança um erro
  if (context === undefined) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
}
