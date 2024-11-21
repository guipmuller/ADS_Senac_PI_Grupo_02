export type FormProps = {
	inputArray: Array<{
		label: {
			text: string;
			classname: string;
		};
		input: {
			classname: string;
			placeholder: string;
			type: string;
		};
	}>;
};
