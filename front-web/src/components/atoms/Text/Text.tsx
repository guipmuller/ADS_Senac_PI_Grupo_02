import { TextProps } from './types';

const Text = ({ classname, text }: TextProps) => {
	return <p className={classname}>{text}</p>;
};

export default Text;
