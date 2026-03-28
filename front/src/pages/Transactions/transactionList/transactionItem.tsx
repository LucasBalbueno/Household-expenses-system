import type { TransactionItemProps } from "../../../types/transactionTypes";
import { formatMoney } from "../../../utils/formatMoney";

export default function TransactionItem({ transaction }: TransactionItemProps) {
    const categoryDescription = transaction.categoryDescription.charAt(0).toUpperCase() + transaction.categoryDescription.slice(1);
    const category = categoryDescription.length > 20 ? categoryDescription.substring(0, 20) + '...' : categoryDescription;
    const description = transaction.description.length > 20 ? transaction.description.substring(0, 20) + '...' : transaction.description;
    const personName = transaction.personName.length > 20 ? transaction.personName.substring(0, 20) + '...' : transaction.personName;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-background rounded-lg gap-3 min-w-0">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="min-w-8 h-8 sm:min-w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm shrink-0">
                {transaction.description.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-medium text-dark text-sm sm:text-base truncate">{description}</p>
                    <p className="text-xs sm:text-sm text-dark/60">{category}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-8 min-w-0">
                <div className="flex items-center justify-between sm:block min-w-0">
                    <span className="text-xs text-dark/60 sm:hidden shrink-0">Pessoa:</span>
                    <p className="text-xs sm:text-sm text-dark truncate">{personName}</p>
                </div>

                <div className="flex items-center justify-between sm:block min-w-0">
                    <span className="text-xs text-dark/60 sm:hidden shrink-0">Tipo:</span>
                    <span className="px-2 sm:px-3 py-1 text-xs font-medium text-dark bg-tertiary/30 rounded-full whitespace-nowrap">
                        {transaction.typeTransaction}
                    </span>
                </div>
                
                <div className="flex items-center justify-between sm:block min-w-0">
                    <span className="text-xs text-dark/60 sm:hidden shrink-0">Valor:</span>
                    <p className={`font-semibold text-xs sm:text-sm ${transaction.typeTransaction === 'Despesa' ? "text-error" : "text-success"}`}>
                    {transaction.typeTransaction === 'Despesa' ? '- ' : '+ '}{formatMoney(transaction.amount)}
                    </p>
                </div>
            </div>
        </div>
    );
}
