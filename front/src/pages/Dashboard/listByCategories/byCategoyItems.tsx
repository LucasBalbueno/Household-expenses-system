import type { ReportByCategoryItem } from "../../../types/reportTypes";
import { formatMoney } from "../../../utils/formatMoney";

export const ByCategoryItems = (category: ReportByCategoryItem) => {
    return (
        <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center space-x-3">
                <div className="min-w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
                {category.description.charAt(0).toUpperCase()}
                </div>
                <div>
                <p className="font-medium text-dark max-w-25 truncate">{category.description}</p>
                <p className="text-sm text-dark/60">{category.categoryPurpose}</p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <p className="font-semibold text-sm text-error">{formatMoney(category.totalExpenses)}</p>
                <p className="font-semibold text-sm text-success">{formatMoney(category.totalRevenues)}</p>
                <p className="font-semibold text-sm text-dark">{formatMoney(category.balance)}</p>
            </div>
        </div>
    )
}