import { ChevronLeft, Edit2, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import type { Question } from "../../types";

interface QuestionListProps {
  questions: Question[];
  editingIndex: number | null;
  totalQuestions: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function QuestionsTab({
  questions,
  editingIndex,
  totalQuestions,
  onEdit,
  onDelete,
}: QuestionListProps) {
  // const [addedQuestions, setAddedQuestions] = useState([
  //   {
  //     id: "1",
  //     text: "What is the capital of France?",
  //   },
  // ]);

  // // Action: Edit an already added question
  // const handleEditQuestion = (question) => {
  //   // setEditingId(question.id);
  //   // setCurrentQuestion({ ...question });
  // };

  // // Action: Delete an already added question
  // const handleDeleteQuestion = (id) => {
  //   setAddedQuestions(addedQuestions.filter((q) => q.id !== id));
  // };

  return (
    // <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-2 md:py-4">
    //   <div>
    //     <div className="px-4 py-2">
    //       <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
    //         <span>Question creation</span>
    //         <ChevronLeft size={16} className="text-slate-300 cursor-pointer" />
    //       </div>
    //       <div className="text-xs font-semibold text-slate-500 px-2 mb-4">
    //         Total Questions .{" "}
    //         <span className="text-slate-800 font-bold">50</span>
    //       </div>

    //       {/* Question Status Item Container Node Stack */}
    //       <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
    //         {addedQuestions.length === 0 ? (
    //           <div className="text-xs text-slate-400 italic p-4 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
    //             No questions built yet. Complete the form to add one.
    //           </div>
    //         ) : (
    //           addedQuestions.map((q, idx) => (
    //             <div
    //               key={q.id}
    //               className="group flex items-center justify-between p-3 border border-slate-100 rounded-xl transition-all hover:bg-white hover:border-blue-200"
    //             >
    //               <div className="text-xs font-medium text-slate-700 truncate max-w-[140px]">
    //                 {/* <span className="font-bold text-blue-600 mr-1.5">
    //                   #{idx + 1}
    //                 </span>{" "} */}
    //                 Question {idx + 1 || "(No Text Entry)"}
    //               </div>
    //               <div className="flex items-center gap-1">
    //                 <button
    //                   onClick={() => handleEditQuestion(q)}
    //                   className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md cursor-pointer transition-all"
    //                 >
    //                   <Edit2 size={13} />
    //                 </button>
    //                 <button
    //                   onClick={() => handleDeleteQuestion(q.id)}
    //                   className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md cursor-pointer transition-all"
    //                 >
    //                   <Trash2 size={13} />
    //                 </button>
    //               </div>
    //             </div>
    //           ))
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="p-4 border-t border-slate-50">
    //     <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-blue-200 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-50/30 transition-all">
    //       <Plus size={14} /> Add Question Slot
    //     </button>
    //   </div>
    // </aside>
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-4 hidden md:flex">
      <div className="px-4">
        <div className="flex items-center justify-between mb-3 px-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Questions
          </p>
        </div>
        <p className="text-xs font-semibold text-slate-500 px-2 mb-4">
          Total:{" "}
          <span className="text-slate-800 font-bold">{totalQuestions}</span>
          {" · "}
          Added:{" "}
          <span className="text-blue-600 font-bold">{questions.length}</span>
        </p>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
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
                    className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-all"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => onDelete(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-blue-200 text-blue-500 rounded-xl text-xs font-semibold">
          <Plus size={13} />
          {questions.length} / {totalQuestions} added
        </div>
      </div>
    </aside>
  );
}
