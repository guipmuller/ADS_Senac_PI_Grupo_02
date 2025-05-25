import Input from '@/components/atoms/Input/input';
import Label from '@/components/atoms/Label/label';
import { FormProps } from './types';

const Form = ({ inputArray, onChange, className = '' }: FormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {inputArray.map((field, index) => {
        const inputId = field.input.id || `input-${index}`;
        
        return (
          <div key={inputId}>
            <Label 
              {...field.label} 
              htmlFor={inputId}
            />
            <Input
              {...field.input}
              id={inputId}
              name={field.input.name || inputId}
              onChange={handleInputChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Form;