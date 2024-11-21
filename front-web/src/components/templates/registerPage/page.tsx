'use client';
import BaseTemplate from '../BaseTemplate/BaseTemplate';
import Card from '@/components/atoms/Card/Card';
import { useData } from './data';
import Form from '@/components/molecules/form/Form';
import RegisterButtons from '@/components/molecules/registerButtons/RegisterButtons';
import Button from '@/components/atoms/Button/button';
import Header from '@/components/molecules/header/Header';
import { useState } from 'react';

const RegisterTemplate = () => {
	const {
		registerHeader,
		genericInputData,
		registerButtons,
		clientInputData,
		professionalInputData,
		registerButton,
	} = useData();

	const [role, setRole] = useState<'Paciente' | 'Cuidador' | null>(null);
	return (
		<BaseTemplate>
			<Card>
				<Header {...registerHeader} />
				<Form {...genericInputData} />
				<RegisterButtons
					{...registerButtons}
					patientButton={{
						...registerButtons.patientButton,
						onclick: () => setRole('Paciente'),
					}}
					professionalButton={{
						...registerButtons.professionalButton,
						onclick: () => setRole('Cuidador'),
					}}
				/>
				{role === 'Paciente' && <Form {...clientInputData} />}
				{role === 'Cuidador' && <Form {...professionalInputData} />}
				<Button {...registerButton} />
			</Card>
		</BaseTemplate>
	);
};

export default RegisterTemplate;
