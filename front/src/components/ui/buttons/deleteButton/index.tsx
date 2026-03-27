import { RiDeleteBinLine } from "react-icons/ri"
import type { DeleteButtonProps } from "../../../../types/types"


export const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
    return (
        <button
          onClick={onDelete}
          className="p-2 text-dark hover:text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Excluir"          
        >
          <RiDeleteBinLine size={16} />
        </button>
    )
}