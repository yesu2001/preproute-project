import { ChevronLeft, Edit2, Plus, Trash2 } from "lucide-react";
import type { Question } from "../../types";

interface QuestionListProps {
  questions: Question[];
  editingIndex: number | null;
  totalQuestions: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  // onAddQuestion: () => void;
}

export default function QuestionsTab({
  questions,
  editingIndex,
  totalQuestions,
  onEdit,
  onDelete,
}: QuestionListProps) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-4 hidden md:flex">
      <div className="px-4 flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Questions
          </p>
          <ChevronLeft size={14} className="text-slate-300" />
        </div>

        {/* Count */}
        <p className="text-xs font-semibold text-slate-500 px-2 mb-4">
          Total:{" "}
          <span className="text-slate-800 font-bold">{totalQuestions}</span>
          {" · "}
          Added:{" "}
          <span className="text-blue-600 font-bold">{questions.length}</span>
        </p>

        {/* Question list */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {questions.length === 0 ? (
            <div className="text-xs text-slate-400 italic p-4 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No questions added yet.
            </div>
          ) : (
            questions.map((q, idx) => (
              <div
                key={idx}
                className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                  editingIndex === idx
                    ? "bg-blue-50 border-blue-200"
                    : "bg-slate-50 border-slate-100 hover:bg-white hover:border-blue-100"
                }`}
              >
                <div className="text-xs font-medium text-slate-700 truncate max-w-[120px]">
                  <span className="font-bold text-blue-600 mr-1.5">
                    #{idx + 1}
                  </span>
                  {q.question || "(No text)"}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(idx)}
                    className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-all cursor-pointer"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => onDelete(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
