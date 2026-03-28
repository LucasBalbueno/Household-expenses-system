import { useState, useEffect, useCallback } from 'react';
import type { ReportByPerson, ReportByCategory } from '../types/reportTypes';
import { reportService } from '../services/reportService';

export function useReports() {
  const [reportsByPerson, setReportsByPerson] = useState<ReportByPerson | null>(null);
  const [reportsByCategory, setReportsByCategory] = useState<ReportByCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca total por pessoa
  // UseCallback usa cache para evitar recriação desnecessária (re-renderizações)
  const fetchReportsByPerson = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportService.getTotalByPerson();
      setReportsByPerson(data);
    } catch (error) {
      setError("Não foi possível carregar os relatórios por pessoa");
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca total por categoria
  // UseCallback usa cache para evitar recriação desnecessária (re-renderizações)
  const fetchReportsByCategory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportService.getTotalByCategory();
      setReportsByCategory(data);
    } catch (error) {
      setError("Não foi possível carregar os relatórios por categoria");
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega os relatórios quando o hook é inicializado
  useEffect(() => {
    fetchReportsByPerson();
    fetchReportsByCategory();
  }, [fetchReportsByPerson, fetchReportsByCategory]);

  // Retorna os valores e funções
  return { reportsByPerson, reportsByCategory, loading, error, fetchReportsByPerson, fetchReportsByCategory };
}
