import { RiRefreshLine } from 'react-icons/ri';
import { useState } from 'react';
import { usePeopleContext } from '../../../contexts/PeopleContext';
import { toast } from 'sonner';
import EditModal from '../EditModal';
import PersonItem from './PersonItem';
import type { PersonListProps, Person } from '../../../types/peopleTypes';

export default function PersonList(_: PersonListProps) {
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
    return(
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold">
          Carregando...
        </h2>
      </div>
    )
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-error">
            Erro ao carregar pessoas
          </h2>
          <button
            onClick={fetchPeople}
            className="p-2 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
            aria-label="Tentar novamente"
          >
            <RiRefreshLine size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-dark/60 tracking-wide">
            MEMBROS CADASTRADOS ({people.length})
          </h2>
          <button
            onClick={fetchPeople}
            className="p-2 text-dark hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Atualizar lista"
          >
            <RiRefreshLine size={20} />
          </button>
        </div>
        {people.length === 0 && <p className="text-dark/50 text-sm mb-4">Nenhuma pessoa cadastrada ainda.</p>}
        
        <div className="space-y-3 overflow-y-auto max-h-[60vh]">
          {people.map((person) => (
            <PersonItem
              key={person.id}
              person={person}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      
      <EditModal
        isOpen={isModalOpen}
        onClose={closeEditModal}
        person={editingPerson}
      />
    </>
  );
}
