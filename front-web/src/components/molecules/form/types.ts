import { InputHTMLAttributes, LabelHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
  hasError?: boolean;
}

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  classname?: string;
}

export interface FormField {
  label: LabelProps;
  input: InputProps;
}

export interface FormProps {
  inputArray: FormField[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}