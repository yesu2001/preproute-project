import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTestStore } from "../../store/testStore";
import { getTestById } from "../../utils/storage";
import { useQuestions } from "./useQuestions";
import QuestionsTab from "./QuestionsTab";
import QuestionsForm from "./QuestionsForm";
import MetaTestCard from "../../components/MetaTestCard";
import Spinner from "../../components/ui/Loader";
import QuestionsHead from "./QuestionsHead";
import type { Question } from "../../types";

export default function Questions() {
  const { id: testId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const { currentTest, setCurrentTest } = useTestStore();
  const {
    questions,
    editingIndex,
    saving,
    error,
    loadQuestions,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveAndContinue,
  } = useQuestions();

  useEffect(() => {
    if (!testId) return;
    loadQuestions();
    if (!currentTest || currentTest.id !== testId) {
      const test = getTestById(testId);
      if (test) setCurrentTest(test);
      else navigate("/dashboard");
    }
  }, [testId]);

  if (!currentTest) return <Spinner />;

  const editingQuestion =
    editingIndex !== null ? questions[editingIndex] : null;

  const handleSubmit = (q: Question) => {
    handleAddQuestion(q);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen">
      <QuestionsTab
        questions={questions}
        editingIndex={editingIndex}
        totalQuestions={currentTest.total_questions}
        onEdit={handleEditQuestion}
        onDelete={handleDeleteQuestion}
        // onAddQuestion={scrollToForm}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Test summary */}
        <QuestionsHead
          saving={saving}
          onSaveAndPreview={handleSaveAndContinue}
        />
        <div className="p-4">
          <MetaTestCard test={currentTest} />
        </div>

        {/* Question form */}
        <div ref={formRef}>
          <QuestionsForm
            test={currentTest}
            editingQuestion={editingQuestion}
            questionNumber={
              editingIndex !== null ? editingIndex + 1 : questions.length + 1
            }
            onSubmit={handleSubmit}
            saving={saving}
            error={error}
            onBack={() => navigate(`/test/${testId}/edit`)}
          />
        </div>
      </main>
    </div>
  );
}
