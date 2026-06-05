import { ChevronDown } from "lucide-react";

interface CounterProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

const Counter = ({ label, value, onChange }: CounterProps) => {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="mt-3 flex items-center justify-between border border-slate-200 rounded-lg px-4 py-1">
        <span className="text-lg text-slate-700">
          {value > 0 ? `+${value}` : value}
        </span>
        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => onChange(value + 1)}
            className="hover:text-blue-600 transition-colors"
          >
            <ChevronDown className="rotate-180" size={16} />
          </button>
          <button
            type="button"
            onClick={() => onChange(value - 1)}
            className="hover:text-blue-600 transition-colors"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
