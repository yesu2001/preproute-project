import React from "react";

export default function QuestionsFooterButtons() {
  return (
    <div className="flex justify-between p-4">
      <button
        type="button"
        className="px-4 py-2 text-sm font-semibold text-white bg-red-400 hover:bg-red-500 transition-colors rounded-lg cursor-pointer"
      >
        Exit Test Creation
      </button>

      <button
        type="button"
        className="px-8 py-2.5 bg-[#4E73F8] text-white font-semibold text-sm rounded-lg hover:bg-[#3B62E3] shadow-md shadow-blue-100 transition-all flex items-center gap-2 cursor-pointer"
      >
        Save & Continue
      </button>
    </div>
  );
}
