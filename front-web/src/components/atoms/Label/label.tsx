import { LabelProps } from './types';

const Label = ({ classname, text }: LabelProps) => {
	return <label className={classname}>{text}</label>;
};

export default Label;
