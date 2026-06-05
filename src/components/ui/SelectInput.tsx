import { ChevronDown } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  registration: UseFormRegisterReturn;
  options: Option[];
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const SelectInput = ({
  label,
  registration,
  options,
  error,
  required = false,
  placeholder = "Choose from dropdown",
  disabled = false,
}: SelectInputProps) => {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <div className="relative mt-3">
        <select
          {...registration}
          disabled={disabled}
          className="w-full appearance-none border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-500 focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={16}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-500">{error.message}</p>}
    </div>
  );
};

export default SelectInput;
