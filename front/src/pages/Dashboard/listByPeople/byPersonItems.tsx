import type { ReportByPersonItem } from "../../../types/reportTypes";
import { formatMoney } from "../../../utils/formatMoney";

export const ByPersonItems = (person: ReportByPersonItem) => {
    return (
        <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center space-x-3">
                <div className="min-w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
                {person.name.charAt(0).toUpperCase()}
                </div>
                <div>
                <p className="font-medium text-dark max-w-25 truncate">{person.name}</p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <p className="font-semibold text-sm text-error">{formatMoney(person.totalExpenses)}</p>
                <p className="font-semibold text-sm text-success">{formatMoney(person.totalRevenues)}</p>
                <p className="font-semibold text-sm text-dark">{formatMoney(person.balance)}</p>
            </div>
        </div>
    )
}