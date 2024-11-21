import React from 'react';
import { ButtonProps } from './types';

const Button = ({ classname, onclick, text, type }: ButtonProps) => {
	return (
		<button
			className={classname}
			onClick={onclick}
			type={type}
		>
			{text}
		</button>
	);
};

export default Button;
