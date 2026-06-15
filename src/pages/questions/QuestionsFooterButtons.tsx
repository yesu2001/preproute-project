interface QuestionsFooterButtonsProps {
  saving: boolean;
  error: string | null;
  onBack: () => void;
  onSaveAndContinue: () => void;
}

export default function QuestionsFooterButtons({
  saving,
  error,
  onBack,
  onSaveAndContinue,
}: QuestionsFooterButtonsProps) {
  return (
    <div className="border-t border-slate-100 p-4 space-y-3">
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onSaveAndContinue}
          disabled={saving}
          className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-lg transition-all cursor-pointer"
        >
          {saving ? "Adding..." : "Add Question"}
        </button>
      </div>
    </div>
  );
}
