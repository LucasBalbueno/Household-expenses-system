import { useReportContext } from "../../../contexts/ReportContext";
import { ByPersonItems } from "./byPersonItems";

export const ListByPeople = () => {
    const { reportsByPerson } = useReportContext();

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-xl font-bold text-dark">Resumo por Pessoa</h1>
                    <p className="text-dark/50 mt-1 text-md">Participação do orçamento familia</p>
                </div>

                <div className="flex justify-end gap-15">
                    <p className="font-semibold text-sm text-error text-right">Gastos</p>
                    <p className="font-semibold text-sm text-success text-right">Receitas</p>
                    <p className="font-semibold text-sm text-dark text-right">Saldo</p>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[25vh]">
                    {reportsByPerson?.people && reportsByPerson.people.length > 0 ? (
                        reportsByPerson.people.map((person) => (
                            <ByPersonItems key={person.personId} {...person} />
                        ))
                    ) : (
                        <p className="text-dark/50 text-center">Nenhuma pessoa cadastrada ainda</p>
                    )}
                </div>
            </div>
        </div>
    )
}