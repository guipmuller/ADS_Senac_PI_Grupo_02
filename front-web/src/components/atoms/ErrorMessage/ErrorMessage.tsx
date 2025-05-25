interface ErrorMessageProps {
  message: string;
  className?: string;
  icon?: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className = '',
  icon
}) => {
  return (
    <div className={`flex items-center text-red-600 font-medium ${className}`}>
      {icon && <span className="mr-2">{icon}</span>}
      <span>{message}</span>
    </div>
  );
};