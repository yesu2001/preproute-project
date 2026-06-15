import React from "react";

interface QuestionHeadProps {
  saving: boolean;
  onSaveAndPreview: () => void;
}

export default function QuestionsHead({
  saving,
  onSaveAndPreview,
}: QuestionHeadProps) {
  return (
    <div className="border-b border-slate-200 p-4  flex items-center justify-between">
      <p className="text-sm text-slate-500 ">
        Test Creation / Create Test / Chapter Wise
      </p>
      <button
        onClick={onSaveAndPreview}
        disabled={saving}
        className="bg-blue-500 text-white px-12 py-1.5 rounded-lg"
      >
        {saving ? "saving..." : "Preview & Publish"}
      </button>
    </div>
  );
}
