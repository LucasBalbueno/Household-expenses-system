import { RiEdit2Line, RiDeleteBinLine, RiRefreshLine } from 'react-icons/ri';
import { usePeopleContext } from '../../../contexts/PeopleContext';

export default function PersonList() {
  const { people, loading, error, fetchPeople } = usePeopleContext();

  const onEdit = (person: any) => {
    console.log(person.id);
  };

  const onDelete = (person: any) => {
    console.log(person.id);
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
          <div
            key={person.name}
            className="flex items-center justify-between p-3 bg-background rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
                {person.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-dark">{person.name}</p>
                {person.age > 1 ? (
                  <p className="text-sm text-dark">{person.age} anos</p>
                ) : (
                  <p className="text-sm text-dark">{person.age} ano</p>
                )}
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
        ))}
      </div>
    </div>
  );
}
