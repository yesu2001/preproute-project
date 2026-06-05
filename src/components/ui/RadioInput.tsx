import type { UseFormRegisterReturn } from "react-hook-form";

interface RadioInputProps {
  label: string;
  registration: UseFormRegisterReturn;
  options: { value: string; label: string }[];
  selected: string;
}

const RadioInput = ({
  label,
  registration,
  options,
  selected,
}: RadioInputProps) => {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="mt-3 flex items-center gap-8">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === option.value
                  ? "border-blue-500"
                  : "border-slate-300"
              }`}
            >
              {selected === option.value && (
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              )}
            </div>
            <input
              {...registration}
              type="radio"
              value={option.value}
              className="hidden"
            />
            <span
              className={`text-sm font-medium ${
                selected === option.value ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioInput;
