import {
  Pen,
  Timer,
  FileQuestion,
  ChartColumnBig,
  FileQuestionMark,
} from "lucide-react";
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
    // <div className="bg-white rounded-lg border border-slate-100 p-6 shadow-sm relative">
    //   {/* Test type pill */}
    //   <span className="bg-slate-800 text-white text-sm font-semibold px-4 py-1 rounded-2xl">
    //     {test.type ?? "Chapter Wise"}
    //   </span>

    //   {/* Subject + difficulty */}
    //   <div className="flex items-center gap-3 my-4">
    //     <span className="text-sm font-bold text-slate-800">{test.subject}</span>
    //     <span
    //       className={`${diffColor} text-white text-sm px-4 py-1 rounded-lg capitalize`}
    //     >
    //       {test.difficulty}
    //     </span>
    //   </div>

    //   {/* Topics + subtopics */}
    //   <div className="space-y-2 text-sm text-slate-400">
    //     <div className="flex items-center gap-2">
    //       <span className="w-20">Topics</span>
    //       <span>:</span>
    //       <div className="flex flex-wrap gap-1.5">
    //         {test.topics?.map((t) => (
    //           <span
    //             key={t}
    //             className="px-2 py-0.5 text-amber-500 border border-amber-400 rounded-md text-xs"
    //           >
    //             {t}
    //           </span>
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Edit button */}
    //   {showEditButton && (
    //     <button
    //       onClick={() => navigate(`/test/${test.id}/edit`)}
    //       className="absolute top-5 right-5 p-1 text-slate-400 hover:text-blue-500 transition-colors"
    //     >
    //       <Pen size={16} />
    //     </button>
    //   )}

    //   {/* Stats row */}
    //   <div className="absolute bottom-5 right-5 flex items-center gap-1 border border-slate-200 p-1.5 rounded-lg text-xs text-slate-600">
    //     <div className="px-3 py-1 flex items-center gap-1.5">
    //       <Timer size={14} className="text-slate-300" />
    //       {test.total_time} Min
    //     </div>
    //     <div className="w-px h-4 bg-slate-200" />
    //     <div className="px-3 py-1 flex items-center gap-1.5">
    //       <FileQuestion size={14} className="text-slate-300" />
    //       {test.total_questions} Q's
    //     </div>
    //     <div className="w-px h-4 bg-slate-200" />
    //     <div className="px-3 py-1 flex items-center gap-1.5">
    //       <ChartColumnBig size={14} className="text-slate-300" />
    //       {test.total_marks} Marks
    //     </div>
    //   </div>
    // </div>

    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-start justify-between shadow-sm relative">
      <div className="">
        <span className="bg-[#1E293B] text-white text-md font-semibold px-4 py-1 rounded-2xl">
          {test.type ?? "Chapter Wise"}
        </span>
        <div className="flex items-center gap-3 my-4">
          <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 font-md">
            <img
              src="/src/assets/subject.png"
              alt="Subject"
              className="w-8 h-8"
            />
            {test.name}{" "}
          </span>
          <span className="bg-[#2AB7A9] text-white border flex items-center gap-1 text-sm  px-4 py-1 rounded-lg capitalize">
            <img
              src="/src/assets/cognition.png"
              alt="Subject"
              className="w-5 h-5"
            />
            {test.difficulty}
          </span>
        </div>

        <div className="space-y-3">
          <div className="text-slate-400 flex items-center gap-1">
            <div className="w-25 flex justify-between">
              <p>Subject</p>
              <p>:</p>
            </div>
            <span className="font-semibold text-slate-500 ml-1">
              {test.subject}
            </span>
          </div>
          <div className="text-slate-400 flex items-center gap-1">
            <div className="w-25 flex justify-between">
              <p>Topic</p>
              <p> :</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="inline-block px-2  text-amber-400 rounded-md ml-2 border border-amber-400">
                {test.topics?.[0] || "Grammar"}
              </span>
              <span className="inline-block px-2 text-amber-400 rounded-md ml-1 border border-amber-400">
                {test.topics?.[1] || "Writing"}
              </span>
            </div>
          </div>
          <div className="text-slate-400 flex items-center gap-1">
            <div className="w-25 flex justify-between">
              <p>Sub Topic</p>
              <p> :</p>
            </div>
            <span className="inline-block px-2 text-sm text-amber-400 rounded-md ml-2 border border-amber-400">
              {test.sub_topics?.[0] || "Application"}
            </span>
          </div>
        </div>
      </div>

      {/* Structured Stats Pills Matrix */}
      <button className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 transition-colors">
        <Pen size={16} color="#7489FF" />
      </button>

      <div className="absolute bottom-5 right-5 flex items-center gap-1 border border-slate-200 p-1.5 rounded-lg text-xs text-slate-700">
        <div className="px-3 py-1.5 flex items-center gap-1">
          <Timer size={16} className="text-slate-300" /> {test.total_time} Min
        </div>
        <div className="w-px h-4 bg-slate-300"></div>
        <div className="px-4 py-1.5 flex items-center gap-1">
          <FileQuestionMark size={16} className="text-slate-300" />{" "}
          {test.total_questions} Q's
        </div>
        <div className="w-px h-4 bg-slate-300"></div>
        <div className="px-3 py-1.5 flex items-center gap-1">
          <ChartColumnBig size={16} className="text-slate-300" />{" "}
          {test.total_marks} Marks
        </div>
      </div>
    </div>
  );
};

export default MetaTestCard;
