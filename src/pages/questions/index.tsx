import React, { useEffect } from "react";
import QuestionsTab from "./QuestionsTab";
import QuestionsHead from "./QuestionsHead";
import MetaTestCard from "../../components/MetaTestCard";
import QuestionsForm from "./QuestionsForm";
import QuestionsFooterButtons from "./QuestionsFooterButtons";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTestStore } from "../../store/testStore";
import { getTestById } from "../../api/tests";
import { useQuestions } from "./useQuestions";
import Spinner from "../../components/ui/Loader";

export default function Questions() {
  const { id: testId } = useParams<{ id: string }>();
  console.log(testId);
  const navigate = useNavigate();
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
    setError,
  } = useQuestions();

  const sampleTest: any = {
    id: "sdfav4534",
    name: "Maths Test",
    type: "multiple_choice",
    subject: "Mathematics",
    topics: ["Algebra", "Geometry"],
    sub_topics: [],
    difficulty: "medium",
    correct_marks: 1,
    wrong_marks: -0.25,
    unattempt_marks: 0,
    total_time: 120,
    total_marks: 100,
    total_questions: 20,
    status: "active",
    created_at: "2023-01-01T00:00:00Z",
    questions: [],
  };

  useEffect(() => {
    if (!testId) return;
    loadQuestions();
    if (!currentTest) {
      const fetchTest = async () => {
        try {
          const resp = await getTestById(testId);
          console.log(resp);
          const test = (resp as any)?.data ?? (resp as any);
          if (test) setCurrentTest(test);
          else setCurrentTest(sampleTest);
        } catch (e) {
          console.log(e);
          setCurrentTest(sampleTest);
        }
      };
      fetchTest();
    }
  }, [testId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!currentTest) return <Spinner />;

  const editingQuestion =
    editingIndex !== null ? questions[editingIndex] : null;

  return (
    <div className="flex min-h-screen">
      <QuestionsTab
        questions={questions}
        editingIndex={editingIndex}
        totalQuestions={currentTest.total_questions}
        onEdit={handleEditQuestion}
        onDelete={handleDeleteQuestion}
      />
      <main className="flex-1 flex flex-col">
        {/* <QuestionsHead /> */}
        <div className="p-4">
          <MetaTestCard test={currentTest} />
        </div>
        <QuestionsForm
          testId={testId!}
          editingQuestion={editingQuestion}
          editingIndex={editingIndex}
          questionNumber={
            editingIndex !== null ? editingIndex + 1 : questions.length + 1
          }
          onSubmit={handleAddQuestion}
          onCancelEdit={() => setError(null)}
        />
        <QuestionsFooterButtons />
      </main>
    </div>
  );
}
