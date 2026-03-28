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
                    <div className="bg-background p-4 sm:p-6">
                        <div className="mb-6 sm:mb-10">
                            <h1 className="text-xl sm:text-2xl font-bold text-dark">Transações</h1>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
                            <div className="w-full lg:w-[30%]">
                                <TransactionForm />
                            </div>
                            <div className="w-full lg:w-[70%]">
                                <TransactionList />
                            </div>
                        </div>
                    </div>
                </PeopleProvider>
            </CategoryProvider>
        </TransactionProvider>
    )
}