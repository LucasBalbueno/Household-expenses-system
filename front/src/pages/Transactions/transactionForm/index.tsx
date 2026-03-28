import { toast } from 'sonner';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputForms } from '../../../components/ui/inputs/inputForms';
import { InputMoney } from '../../../components/ui/inputs/inputMoney';
import { InputSelectSearch } from '../../../components/ui/inputs/inputSelectSearch';
import { usePeopleContext } from "../../../contexts/PeopleContext";
import { useCategoryContext } from "../../../contexts/CategoryContext";
import { SubmitButton } from '../../../components/ui/buttons/submitButton';
import { useTransactionContext } from "../../../contexts/TransactionContext";
import { TypeTransaction, type TransactionData, type TransactionFormProps } from "../../../types/transactionTypes";
import { transactionSchema, type TransactionFormData, type TransactionFormInput } from '../../../schemas/transactionSchema';

const typeOptions = [
  { value: '1', label: 'Despesa' },
  { value: '2', label: 'Receita' }
];

export default function TransactionForm({ 
  initialValues
}: TransactionFormProps) {
  const { createTransaction, loading } = useTransactionContext();
  const { categories, fetchCategories } = useCategoryContext();
  const { people, fetchPeople } = usePeopleContext();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<TransactionFormInput, any, TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    mode: 'onSubmit',
    defaultValues: {
      description: initialValues?.description || '',
      amount: initialValues?.amount !== undefined ? initialValues.amount : 0,
      typeTransaction: initialValues?.typeTransaction === TypeTransaction.DESPESA ? '1' : '2',
      categoryId: '',
      personId: ''
    }
  });

  useEffect(() => {
    fetchCategories();
    fetchPeople();
  }, [fetchCategories, fetchPeople]);

  useEffect(() => {
    if (initialValues) {
      reset({
        description: initialValues.description || '',
        amount: initialValues.amount !== undefined ? initialValues.amount : 0,
        typeTransaction: initialValues.typeTransaction === TypeTransaction.DESPESA ? '1' : '2',
        categoryId: '',
        personId: ''
      });
    }
  }, [initialValues, reset]);

  const categoryOptions = categories.map(category => ({
    value: String(category.id),
    label: category.description
  }));

  const personOptions = people.map(person => ({
    value: String(person.id),
    label: person.name
  }));

  const createTransactionData = (data: TransactionFormData): TransactionData => ({
    description: data.description,
    amount: data.amount,
    typeTransaction: parseInt(data.typeTransaction),
    categoryId: data.categoryId,
    personId: data.personId
  });

  const handleFormSubmit = async (data: TransactionFormData) => {
    try {
      await createTransaction(createTransactionData(data));
      toast.success('Transação criada com sucesso!');
      reset();
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erro ao criar transação. Verifique os dados e tente novamente.');
      }
    }
  };

  const handleFormError = (errors: any) => {
    if (errors.description) toast.error(errors.description.message);
    if (errors.amount) toast.error(errors.amount.message);
    if (errors.typeTransaction) toast.error(errors.typeTransaction.message);
    if (errors.categoryId) toast.error(errors.categoryId.message);
    if (errors.personId) toast.error(errors.personId.message);
  };

  return (
    <div className="bg-background flex items-center justify-center">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-dark">
              Nova Transação
            </h1>
            <p className="text-sm text-dark">
              Adicione uma nova transação.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit, handleFormError)} className="space-y-6 overflow-y-auto max-h-[55vh]">
            <InputForms
              label="Descrição"
              type="text"
              placeholder="Digite a descrição da transação"
              register={register}
              name="description"
              maxLength={400}
            />

            <InputMoney
              label="Valor"
              type="text"
              placeholder="R$ 0,00"
              register={register}
              name="amount"
              max={99999999}
            />

            <InputSelectSearch
              label="Tipo de Transação"
              placeholder="Selecione o tipo"
              options={typeOptions}
              register={register}
              name="typeTransaction"
            />

            <InputSelectSearch
              label="Categoria"
              placeholder="Selecione a categoria"
              options={categoryOptions}
              register={register}
              name="categoryId"
            />

            <InputSelectSearch
              label="Pessoa"
              placeholder="Selecione a pessoa"
              options={personOptions}
              register={register}
              name="personId"
            />

            <SubmitButton
              loading={loading}
              isEditing={!!initialValues}
              entityName="Transação"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
