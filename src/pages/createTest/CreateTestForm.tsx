import SelectInput from "../../components/ui/SelectInput";
import TextInput from "../../components/ui/TextInput";
import type { Subject, Topic, SubTopic, TestStatus } from "../../types";

interface CreateTestFormProps {
  register: any;
  errors: any;
  formData: any;
  handleNext: (status: TestStatus) => void;
  subjects: Subject[];
  topics: Topic[];
  subTopics: SubTopic[];
  loadingSubjects: boolean;
  loadingTopics: boolean;
  loadingSubTopics: boolean;
}

export default function CreateTestForm({
  register,
  errors,
  formData,
  handleNext,
  subjects,
  topics,
  subTopics,
  loadingSubjects,
  loadingTopics,
  loadingSubTopics,
}: CreateTestFormProps) {
  const testTypeOptions = [
    { value: "chapterwise", label: "Chapterwise" },
    { value: "full_test", label: "Full Test" },
    { value: "topicwise", label: "Topicwise" },
  ];

  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "difficult", label: "Difficult" },
  ];

  const subjectsOptions = subjects.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const topicsOptions = topics.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  const subTopicsOptions = subTopics.map((st) => ({
    value: st.id,
    label: st.name,
  }));

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        <TextInput
          label="Test Name"
          registration={register("name", { required: true })}
          error={errors.name}
          required={true}
          placeholder="Enter test name"
        />

        <SelectInput
          label="Test Type"
          registration={register("type", { required: true })}
          options={testTypeOptions}
          error={errors.type}
          required={true}
          placeholder="Select test type"
        />

        <SelectInput
          label="Subject"
          registration={register("subject", { required: true })}
          options={subjectsOptions}
          error={errors.subject}
          required={true}
          placeholder="Select subject"
          disabled={loadingSubjects}
        />

        <SelectInput
          label="Topics"
          registration={register("topics")}
          options={topicsOptions}
          error={errors.topics}
          placeholder="Select topics"
          disabled={loadingTopics || !formData.subject}
          multiple
        />

        <SelectInput
          label="Sub Topics"
          registration={register("sub_topics")}
          options={subTopicsOptions}
          error={errors.sub_topics}
          placeholder="Select sub topics"
          disabled={
            loadingSubTopics || !formData.topics || formData.topics.length === 0
          }
          multiple
        />

        <SelectInput
          label="Difficulty"
          registration={register("difficulty", { required: true })}
          options={difficultyOptions}
          error={errors.difficulty}
          required={true}
          placeholder="Select difficulty"
        />

        <div className="col-span-2 mt-4">
          <h6 className="text-sm font-semibold text-slate-700 mb-6">
            Marking Scheme:
          </h6>
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-8">
            <TextInput
              label="Correct Marks"
              registration={register("correct_marks", {
                valueAsNumber: true,
                required: true,
              })}
              error={errors.correct_marks}
              type="number"
              placeholder="Ex. 1"
            />
            <TextInput
              label="Wrong Marks"
              registration={register("wrong_marks", {
                valueAsNumber: true,
                required: true,
              })}
              error={errors.wrong_marks}
              type="number"
              placeholder="Ex. -0.25"
            />
            <TextInput
              label="Unattempt Marks"
              registration={register("unattempt_marks", {
                valueAsNumber: true,
                required: true,
              })}
              error={errors.unattempt_marks}
              type="number"
              placeholder="Ex. 0"
            />

            <TextInput
              label="Total Questions"
              registration={register("total_questions", {
                valueAsNumber: true,
                required: true,
              })}
              error={errors.total_questions}
              type="number"
              placeholder="Ex. 20"
            />

            <TextInput
              label="Total Marks"
              registration={register("total_marks", {
                valueAsNumber: true,
                required: true,
              })}
              error={errors.total_marks}
              type="number"
              placeholder="Ex. 100"
            />
          </div>
        </div>

        <TextInput
          label="Total Time (minutes)"
          registration={register("total_time", {
            valueAsNumber: true,
            required: true,
          })}
          error={errors.total_time}
          type="number"
          placeholder="Ex. 120"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="w-full flex justify-end gap-4 mt-12">
        <button
          type="button"
          onClick={() => handleNext("draft")}
          className="px-10 py-2 text-[#4E73F8] font-semibold bg-sky-50 rounded-md transition-all"
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={() => handleNext("live")}
          className="px-10 py-2 bg-[#4E73F8] text-white font-semibold rounded-md hover:bg-[#3B62E3] transition-all"
        >
          Next: Add Questions
        </button>
      </div>
    </div>
  );
}
