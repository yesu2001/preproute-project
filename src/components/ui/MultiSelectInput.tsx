import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FieldError } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectInputProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
  noOptionsText?: string;
}

const MultiSelectInput = ({
  label,
  options,
  selected,
  onChange,
  error,
  placeholder = "Select options",
  disabled = false,
  noOptionsText = "No options available",
}: MultiSelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  const selectedLabels = selected
    .map(
      (value) =>
        options.find((option) => option.value === value)?.label ?? value,
    )
    .filter(Boolean);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
      return;
    }
    onChange([...selected, value]);
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        disabled={disabled}
        className="mt-3 w-full min-h-[3rem] rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-500 transition-all hover:border-slate-300 disabled:cursor-not-allowed disabled:bg-slate-50"
      >
        <div className="flex flex-wrap items-center gap-2">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((labelText) => (
              <span
                key={labelText}
                className="inline-flex rounded-full bg-sky-50 px-2 py-1 text-xs font-medium text-slate-700"
              >
                {labelText}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-20 mt-2 w-full max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
          {options.length === 0 ? (
            <div className="text-sm text-slate-400">{noOptionsText}</div>
          ) : (
            options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))
          )}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-rose-500">{error.message}</p>}
    </div>
  );
};

export default MultiSelectInput;
