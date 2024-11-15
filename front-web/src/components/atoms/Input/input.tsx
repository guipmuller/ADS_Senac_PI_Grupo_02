type InputProps = {
	classname: string;
	placeholder: string;
	type: string;
};

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
