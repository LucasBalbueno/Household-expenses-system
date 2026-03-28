import { toast } from 'sonner';
import { useState } from 'react';
import PersonItem from './personItem';
import PersonForm from '../personForm';
import { usePeopleContext } from '../../../contexts/PeopleContext';
import EditModal from '../../../components/ui/editModal';
import { ErrorList } from '../../../components/ui/errorList';
import { LoadingList } from '../../../components/ui/loadingList';
import { GenericList } from '../../../components/ui/genericList';
import type { Person } from '../../../types/peopleTypes';
import type { ListProps } from '../../../types/types';

export default function PersonList(_: ListProps) {
  const { people, loading, error, fetchPeople, deletePerson } = usePeopleContext();
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModal = (person: Person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingPerson(null);
  };

  const handleDelete = async (person: Person) => {
    try {
      await deletePerson(person.id);
      toast.success('Pessoa excluída com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir pessoa. Tente novamente.');
    }
  };

  if (loading) {
    return <LoadingList />;
  }

  if (error) {
    return <ErrorList objectName="pessoas" onRefresh={fetchPeople} />;
  }

  return (
    <>
      <GenericList
        objectNameSingular='pessoa'
        objectNamePlural='pessoas'
        object={people}
        onRefresh={fetchPeople}
      >
        {people.map((person) => (
          <PersonItem
            key={person.id}
            person={person}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ))}
      </GenericList>
      
      <EditModal isOpen={isModalOpen} onClose={closeEditModal}>
        <PersonForm
          initialValues={editingPerson || undefined}
          isEditing={true}
          personId={editingPerson?.id}
          onSuccess={closeEditModal}
        />
      </EditModal>
    </>
  );
}
