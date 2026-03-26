import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { usePeople } from '../hooks/usePeople';
import type { Person, PersonData } from '../types/peopleTypes';

// Contrato do contexto (tudo que o provider vai expor)
interface PeopleContextType {
  people: Person[];
  loading: boolean;
  error: string | null;
  fetchPeople: () => Promise<void>;
  createPerson: (person: PersonData) => Promise<void>;
  updatePerson: (id: number, person: PersonData) => Promise<void>;
  deletePerson: (id: number) => Promise<void>;
}

// Cria o contexto com o contrato
const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

// Provider que expõe os dados e funções
export function PeopleProvider({ children }: { children: ReactNode }) {
  // Usa o hook para buscar funções de people
  const { people, loading, error, fetchPeople, createPerson, updatePerson, deletePerson } = usePeople();

  return (
    <PeopleContext.Provider value={{
      people,
      loading,
      error,
      fetchPeople,
      createPerson,
      updatePerson,
      deletePerson
    }}>
      {children}
    </PeopleContext.Provider>
  );
}

// Hook para usar o contexto
export function usePeopleContext() {
  // Verifica se o contexto foi fornecido corretamente
  const context = useContext(PeopleContext);

  // Se o contexto não for fornecido, ou seja, se tentar usar o hook fora de PeopleProvider, lança um erro
  if (context === undefined) {
    throw new Error('usePeopleContext must be used within a PeopleProvider');
  }
  return context;
}
