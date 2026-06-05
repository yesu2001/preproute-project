import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const TextInput = ({
  label,
  registration,
  error,
  placeholder,
  type = "text",
  required = false,
}: TextInputProps) => {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <input
        {...registration}
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all"
      />
      {error && <p className="mt-1.5 text-xs text-rose-500">{error.message}</p>}
    </div>
  );
};

export default TextInput;
