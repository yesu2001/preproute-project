import { Pen, Timer, FileQuestion, ChartColumnBig } from "lucide-react";
import type { Test } from "../types";
import { useNavigate } from "react-router-dom";

interface MetaTestCardProps {
  test: Test;
  showEditButton?: boolean;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-500",
  medium: "bg-amber-500",
  hard: "bg-rose-500",
  difficult: "bg-rose-500",
};

const MetaTestCard = ({ test, showEditButton = true }: MetaTestCardProps) => {
  const navigate = useNavigate();
  const diffColor =
    difficultyColors[test.difficulty?.toLowerCase()] ?? "bg-slate-500";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm relative">
      {/* Test type pill */}
      <span className="bg-slate-800 text-white text-sm font-semibold px-4 py-1 rounded-2xl">
        {test.type ?? "Chapter Wise"}
      </span>

      {/* Subject + difficulty */}
      <div className="flex items-center gap-3 my-4">
        <span className="text-sm font-bold text-slate-800">{test.subject}</span>
        <span
          className={`${diffColor} text-white text-sm px-4 py-1 rounded-lg capitalize`}
        >
          {test.difficulty}
        </span>
      </div>

      {/* Topics + subtopics */}
      <div className="space-y-2 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-20">Topics</span>
          <span>:</span>
          <div className="flex flex-wrap gap-1.5">
            {test.topics?.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-amber-500 border border-amber-400 rounded-md text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Edit button */}
      {showEditButton && (
        <button
          onClick={() => navigate(`/test/${test.id}/edit`)}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-blue-500 transition-colors"
        >
          <Pen size={16} />
        </button>
      )}

      {/* Stats row */}
      <div className="absolute bottom-5 right-5 flex items-center gap-1 border border-slate-200 p-1.5 rounded-lg text-xs text-slate-600">
        <div className="px-3 py-1 flex items-center gap-1.5">
          <Timer size={14} className="text-slate-300" />
          {test.total_time} Min
        </div>
        <div className="w-px h-4 bg-slate-200" />
        <div className="px-3 py-1 flex items-center gap-1.5">
          <FileQuestion size={14} className="text-slate-300" />
          {test.total_questions} Q's
        </div>
        <div className="w-px h-4 bg-slate-200" />
        <div className="px-3 py-1 flex items-center gap-1.5">
          <ChartColumnBig size={14} className="text-slate-300" />
          {test.total_marks} Marks
        </div>
      </div>
    </div>
  );
};

export default MetaTestCard;
