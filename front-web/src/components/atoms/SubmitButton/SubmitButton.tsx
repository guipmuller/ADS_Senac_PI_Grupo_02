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
        isLoading ? 'bg-gray-400' : 'bg-[#348a89] hover:bg-[#2c7472]'
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