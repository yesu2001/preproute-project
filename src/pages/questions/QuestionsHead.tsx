import React from "react";

export default function QuestionsHead() {
  return (
    <div className="border-b border-slate-200 p-4  flex items-center justify-between">
      <p className="text-sm text-slate-500 ">
        Test Creation / Create Test / Chapter Wise
      </p>
      <button className="bg-blue-500 text-white px-12 py-1.5 rounded-lg">
        Publish
      </button>
    </div>
  );
}
