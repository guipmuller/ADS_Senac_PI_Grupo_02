import { LabelProps } from "@/components/molecules/form/types";

const Label = ({ text, classname = '', htmlFor, ...props }: LabelProps) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${classname}`}
      {...props}
    >
      {text}
    </label>
  );
};

export default Label;
