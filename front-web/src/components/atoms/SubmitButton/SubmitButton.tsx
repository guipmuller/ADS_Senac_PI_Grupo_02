interface SubmitButtonProps {
  isEditing?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  isEditing = false, 
  isLoading = false,
  className = ''
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`py-2 px-4 rounded text-white ${
        isLoading ? 'bg-gray-400' : 'bg-lime-800 hover:bg-lime-700'
      } transition-colors ${className}`}
    >
      {isLoading ? (
        <span>Processando...</span>
      ) : isEditing ? (
        <span>Atualizar</span>
      ) : (
        <span>Enviar</span>
      )}
    </button>
  );
};