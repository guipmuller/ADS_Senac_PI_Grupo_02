import { ButtonProps } from '@/components/atoms/Button/types';
import { FormProps } from '@/components/molecules/form/types';
import { HeaderProps } from '@/components/molecules/header/types';
import { RegisterButtonsProps } from '@/components/molecules/registerButtons/types';
import { FaChevronLeft } from 'react-icons/fa';

const useData = () => {
	const commonStyle = {
		label: {
			classname: 'block text-sm font-medium text-gray-700',
		},
		input: {
			classname:
				'w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500',
		},
		button: 'w-full py-2 text-sm font-medium text-gray-700 border border-gray-100 bg-gray-100 rounded focus:outline-none hover:bg-black hover:text-white',
	};

	const registerHeader = {
		text: {
			text: 'Cadastro de Usuário',
			classname: 'font-sans font-medium text-base',
		},
		children: <FaChevronLeft />,
	} as HeaderProps;

	const genericInputData = {
		inputArray: [
			{
				label: {
					text: 'Nome Completo',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite seu nome completo',
					type: 'text',
				},
			},
			{
				label: {
					text: 'Email',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite seu email',
					type: 'email',
				},
			},
			{
				label: {
					text: 'Confirmar Email',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Confirme seu email',
					type: 'email',
				},
			},
			{
				label: {
					text: 'Telefone',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite seu telefone',
					type: 'tel',
				},
			},
			{
				label: {
					text: 'CPF',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite seu CPF',
					type: 'text',
				},
			},
			{
				label: {
					text: 'Senha',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite sua senha',
					type: 'password',
				},
			},
			{
				label: {
					text: 'Confirmar Senha',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Confirmar Senha',
					type: 'password',
				},
			},
		],
	} as FormProps;

	const registerButtons = {
		text: {
			text: 'Sou',
			classname: 'pb-2 font-medium',
		},
		patientButton: {
			classname: commonStyle.button,
			text: 'Paciente',
		},
		professionalButton: {
			classname: commonStyle.button,
			text: 'Cuidador',
		},
	} as RegisterButtonsProps;

	const clientInputData = {
		inputArray: [
			{
				label: {
					text: 'Nome do Paciente',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite o nome do paciente',
					type: 'text',
				},
			},
			{
				label: {
					text: 'CPF do Paciente',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite o CPF do Paciente',
					type: 'text',
				},
			},
			{
				label: {
					text: 'Data de Nascimento do Paciente',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite a data de nascimento do paciente',
					type: 'text',
				},
			},
		],
	} as FormProps;

	const professionalInputData = {
		inputArray: [
			{
				label: {
					text: 'Número do Coren',
					classname: commonStyle.label.classname,
				},
				input: {
					classname: commonStyle.input.classname,
					placeholder: 'Digite o número do Coren',
					type: 'text',
				},
			},
			{
				label: {
					text: 'Descrição/Biografia',
					classname: commonStyle.label.classname,
				},
				input: {
					classname:
						'w-full h-32 px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500 truncate',
					placeholder:
						'Insira dados relevantes sobre você como sua formação, experiências e características',
					type: 'text',
				},
			},
		],
	} as FormProps;

	const registerButton = {
		text: 'Cadastrar',
		classname:
			'w-full py-2 mt-2 text-sm font-medium text-gray-700 border border-gray-100 bg-gray-100 rounded focus:outline-none hover:bg-black hover:text-white',
		onclick: () => console.log('cadastrar'),
		type: 'submit',
	} as ButtonProps;

	return {
		registerHeader,
		genericInputData,
		registerButtons,
		clientInputData,
		professionalInputData,
		registerButton,
	};
};

export { useData };
