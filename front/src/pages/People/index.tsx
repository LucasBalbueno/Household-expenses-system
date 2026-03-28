import PersonForm from "./personForm"
import PersonList from "./personList"
import { PeopleProvider } from "../../contexts/PeopleContext"

export const People = () => {
    return(
        <PeopleProvider>
            <div className="bg-background p-4 sm:p-6">
                <div className="mb-6 sm:mb-10">
                    <h1 className="text-xl sm:text-2xl font-bold text-dark">Pessoas</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
                    <div className="w-full lg:w-[30%]">
                        <PersonForm />
                    </div>
                    <div className="w-full lg:w-[70%]">
                        <PersonList />
                    </div>
                </div>
            </div>
        </PeopleProvider>
    )
}