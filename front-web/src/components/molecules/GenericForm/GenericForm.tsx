import Input from '@/components/atoms/Input/input';
import { useData } from './data';
import Label from '../atoms/label/label';

const Form = () => {
	const { clientInputData } = useData();
	return (
		<form className="space-y-4">
			{clientInputData.map((luks, index) => (
				<>
					<Label />
					<Input
						key={index}
						{...luks}
					/>
				</>
			))}
		</form>
	);
};

export default Form;
