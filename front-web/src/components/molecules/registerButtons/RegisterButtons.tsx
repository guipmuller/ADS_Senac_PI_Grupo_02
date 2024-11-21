import Button from '@/components/atoms/Button/button';
import Text from '@/components/atoms/Text/Text';
import React from 'react';
import { RegisterButtonsProps } from './types';

const RegisterButtons = ({
	text,
	patientButton,
	professionalButton,
}: RegisterButtonsProps) => {
	return (
		<div className="w-full max-w-xs py-4">
			<Text {...text} />
			<div className="flex space-x-2">
				<Button {...patientButton} />
				<Button {...professionalButton} />
			</div>
		</div>
	);
};

export default RegisterButtons;
