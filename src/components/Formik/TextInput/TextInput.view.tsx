import { FC, memo } from "react";
import { Field, ErrorMessage } from "formik";
import { TextInputProps } from "./TextInput.type";

const TextInputView: FC<TextInputProps> = ({ label, name, placeholder, type, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
        {...props}
      />
      <ErrorMessage name={name} component="p" className="text-red-500 text-xs italic" />
    </div>
  );
};

export default memo(TextInputView);
