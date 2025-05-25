interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fullWidth?: boolean;
  labelClassName?: string;
  containerClassName?: string;
}

export const InputFieldForm: React.FC<InputProps> = ({ 
  fullWidth = false,
  label,
  id,
  labelClassName = '',
  containerClassName = '',
  ...props 
}) => (
  <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
    {label && (
      <label 
        htmlFor={id} 
        className={`text-sm font-medium text-gray-700 ${labelClassName}`}
      >
        {label}
      </label>
    )}
    <input 
      id={id}
      {...props}
      className={`
        border border-gray-200 rounded-lg
        px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-all
        ${props.className || ''}
      `}
    />
  </div>
);