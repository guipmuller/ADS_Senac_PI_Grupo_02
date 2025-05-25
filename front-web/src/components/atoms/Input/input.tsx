import React from "react";
import { InputProps } from "@/components/molecules/form/types";

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      type = "text",
      classname = '',
      hasError = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      w-full px-3 py-2 rounded-md border
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${hasError ? 'border-red-500' : 'border-gray-300'}
      ${classname}
    `;

    if (type === "textarea") {
      const textareaProps = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
      return (
        <textarea
          {...textareaProps}
          onChange={onChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
          className={`${baseClasses} min-h-[100px]`}
          ref={ref as React.Ref<HTMLTextAreaElement>}
        />
      );
    }
    const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>;
    return (
      <input
        type={type}
        {...inputProps}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        className={baseClasses}
        ref={ref as React.Ref<HTMLInputElement>}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;