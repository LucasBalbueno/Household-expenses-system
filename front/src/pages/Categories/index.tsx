import CategoryForm from "./categoryForm"
import CategoryList from "./categoryList"
import { CategoryProvider } from "../../contexts/CategoryContext"

export const Categories = () => {
    return(
        <CategoryProvider>
            <div className="bg-background p-6">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-dark">Categorias</h1>
                </div>

                <div className="flex gap-8 w-full">
                    <div className="w-[30%]">
                        <CategoryForm />
                    </div>
                    <div className="w-[70%]">
                        <CategoryList />
                    </div>
                </div>
            </div>
        </CategoryProvider>
    )
}