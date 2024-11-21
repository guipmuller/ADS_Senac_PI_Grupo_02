import React from 'react';
import { HeaderProps } from './types';
import Text from '@/components/atoms/Text/Text';

const Header = ({ text, children }: HeaderProps) => {
	return (
		<div className="flex justify-left items-center gap-2 mb-2">
			{children}
			<Text {...text} />
		</div>
	);
};

export default Header;
