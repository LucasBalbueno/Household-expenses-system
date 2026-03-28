import type { PersonItemProps } from '../../../types/peopleTypes';
import { EditButton } from '../../../components/ui/buttons/editButton';
import { DeleteButton } from '../../../components/ui/buttons/deleteButton';

export default function PersonItem({ person, onEdit, onDelete }: PersonItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-background rounded-lg gap-3 min-w-0">
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div className="min-w-8 h-8 sm:min-w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm shrink-0">
          {person.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-dark text-sm sm:text-base">{person.name}</p>
          <p className="text-xs sm:text-sm text-dark/40">
            {person.age} {person.age > 1 ? 'anos' : 'ano'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 sm:ml-1 sm:text-center shrink-0">
        <EditButton onEdit={() => onEdit(person)}/>
        <DeleteButton onDelete={() => onDelete(person)} />
      </div>
    </div>
  );
}
