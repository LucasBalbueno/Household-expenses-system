import { RiRefreshLine } from "react-icons/ri";
import type { ReactNode } from "react";

interface GenericListProps<T> {
    objectNameSingular: string;
    objectNamePlural: string;
    object: T[];
    onRefresh: () => Promise<void>;
    children: ReactNode;
}

export const GenericList = <T,>({ objectNameSingular, objectNamePlural, object, onRefresh, children }: GenericListProps<T>) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-dark/60 tracking-wide">
                    {objectNamePlural.toUpperCase()} CADASTRADAS ({object.length})
                  </h2>
                  <button
                    onClick={onRefresh}
                    className="p-2 text-dark hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer"
                    aria-label="Atualizar lista"
                  >
                    <RiRefreshLine size={20} />
                  </button>
                </div>
                {object.length === 0 && <p className="text-dark/50 text-sm mb-4">Nenhuma {objectNameSingular} cadastrada ainda.</p>}
                
                <div className="space-y-3 overflow-y-auto max-h-[60vh]">
                  {children}
                </div>
            </div>
        </>
    )
}