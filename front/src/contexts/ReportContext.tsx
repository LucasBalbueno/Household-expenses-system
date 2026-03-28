import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { ReportContextType } from '../types/reportTypes';
import { useReports } from '../hooks/useReports';

// Cria o contexto com o contrato
const ReportContext = createContext<ReportContextType | undefined>(undefined);

// Provider que expõe os dados e funções
export function ReportProvider({ children }: { children: ReactNode }) {
  // Usa o hook para buscar funções de relatórios
  const { reportsByPerson, reportsByCategory, loading, error, fetchReportsByPerson, fetchReportsByCategory } = useReports();

  return (
    <ReportContext.Provider value={{
      reportsByPerson,
      reportsByCategory,
      loading,
      error,
      fetchReportsByPerson,
      fetchReportsByCategory
    }}>
      {children}
    </ReportContext.Provider>
  );
}

// Hook para usar o contexto
export function useReportContext() {
  // Verifica se o contexto foi fornecido corretamente
  const context = useContext(ReportContext);

  // Se o contexto não for fornecido, ou seja, se tentar usar o hook fora de ReportProvider, lança um erro
  if (context === undefined) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }
  return context;
}
