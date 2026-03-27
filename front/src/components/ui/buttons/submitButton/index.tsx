import type { SubmitButtonProps } from "../../../../types/types";

export const SubmitButton = ({ loading, isEditing, entityName }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full h-12 bg-secondary text-white rounded-lg font-medium transition-all duration-200
        hover:bg-secondary/90 active:bg-secondary/95 focus:outline-none focus:ring-2 focus:ring-secondary/30 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading 
        ? (isEditing ? 'Atualizando...' : 'Criando...') 
        : (isEditing ? `Atualizar ${entityName}` : `Criar ${entityName}`)
      }
    </button>
  );
};
