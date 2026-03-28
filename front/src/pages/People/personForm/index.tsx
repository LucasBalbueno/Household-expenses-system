import { toast } from 'sonner';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PersonFormProps, PersonData } from '../../../types/peopleTypes';
import { personSchema, type PersonFormData } from '../../../schemas/personSchema';
import { InputForms } from '../../../components/ui/inputs/inputForms';
import { SubmitButton } from '../../../components/ui/buttons/submitButton';
import { usePeopleContext } from '../../../contexts/PeopleContext';

export default function PersonForm({ 
  initialValues, 
  isEditing = false, 
  personId, 
  onSuccess 
}: PersonFormProps) {
  // Contexto de pessoas
  const { createPerson, updatePerson, loading } = usePeopleContext();
  
  // Hook do formulário
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    mode: 'onSubmit',
    defaultValues: {
      nome: initialValues?.name || '',
      idade: initialValues?.age?.toString() || ''
    }
  });

  // Efeito para popular o formulário com dados iniciais
  useEffect(() => {
    if (initialValues) {
      reset({
        nome: initialValues.name || '',
        idade: initialValues.age?.toString() || ''
      });
    }
  }, [initialValues, reset]);

  // Função para criar dados de pessoa
  const createPersonData = (data: PersonFormData): PersonData => ({
    name: data.nome,
    age: Number(data.idade)
  });

  // Função para criar pessoa
  const handleCreateSubmit = async (data: PersonFormData) => {
    try {
      await createPerson(createPersonData(data));
      toast.success('Pessoa criada com sucesso!');
      reset();
    } catch (error) {
      toast.error('Erro ao criar pessoa. Tente novamente.');
    }
  };

  // Função para atualizar pessoa
  const handleEditSubmit = async (data: PersonFormData) => {
    if (!personId) return;
    
    try {
      await updatePerson(personId, createPersonData(data));
      toast.success('Pessoa atualizada com sucesso!');
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao atualizar pessoa. Tente novamente.');
    }
  };

  // Função para lidar com o envio do formulário
  const handleFormSubmit = async (data: PersonFormData) => {
    if (isEditing) {
      await handleEditSubmit(data);
    } else {
      await handleCreateSubmit(data);
    }
  };

  // Função para lidar com erros do formulário
  const handleFormError = (errors: any) => {
    if (errors.nome) toast.error(errors.nome.message);
    if (errors.idade) toast.error(errors.idade.message);
  };

  return (
    <div className="bg-background flex items-center justify-center min-w-0">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">

          <div className="mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-dark">
              {isEditing ? 'Editar Pessoa' : 'Nova Pessoa'}
            </h1>
            <p className="text-xs sm:text-sm text-dark">
              {isEditing ? 'Edite os dados da pessoa.' : 'Adicione um novo membro à sua família.'}
            </p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit, handleFormError)} className="space-y-4 sm:space-y-6">
            <InputForms
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome completo"
              register={register}
              name="nome"
              maxLength={200}
            />

            <InputForms
              label="Idade"
              type="number"
              placeholder="Digite sua idade"
              register={register}
              name="idade"
            />

            <SubmitButton
              loading={loading}
              isEditing={isEditing}
              entityName="Pessoa"
            />
          </form>
        </div>
      </div>
    </div>
  );
}