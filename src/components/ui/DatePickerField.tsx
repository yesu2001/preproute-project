import { Calendar } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface DatePickerFieldProps {
  label?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
}

const DatePickerField = ({
  label,
  registration,
  error,
  placeholder = "Select Date",
  required = false,
}: DatePickerFieldProps) => {
  return (
    <div>
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <div className={`relative ${label ? "mt-3" : ""}`}>
        <input
          {...registration}
          type="date"
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all appearance-none"
          placeholder={placeholder}
        />
        <Calendar
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-500">{error.message}</p>}
    </div>
  );
};

export default DatePickerField;
