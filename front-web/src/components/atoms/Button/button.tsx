import React from 'react';
import { ButtonProps } from './types';

const Button = ({ 
	classname, 
	onclick, 
	text, 
	type,
	disabled = false,
	loading = false
 }: ButtonProps) => {
	 const disabledClasses = 'opacity-50 cursor-not-allowed';

	return (
		<button
			className={`${classname} ${disabled ? disabledClasses : ''}`}
			onClick={onclick}
			type={type}
			disabled={disabled}
			aria-disabled={disabled}
		>
			{loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin">↻</span>
          Processando...
        </span>
      ) : (
        text
      )}
		</button>
	);
};

export default Button;
