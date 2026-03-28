import { useReportContext } from "../../../contexts/ReportContext";
import { ByPersonItems } from "./byPersonItems";

export const ListByPeople = () => {
    // Contexto de relatórios
    const { reportsByPerson } = useReportContext();

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-lg sm:text-xl font-bold text-dark">Resumo por Pessoa</h1>
                    <p className="text-dark/50 mt-1 text-sm sm:text-md">Participação do orçamento familia</p>
                </div>

                <div className="hidden sm:flex justify-end gap-8 sm:gap-12 lg:gap-15">
                    <p className="font-semibold text-xs sm:text-sm text-error text-right">Gastos</p>
                    <p className="font-semibold text-xs sm:text-sm text-success text-right">Receitas</p>
                    <p className="font-semibold text-xs sm:text-sm text-dark text-right">Saldo</p>
                </div>

                <div className="space-y-2 sm:space-y-3 overflow-y-auto max-h-[30vh] sm:max-h-[23vh]">
                    {reportsByPerson?.people && reportsByPerson.people.length > 0 ? (
                        reportsByPerson.people.map((person) => (
                            <ByPersonItems key={person.personId} {...person} />
                        ))
                    ) : (
                        <p className="text-dark/50 text-center text-sm sm:text-base">Nenhuma pessoa cadastrada ainda</p>
                    )}
                </div>
            </div>
        </div>
    )
}