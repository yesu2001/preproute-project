import { ChevronDown } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TimeSelectFieldProps {
  label?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
}

const generateTimeOptions = (): string[] => {
  const options: string[] = [];
  const periods = ["AM", "PM"];
  for (const period of periods) {
    for (let hour = 1; hour <= 12; hour++) {
      options.push(`${hour}:00 ${period}`);
      options.push(`${hour}:30 ${period}`);
    }
  }
  const startIndex = options.indexOf("8:00 AM");
  return [...options.slice(startIndex), ...options.slice(0, startIndex)];
};

const TIME_OPTIONS = generateTimeOptions();

const TimeSelectField = ({
  label,
  registration,
  error,
  required = false,
}: TimeSelectFieldProps) => {
  return (
    <div>
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <div className={`relative ${label ? "mt-3" : ""}`}>
        <select
          {...registration}
          className="w-full appearance-none border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
        >
          {TIME_OPTIONS.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-500">{error.message}</p>}
    </div>
  );
};

export default TimeSelectField;
