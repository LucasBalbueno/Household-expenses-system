import type { PersonItemProps } from '../../../types/peopleTypes';
import { EditButton } from '../../../components/ui/buttons/editButton';
import { DeleteButton } from '../../../components/ui/buttons/deleteButton';

export default function PersonItem({ person, onEdit, onDelete }: PersonItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="min-w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
          {person.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="max-w-100 truncate font-medium text-dark">{person.name}</p>
          <p className="text-sm text-dark/40">
            {person.age} {person.age > 1 ? 'anos' : 'ano'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 ml-1">
        <EditButton onEdit={() => onEdit(person)}/>
        <DeleteButton onDelete={() => onDelete(person)} />
      </div>
    </div>
  );
}
