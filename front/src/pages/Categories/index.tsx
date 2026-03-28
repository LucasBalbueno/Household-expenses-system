import CategoryForm from "./categoryForm"
import CategoryList from "./categoryList"
import { CategoryProvider } from "../../contexts/CategoryContext"

export const Categories = () => {
    return(
        <CategoryProvider>
            <div className="bg-background p-4 sm:p-6">
                <div className="mb-6 sm:mb-10">
                    <h1 className="text-xl sm:text-2xl font-bold text-dark">Categorias</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
                    <div className="w-full lg:w-[30%]">
                        <CategoryForm />
                    </div>
                    <div className="w-full lg:w-[70%]">
                        <CategoryList />
                    </div>
                </div>
            </div>
        </CategoryProvider>
    )
}