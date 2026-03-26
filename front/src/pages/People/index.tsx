import PersonForm from "./personForm"
import PersonList from "./PersonList"
import { PeopleProvider } from "../../contexts/PeopleContext"

export const People = () => {
    return(
        <PeopleProvider>
            <div className="bg-background p-6">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-dark">Pessoas</h1>
                </div>

                <div className="flex gap-8 w-full">
                    <div className="w-[30%]">
                        <PersonForm />
                    </div>
                    <div className="w-[70%]">
                        <PersonList />
                    </div>
                </div>
            </div>
        </PeopleProvider>
    )
}