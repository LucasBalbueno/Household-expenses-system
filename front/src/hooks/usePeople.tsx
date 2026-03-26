import { useState, useEffect, useCallback } from 'react';
import { personService } from '../services/personService';
import type { Person } from '../types/personType';

export function usePeople() {
  // Inicializa os estados com valores padrão
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca todas as pessoas
  // UseCallback usa cache para evitar recriação desnecessária (re-renderizações)
  const fetchPeople = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await personService.getAll();
      setPeople(data);
    } catch (error) {
      setError("Não foi possível carregar as pessoas");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cria uma nova pessoa e atualiza a lista de pessoas
  // UseCallback usa cache para evitar recriação desnecessária (re-renderizações)
  const createPerson = useCallback(async (person: Person) => {
    try {
      await personService.create(person);
      await fetchPeople();
    } catch (error) {
      throw error;
    }
  }, [fetchPeople]);

  // Carrega as pessoas quando o hook é inicializado
  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  // Retorna os valores e funções
  return { people, loading, error, fetchPeople, createPerson };
}
