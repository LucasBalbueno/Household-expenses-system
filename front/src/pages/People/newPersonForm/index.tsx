import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { personSchema, type PersonFormData } from '../../../schemas/personSchema';
import { usePeopleContext } from '../../../contexts/PeopleContext';

export default function NewPersonForm() {
  const { createPerson, loading } = usePeopleContext();
  
  const {
    register,
    handleSubmit
  } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    mode: 'onSubmit'
  });

  const handleFormSubmit = async (data: PersonFormData) => {
    try {
      await createPerson({
        name: data.nome,
        age: Number(data.idade)
      });
      toast.success('Cadastro salvo com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar cadastro. Tente novamente.');
    }
  };

  const handleFormError = (errors: any) => {
    if (errors.nome) {
      toast.error(errors.nome.message);
    }
    if (errors.idade) {
      toast.error(errors.idade.message);
    }
  };

  return (
    <div className="bg-background flex items-center justify-center">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-dark">
              Nova Pessoa
            </h1>
            <p className="text-sm text-gray-600">Adicione um novo membro à sua família.</p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit, handleFormError)} className="space-y-6">
            <div>
              <label className="text-dark block mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                className="w-full h-10 p-2 bg-background rounded-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Digite seu nome completo"
                {...register('nome')}
                maxLength={200}
              />
            </div>

            <div>
              <label className="text-dark block mb-2">
                Idade
              </label>
              <input
                type="number"
                className="w-full h-10 p-2 bg-background rounded-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Digite sua idade"
                {...register('idade')}
                min="0"
                max="120"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-secondary text-white rounded-lg font-medium transition-all duration-200
                hover:bg-secondary/90 active:bg-secondary/95 focus:outline-none focus:ring-2 focus:ring-secondary/30 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar Cadastro'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}