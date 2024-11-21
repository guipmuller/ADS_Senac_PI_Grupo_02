import { InputProps } from './types';

const Input = ({ classname, placeholder, type }: InputProps) => {
	return (
		<div>
			<input
				type={type}
				placeholder={placeholder}
				className={classname}
			/>
		</div>
	);
};

export default Input;
