import Input from '@/components/atoms/Input/input';
import Label from '@/components/atoms/Label/label';
import { FormProps } from './types';

const Form = ({ inputArray }: FormProps) => {
	return (
		<form className="space-y-4">
			{inputArray.map((field, index) => (
				<div key={index}>
					<Label {...field.label} />
					<Input {...field.input} />
				</div>
			))}
		</form>
	);
};

export default Form;
