import type { ReportByCategoryItem } from "../../../types/reportTypes";
import { formatMoney } from "../../../utils/formatMoney";

export const ByCategoryItems = (category: ReportByCategoryItem) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-background rounded-lg gap-3">
            <div className="flex items-center space-x-3">
                <div className="min-w-8 h-8 sm:min-w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm">
                {category.description.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                <p className="font-medium text-dark text-sm sm:text-base max-w-25 truncate">{category.description}</p>
                <p className="text-xs sm:text-sm text-dark/60 hidden sm:block">{category.categoryPurpose}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-8">
                <div className="flex items-center justify-between sm:block">
                    <span className="text-xs text-dark/60 sm:hidden">Gastos:</span>
                    <p className="font-semibold text-xs sm:text-sm text-error">{formatMoney(category.totalExpenses)}</p>
                </div>
                <div className="flex items-center justify-between sm:block">
                    <span className="text-xs text-dark/60 sm:hidden">Receitas:</span>
                    <p className="font-semibold text-xs sm:text-sm text-success">{formatMoney(category.totalRevenues)}</p>
                </div>
                <div className="flex items-center justify-between sm:block">
                    <span className="text-xs text-dark/60 sm:hidden">Saldo:</span>
                    <p className="font-semibold text-xs sm:text-sm text-dark">{formatMoney(category.balance)}</p>
                </div>
            </div>
        </div>
    )
}