import { CategoryProvider } from "../../contexts/CategoryContext"
import { PeopleProvider } from "../../contexts/PeopleContext"
import { TransactionProvider } from "../../contexts/TransactionContext"
import TransactionForm from "./transactionForm"
import TransactionList from "./transactionList"

export const Transactions = () => {
    return(
        <TransactionProvider>
            <CategoryProvider>
                <PeopleProvider>                
                    <div className="bg-background p-6">
                        <div className="mb-10">
                            <h1 className="text-2xl font-bold text-dark">Transações</h1>
                        </div>

                        <div className="flex gap-8 w-full">
                            <div className="w-[30%]">
                                <TransactionForm />
                            </div>
                            <div className="w-[70%]">
                                <TransactionList />
                            </div>
                        </div>
                    </div>
                </PeopleProvider>
            </CategoryProvider>
        </TransactionProvider>
    )
}