export type ButtonProps = {
	classname: string;
	onclick: () => void;
	type: 'button' | 'submit' | 'reset';
	text: string;
};
