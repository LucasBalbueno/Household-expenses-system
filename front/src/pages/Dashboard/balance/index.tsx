import { FiTrendingUp, FiTrendingDown, FiDollarSign } from "react-icons/fi";
import { useReportContext } from "../../../contexts/ReportContext";
import { formatMoney } from "../../../utils/formatMoney";

export const Balance = () => {
    const { reportsByPerson } = useReportContext();
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border-l-4 border-success">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-bold text-dark font-headline tracking-wider">RECEITAS TOTAIS</h3>
                    <FiTrendingUp className="text-success" size={16} />
                </div>
                <div className="mb-2">
                    <p className="text-xl sm:text-3xl font-bold text-dark">{formatMoney(reportsByPerson?.totalGeneralRevenues || 0)}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border-l-4 border-error">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-bold text-dark font-headline tracking-wider">DESPESAS TOTAIS</h3>
                    <FiTrendingDown className="text-tertiary" size={16} />
                </div>
                <div className="mb-2">
                    <p className="text-xl sm:text-3xl font-bold text-dark">{formatMoney(reportsByPerson?.totalGeneralExpenses || 0)}</p>
                </div>
            </div>

            <div className="bg-primary rounded-lg shadow-sm p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-bold text-white font-headline tracking-wider">SALDO GERAL LÍQUIDO</h3>
                    <FiDollarSign className="text-secondary" size={16} />
                </div>
                <div className="mb-4">
                    <p className="text-xl sm:text-3xl font-bold text-secondary">{formatMoney(reportsByPerson?.totalGeneralBalance || 0)}</p>
                </div>
            </div>
        </div>
    )
}