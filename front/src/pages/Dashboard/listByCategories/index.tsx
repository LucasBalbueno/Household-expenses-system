import { ByCategoryItems } from "./byCategoyItems";
import { useReportContext } from "../../../contexts/ReportContext";

export const ListByCategories = () => {
    // Contexto de relatórios
    const { reportsByCategory } = useReportContext();
    
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-dark">Gastos por Categoria</h1>
                    <p className="text-dark/50 mt-1 text-sm sm:text-md">Distribuição de gastos por categoria</p>
                </div>

                <div className="hidden sm:flex justify-end gap-8 sm:gap-12 lg:gap-15">
                    <p className="font-semibold text-xs sm:text-sm text-error text-right">Gastos</p>
                    <p className="font-semibold text-xs sm:text-sm text-success text-right">Receitas</p>
                    <p className="font-semibold text-xs sm:text-sm text-dark text-right">Saldo</p>
                </div>

                <div className="space-y-2 sm:space-y-3 overflow-y-auto max-h-[30vh] sm:max-h-[23vh]">
                    {reportsByCategory?.categories && reportsByCategory.categories.length > 0 ? (
                        reportsByCategory.categories.map((category) => (
                            <ByCategoryItems key={category.categoryId} {...category} />
                        ))
                    ) : (
                        <p className="text-dark/50 text-center text-sm sm:text-base">Nenhuma categoria cadastrada ainda</p>
                    )}
                </div>
            </div>
        </div>
    )
}