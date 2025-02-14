import { Field, ErrorMessage } from "formik";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
        {...props}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs italic"
      />
    </div>
  );
};

export default TextInput;
