type LabelProps = {
	classname: string;
	text: string;
};

const Label = ({ classname, text }: LabelProps) => {
	<label className={classname}>{text}</label>;
};

export default Label;
