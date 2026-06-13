interface OptionInputProps {
  index: number;
  value: string;
  isCorrect: boolean;
  onSelect: () => void;
  onChange: (val: string) => void;
  error?: string;
}

const OptionInput = ({
  index,
  value,
  isCorrect,
  onSelect,
  onChange,
  error,
}: OptionInputProps) => {
  return (
    <div>
      <div
        className={`flex items-center gap-3 p-3 px-4 rounded-xl border transition-all ${
          isCorrect
            ? "border-blue-300 bg-blue-50/40"
            : "border-slate-100 hover:border-slate-200"
        }`}
      >
        {/* Radio selector */}
        <button
          type="button"
          onClick={onSelect}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
            isCorrect
              ? "border-blue-500 bg-blue-500"
              : "border-slate-300 bg-white"
          }`}
        >
          {isCorrect && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
        </button>

        {/* Text input */}
        <input
          type="text"
          placeholder={`Type Option here`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-slate-700 outline-none"
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};

export default OptionInput;
