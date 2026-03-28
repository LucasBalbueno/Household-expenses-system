import type { InputProps } from '../../../../types/types';

export const InputMoney = ({ 
  label,
  type,
  placeholder, 
  register, 
  name,
  maxLength, 
  min, 
  max,
}: InputProps) => {
  const formatCurrency = (value: string) => {
    // Remove tudo que não for número
    const numbersOnly = value.replace(/\D/g, '');
    
    if (numbersOnly === '') return '';
    
    // Converte para número em reais (divide por 100)
    const number = parseFloat(numbersOnly) / 100;
    
    // Formata como moeda brasileira
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(number);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value);
    e.target.value = formattedValue;
    
    // Envia o valor numérico para o formulário
    const numbersOnly = e.target.value.replace(/\D/g, '');
    const numericValue = numbersOnly === '' ? 0 : parseFloat(numbersOnly) / 100;
    
    register(name).onChange({
      target: { name, value: numericValue }
    } as any);
  };

  return (
    <div>
      <label className="text-dark block mb-2">
        {label}
      </label>
      <input
        type={type}
        className={'w-full h-10 p-2 bg-background rounded-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/30'}
        placeholder={placeholder || 'R$ 0,00'}
        {...register(name)}
        onChange={handleInputChange}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    </div>
  );
};
