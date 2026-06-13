import { useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { usePreview } from "./usePreview";
import PublishSettings from "./PublishSettings";
import type { Question } from "../../types";
import Spinner from "../../components/ui/Loader";
import MetaTestCard from "../../components/MetaTestCard";

const Preview = () => {
  const navigate = useNavigate();
  const {
    testId,
    currentTest,
    questions,
    publishing,
    published,
    error,
    handlePublish,
  } = usePreview();

  if (!currentTest) return <Spinner />;

  return (
    <div className="space-y-6 p-2 md:p-6">
      {/* Step indicator */}
      {/* <StepIndicator currentStep={3} testId={testId} /> */}

      {/* Header */}
      <div className="flex items-center gap-3">
        <p className="text-lg font-semibold text-slate-800">Test Preview</p>
        {questions.length > 0 && (
          <div className="border border-green-500 flex items-center gap-2 text-xs text-green-600 py-1 px-2.5 rounded-md">
            <CircleCheck size={14} />
            <p>
              {questions.length} question{questions.length !== 1 ? "s" : ""}{" "}
              added
            </p>
          </div>
        )}
      </div>

      {/* Test summary */}
      <MetaTestCard test={currentTest} showEditButton />

      {/* Questions list */}
      {questions.length > 0 && (
        <div className="p-6">
          <h3 className="text-sm font-bold text-slate-700 mb-4">
            Questions ({questions.length})
          </h3>
          <div className="space-y-4">
            {questions.map((q: Question, idx: number) => (
              <div
                key={idx}
                className="border border-slate-100 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium text-slate-800">
                    <span className="text-blue-600 font-bold mr-2">
                      Q{idx + 1}.
                    </span>
                    {q.question}
                  </p>
                  {q.difficulty && (
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md shrink-0 capitalize">
                      {q.difficulty}
                    </span>
                  )}
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-2">
                  {(["option1", "option2", "option3", "option4"] as const).map(
                    (key, optIdx) => (
                      <div
                        key={key}
                        className={`text-xs px-3 py-2 rounded-lg border ${
                          q.correct_option === key
                            ? "border-green-300 bg-green-50 text-green-700 font-semibold"
                            : "border-slate-100 text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {q[key]}
                      </div>
                    ),
                  )}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Publish settings */}
      <div className="p-6">
        <h3 className="text-sm font-bold text-slate-700 mb-6">
          Publish Settings
        </h3>
        <PublishSettings
          publishing={publishing}
          published={published}
          onPublish={handlePublish}
        />
      </div>

      {/* Success state */}
      {published && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-slate-100 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CircleCheck size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-800">
                Test Published!
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your test is now live and available to students on the platform.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Back navigation */}
      <div className="flex justify-between pt-2 border-t border-slate-100">
        <button
          onClick={() => navigate(`/test/${testId}/questions`)}
          className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back to Questions
        </button>
      </div>
    </div>
  );
};

export default Preview;
