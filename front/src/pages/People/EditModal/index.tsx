import PersonForm from '../personForm';
import type { EditModalProps } from '../../../types/peopleTypes';

export default function EditModal({ isOpen, onClose, person }: EditModalProps) {
  if (!isOpen || !person) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="p-6 w-[30vw]">
          <PersonForm
            initialValues={person}
            isEditing={true}
            personId={person.id}
            onSuccess={onClose}
          />
        </div>
    </div>
  );
}
