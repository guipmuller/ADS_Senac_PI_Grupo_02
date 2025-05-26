import BaseTemplate from '../BaseTemplate/BaseTemplate';
import Card from '@/components/atoms/Card/Card';
import { useData } from './data';
import Form from '@/components/molecules/form/Form';
import RegisterButtons from '@/components/molecules/registerButtons/RegisterButtons';
import Button from '@/components/atoms/Button/button';
import Header from '@/components/molecules/header/Header';
import { useState } from 'react';
import { INITIAL_FORM_STATE, RegisterTemplateProps, UserFormData } from './types';

const RegisterTemplate:React.FC<RegisterTemplateProps> = ({ onCreate }) => {
	const {
		registerHeader,
		genericInputData,
		registerButtons,
		clientInputData,
		professionalInputData,
		registerButton,
	} = useData();

	const [formData, setFormData] = useState<UserFormData>(INITIAL_FORM_STATE);
	const [role, setRole] = useState<'Paciente' | 'Cuidador' | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

	const handleGenericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSpecificInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			dadosEspecificos: {
				...prev.dadosEspecificos,
				[name]: value
			}
		}));
	};

	const handleRoleSelect = (selectedRole: 'Paciente' | 'Cuidador') => {
		setRole(selectedRole);
		setFormData(prev => ({
			...prev,
			role: selectedRole,
			dadosEspecificos: {}
		}));
	};

	const handleSubmit = async () => {
		console.log('Dados para enviar:', formData);
		if (!formData.role) {
      setError('Selecione um tipo de usuário');
      return;
    }

    setIsSubmitting(true);
    setError(null);

	const result = await onCreate(formData);

	if (!result || !result.success) {
	  setError('Erro ao cadastrar usuário');
	} else {
	  setFormData(INITIAL_FORM_STATE);
	  setRole(null);
	}

    setIsSubmitting(false);
	};

	return (
		<BaseTemplate>
			<Card>
				<Header {...registerHeader} />
				{error && <div className="text-red-500 mb-4">{error}</div>}
				<Form {...genericInputData} onChange={handleGenericInputChange} />
				<RegisterButtons
					{...registerButtons}
					patientButton={{
						...registerButtons.patientButton,
						onclick: () => handleRoleSelect('Paciente'),
					}}
					professionalButton={{
						...registerButtons.professionalButton,
						onclick: () => handleRoleSelect('Cuidador'),
					}}
				/>
				{role === 'Paciente' && (
					<Form 
						{...clientInputData} 
						onChange={handleSpecificInputChange} 
					/>)}
				{role === 'Cuidador' && (
					<Form 
						{...professionalInputData} 
						onChange={handleSpecificInputChange} 
					/>)}
				<Button 
					{...registerButton} onclick={handleSubmit} 
					disabled={isSubmitting} classname='bg-[#348a89] hover:bg-[#2c7472] transition-colors duration-500 p-2 rounded-md text-white mt-3 w-full'
				/>
			</Card>
		</BaseTemplate>
	);
};

export default RegisterTemplate;