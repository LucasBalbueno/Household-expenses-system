export type ReportByPerson = {
    people: ReportByPersonItem[],
    totalGeneralRevenues: number,
    totalGeneralExpenses: number,
    totalGeneralBalance: number,
};

export type ReportByPersonItem = {
    personId: string;
    name: string;
    totalRevenues: number;
    totalExpenses: number;
    balance: number;
}

export type ReportByCategory = {
    categories: ReportByCategoryItem[],
    totalGeneralRevenues: number,
    totalGeneralExpenses: number,
    totalGeneralBalance: number,
};

export type ReportByCategoryItem = {
    categoryId: string;
    description: string;
    categoryPurpose: string;
    totalRevenues: number;
    totalExpenses: number;
    balance: number;
}

export type ReportContextType = {
  reportsByPerson: ReportByPerson | null;
  reportsByCategory: ReportByCategory | null;
  loading: boolean;
  error: string | null;
  fetchReportsByPerson: () => Promise<void>;
  fetchReportsByCategory: () => Promise<void>;
}