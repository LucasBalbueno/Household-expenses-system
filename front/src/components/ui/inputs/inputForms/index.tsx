import type { InputProps } from '../../../../types/types';

export const InputForms = ({ 
  label, 
  type, 
  placeholder, 
  register, 
  name,
  maxLength, 
  min, 
  max 
}: InputProps) => {
  return (
    <div>
      <label className="text-dark block mb-2">
        {label}
      </label>
      <input
        type={type}
        className={'w-full h-10 p-2 bg-background rounded-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/30'}
        placeholder={placeholder}
        {...register(name)}
        maxLength={maxLength}
        min={min}
        max={max}
      />
    </div>
  );
};