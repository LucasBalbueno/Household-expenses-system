import { FiCalendar } from "react-icons/fi";
import { Balance } from "./balance";
import { ListByCategories } from "./listByCategories";
import { ListByPeople } from "./listByPeople";
import { ReportProvider } from "../../contexts/ReportContext";

export const Dashboard = () => {
    const date = new Date();
    return(
        <ReportProvider>
            <div className="bg-backgrounf p-6 pb-0">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-dark">Painel de Controle</h1>
                        <p className="text-dark mt-1">Bem-vindo de volta.</p>
                    </div>
                            
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-dark/5 px-4 py-2 rounded-lg border border-dark/10">
                            <FiCalendar className="text-dark" size={18} />
                            <span className="text-dark font-medium">{date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            
                <Balance />
            
                <div className="flex gap-8 w-full">
                    <div className="w-[50%]">
                        <ListByCategories />
                    </div>
                    <div className="w-[50%]">
                        <ListByPeople />
                    </div>
                </div>
            </div>
        </ReportProvider>
    )
}