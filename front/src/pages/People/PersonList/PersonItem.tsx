import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import type { PersonItemProps } from '../../../types/peopleTypes';

export default function PersonItem({ person, onEdit, onDelete }: PersonItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
          {person.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-dark">{person.name}</p>
          <p className="text-sm text-dark">
            {person.age} {person.age > 1 ? 'anos' : 'ano'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(person)}
          className="p-2 text-dark hover:text-tertiary hover:bg-tertiary/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Editar"
        >
          <RiEdit2Line size={16} />
        </button>
        <button
          onClick={() => onDelete(person)}
          className="p-2 text-dark hover:text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Excluir"          
        >
          <RiDeleteBinLine size={16} />
        </button>
      </div>
    </div>
  );
}
