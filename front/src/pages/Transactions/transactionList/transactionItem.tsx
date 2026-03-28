import type { TransactionItemProps } from "../../../types/transactionTypes";

export default function TransactionItem({ transaction }: TransactionItemProps) {
    const categoryDescription = transaction.categoryDescription.charAt(0).toUpperCase() + transaction.categoryDescription.slice(1);
    const category = categoryDescription.length > 20 ? categoryDescription.substring(0, 20) + '...' : categoryDescription;
    const description = transaction.description.length > 20 ? transaction.description.substring(0, 20) + '...' : transaction.description;
    const personName = transaction.personName.length > 20 ? transaction.personName.substring(0, 20) + '...' : transaction.personName;
    
    const formatAmount = (amount: number) => {
        return `R$ ${amount.toFixed(2).replace('.', ',')}`;
    };

    return (
        <div className="flex items-center justify-between p-3 bg-background rounded-lg">
        <div className="flex items-center space-x-3">
            <div className="min-w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
            {transaction.description.charAt(0).toUpperCase()}
            </div>
            <div>
            <p className="font-medium text-dark">{description}</p>
            <p className="text-sm text-dark/60">
                {category}
            </p>
            </div>
        </div>

        <div className="flex items-center gap-8">
            
            <div className="flex items-center space-x-2">
            <p className="text-sm text-dark">{personName}</p>
            </div>

            <span className="px-3 py-1 text-xs font-medium text-dark bg-tertiary/30 rounded-full">
                {transaction.typeTransaction}
            </span>
            
            <p className={`font-semibold text-sm ${transaction.typeTransaction === 'Despesa' ? "text-error" : "text-success"}`}>
            {transaction.typeTransaction === 'Despesa' ? '- ' : '+ '}{formatAmount(transaction.amount)}
            </p>
        </div>
        </div>
    );
}
