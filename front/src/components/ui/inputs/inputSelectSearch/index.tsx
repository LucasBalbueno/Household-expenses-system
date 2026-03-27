import type { SelectInputProps } from '../../../../types/types';

export const InputSelectSearch = ({ 
  label, 
  placeholder, 
  options,
  register,
  name,
}: SelectInputProps) => {
  return (
    <div>
      <label className="text-dark block mb-2">
        {label}
      </label>
      <select
        className="w-full h-10 p-2 bg-background rounded-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/30"
        {...(register && name ? register(name) : {})}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};