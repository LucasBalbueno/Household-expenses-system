import { toast } from 'sonner';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputForms } from '../../../components/ui/inputs/inputForms';
import { useCategoryContext } from "../../../contexts/CategoryContext";
import { SubmitButton } from '../../../components/ui/buttons/submitButton';
import type { CategoryData, CategoryFormProps } from "../../../types/categoryTypes";
import { categorySchema, type CategoryFormData } from '../../../schemas/categorySchema';
import { InputSelectSearch } from '../../../components/ui/inputs/inputSelectSearch';

// Opções de propósito
const purposeOptions = [
  { value: '1', label: 'Despesa' },
  { value: '2', label: 'Receita' },
  { value: '3', label: 'Ambas' }
];

export default function CategoryForm({ 
  initialValues
}: CategoryFormProps) {
  const { createCategory, loading } = useCategoryContext();
  
  // Hook do formulário
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    mode: 'onSubmit',
    defaultValues: {
      description: initialValues?.description || '',
      purpose: initialValues?.purpose
    }
  });

  // Efeito para popular o formulário com dados iniciais
  useEffect(() => {
    if (initialValues) {
      reset({
        description: initialValues.description || '',
        purpose: initialValues.purpose
      });
    }
  }, [initialValues, reset]);

  // Função para criar os dados da categoria
  const createCategoryData = (data: CategoryFormData): CategoryData => ({
    description: data.description,
    purpose: parseInt(data.purpose) as any
  });

  // Função para lidar com o envio do formulário
  const handleFormSubmit = async (data: CategoryFormData) => {
        try {
      await createCategory(createCategoryData(data));
      toast.success('Categoria criada com sucesso!');
      reset();
    } catch (error) {
      toast.error('Erro ao criar categoria. Tente novamente.');
    }
  };

  // Função para lidar com erros do formulário
  const handleFormError = (errors: any) => {
    if (errors.description) toast.error(errors.description.message);
    if (errors.purpose) toast.error(errors.purpose.message);
  };

  return (
    <div className="bg-background flex items-center justify-center min-w-0">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">

          <div className="mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-dark">
              Nova Categoria
            </h1>
            <p className="text-xs sm:text-sm text-dark">
              Adicione uma nova categoria.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit, handleFormError)} className="space-y-4 sm:space-y-6">
            <InputForms
              label="Descrição"
              type="text"
              placeholder="Digite a descrição da categoria"
              register={register}
              name="description"
              maxLength={400}
            />

            <InputSelectSearch
              label="Finalidade"
              placeholder="Selecione a finalidade"
              options={purposeOptions}
              register={register}
              name="purpose"
            />

            <SubmitButton
              loading={loading}
              isEditing={false}
              entityName="Categoria"
            />
          </form>
        </div>
      </div>
    </div>
  );
}