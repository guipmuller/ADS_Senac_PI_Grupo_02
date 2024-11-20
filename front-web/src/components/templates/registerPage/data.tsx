const useData = () => {
	type InputProps = {
		label: {
			text: string;
			classname: string;
		};
		input: {
			classname: string;
			placeholder: string;
			type: string;
		};
	};

	const commonStyle = {
		label: {
			classname: 'block text-sm font-medium text-gray-700',
		},
		input: {
			classname:
				'w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500',
		},
	};

	const clientInputData: InputProps[] = [
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
	];
	return {
		clientInputData,
	};
};

export { useData };
