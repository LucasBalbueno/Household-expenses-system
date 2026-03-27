import { RiEdit2Line } from 'react-icons/ri';
import type { EditButtonProps } from '../../../../types/types';

export const EditButton = ({ onEdit }: EditButtonProps) => {
    return (
        <button
          onClick={onEdit}
          className="p-2 text-dark hover:text-tertiary hover:bg-tertiary/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Editar"
        >
          <RiEdit2Line size={16} />
        </button>
    )
}