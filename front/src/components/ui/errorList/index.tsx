import { RiRefreshLine } from "react-icons/ri"
import type { ErrorListProps } from "../../../types/types"

export const ErrorList = ({ objectName, onRefresh }: ErrorListProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-error">
                Erro ao carregar {objectName}
            </h2>
            <button
                onClick={onRefresh}
                className="p-2 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                aria-label="Tentar novamente"
            >
                <RiRefreshLine size={20} />
            </button>
            </div>
        </div>
    )
}