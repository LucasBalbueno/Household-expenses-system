import { LoadingList } from '../../../components/ui/loadingList';
import { ErrorList } from '../../../components/ui/errorList';
import { GenericList } from '../../../components/ui/genericList';
import TransactionItem from './transactionItem';
import { useTransactionContext } from '../../../contexts/TransactionContext';
import type { ListProps } from '../../../types/types';

export default function TransactionList(_: ListProps) {
  // Hook do contexto de transações
  const { transactions, loading, error, fetchTransactions } = useTransactionContext();

  // Verificar se está carregando
  if (loading) {
    return <LoadingList />;
  }

  // Verificar se houve erro
  if (error) {
    return <ErrorList objectName="transações" onRefresh={fetchTransactions} />;
  }

  return (
    <>
      <GenericList
        objectNameSingular='transação'
        objectNamePlural='transações'
        object={transactions}
        onRefresh={fetchTransactions}
      >
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </GenericList>
    </>
  );
}
