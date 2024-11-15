import React from 'react';

type ButtonProps = {
	classname: string;
	onclick: () => void;
	onsubmit: () => void;
	type?: string;
	submit?: string;
	text: string;
};

function Button(props: ButtonProps) {
	return (
		<button
			className={props.classname}
			onClick={props.onclick}
			onSubmit={props.onsubmit}
		>
			{props.text}
		</button>
	);
}

export default Button;
