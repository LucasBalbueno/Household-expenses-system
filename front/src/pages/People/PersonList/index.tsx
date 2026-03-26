import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

interface Person {
  id: number;
  nome: string;
  idade: number;
}

const mockPeople: Person[] = [
  { id: 1, nome: 'Ana Silva', idade: 28 },
  { id: 2, nome: 'Carlos Santos', idade: 35 },
  { id: 3, nome: 'Mariana Costa', idade: 22 },
  { id: 4, nome: 'Pedro Oliveira', idade: 41 }
];

export default function PersonList() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-dark">
        MEMBROS CADASTRADOS ({mockPeople.length})
      </h2>
      
      <div className="space-y-3">
        {mockPeople.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-medium">
                {person.nome.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-dark">{person.nome}</p>
                <p className="text-sm text-gray-600">{person.idade} anos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                className="p-2 text-gray-600 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                aria-label="Editar"
              >
                <RiEdit2Line size={16} />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
