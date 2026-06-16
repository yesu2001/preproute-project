import { Loader2 } from "lucide-react";
import Header from "./Header";
import CreateTestForm from "./CreateTestForm";
import { useCreateTest } from "./useCreateTest";

export default function CreateTest() {
  const {
    isEditMode,
    formData,
    register,
    setValue,
    errors,
    subjects,
    topics,
    subTopics,
    loadingSubjects,
    loadingTopics,
    loadingSubTopics,
    loadingTest,
    error,
    handleSubmit,
  } = useCreateTest();

  if (loadingSubjects || loadingTest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={32} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex-col min-h-screen space-y-8 p-2 md:p-6">
      <Header />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      <CreateTestForm
        register={register}
        setValue={setValue}
        errors={errors}
        formData={formData}
        isEditMode={isEditMode}
        handleNext={handleSubmit}
        subjects={subjects}
        topics={topics}
        subTopics={subTopics}
        loadingSubjects={loadingSubjects}
        loadingTopics={loadingTopics}
        loadingSubTopics={loadingSubTopics}
      />
    </div>
  );
}
