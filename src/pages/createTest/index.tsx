import Header from "./Header";
import CreateTestForm from "./CreateTestForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CreateTest() {
  const navigate = useNavigate();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    subject: string;
    testName: string;
    topic: string;
    subTopic: string;
    duration: string;
    difficulty: string;
    wrongAnswerMark: number;
    unattempted: number;
    correctAnswer: number;
    totalQuestions: string;
    totalMarks: string;
  }>();

  const formData = watch();

  type MarkingField = "wrongAnswerMark" | "unattempted" | "correctAnswer";

  const adjustMarking = (field: MarkingField, value: number) => {
    setValue(field, value);
  };

  const handleCreateTest = () => {
    // Implementation for creating a new test
    // Navigate to questions page
    navigate("/test/12312/questions");
  };

  return (
    <div className="flex-col min-h-screen space-y-8 p-2 md:p-6">
      <Header />
      <CreateTestForm
        register={register}
        errors={errors}
        formData={formData}
        adjustMarking={adjustMarking}
        handleNext={handleCreateTest}
      />
    </div>
  );
}
