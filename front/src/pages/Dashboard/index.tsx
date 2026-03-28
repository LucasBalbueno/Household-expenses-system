import { FiCalendar } from "react-icons/fi";
import { Balance } from "./balance";
import { ListByCategories } from "./listByCategories";
import { ListByPeople } from "./listByPeople";
import { ReportProvider } from "../../contexts/ReportContext";

export const Dashboard = () => {
    const date = new Date();
    return(
        <ReportProvider>
            <div className="bg-backgrounf p-4 sm:p-6 pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-10 gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-dark">Painel de Controle</h1>
                        <p className="text-dark mt-1 text-sm sm:text-base">Bem-vindo de volta</p>
                    </div>
                            
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-dark/5 px-3 sm:px-4 py-2 rounded-lg border border-dark/10">
                            <FiCalendar className="text-dark" size={16} />
                            <span className="text-dark font-medium text-sm sm:text-base">
                                {date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>
            
                <Balance />
            
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
                    <div className="w-full lg:w-[50%]">
                        <ListByCategories />
                    </div>
                    <div className="w-full lg:w-[50%]">
                        <ListByPeople />
                    </div>
                </div>
            </div>
        </ReportProvider>
    )
}