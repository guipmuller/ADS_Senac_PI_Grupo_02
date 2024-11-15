type TextProps = {
	classname: string;
	text: string;
};

const Text = ({ classname, text }: TextProps) => {
	return <p className={classname}>{text}</p>;
};

export default Text;
