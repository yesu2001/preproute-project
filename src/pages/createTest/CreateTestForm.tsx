import React from "react";
import SelectInput from "../../components/ui/SelectInput";
import { useForm } from "react-hook-form";
import TextInput from "../../components/ui/TextInput";
import RadioInput from "../../components/ui/RadioInput";
import Counter from "../../components/ui/Counter";

export default function CreateTestForm() {
  const subjectsList = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
  ];
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

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        <SelectInput
          label="Subject"
          registration={register("subject", { required: true })}
          options={subjectsList}
          error={errors.subject}
          required={true}
          placeholder="Subject"
        />
        <TextInput
          label="Test Name"
          registration={register("testName", { required: true })}
          error={errors.testName}
          required={true}
          placeholder="Enter test name"
        />
        <SelectInput
          label="Topic"
          registration={register("topic", { required: true })}
          options={subjectsList}
          error={errors.topic}
          required={true}
          placeholder="Topic"
        />
        <SelectInput
          label="Sub Topic"
          registration={register("subTopic", { required: true })}
          options={subjectsList}
          error={errors.subTopic}
          required={true}
          placeholder="Sub Topic"
        />
        <TextInput
          label="Duration (Minutes)"
          registration={register("duration", { required: true })}
          error={errors.duration}
          required={true}
          placeholder="Enter the Time"
        />
        <RadioInput
          label="Test Difficulty Level"
          registration={register("difficulty", { required: true })}
          options={[
            { value: "easy", label: "Easy" },
            { value: "medium", label: "Medium" },
            { value: "hard", label: "Hard" },
          ]}
          selected=""
        />

        <div className="col-span-2 mt-4">
          <h6 className="text-sm font-semibold text-slate-700 mb-6">
            Marking Scheme:
          </h6>
          <div className="grid grid-cols-[180px_180px_180px_1fr_1fr] gap-8">
            {/* Wrong Answer */}
            <Counter
              label="Wrong Answer"
              value={formData.wrongAnswerMark || 0}
              onChange={(value) => adjustMarking("wrongAnswerMark", value)}
            />
            <Counter
              label="Unattempted"
              value={formData.unattempted || 0}
              onChange={(value) => adjustMarking("unattempted", value)}
            />
            <Counter
              label="Correct Answer"
              value={formData.correctAnswer || 0}
              onChange={(value) => adjustMarking("correctAnswer", value)}
            />

            <TextInput
              label="No of Questions"
              registration={register("totalQuestions", { required: true })}
              error={errors.totalQuestions}
              required={true}
              placeholder="Ex. 20"
            />

            <TextInput
              label=" Total Marks"
              registration={register("totalMarks", { required: true })}
              error={errors.totalMarks}
              required={true}
              placeholder="Ex. 250 Marks"
            />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="w-full flex justify-end gap-4 mt-12">
        <button
          // onClick={onCancel}
          className="px-10 py-2 text-[#4E73F8] font-semibold bg-sky-50 rounded-md transition-all"
        >
          Cancel
        </button>
        <button
          // onClick={() => onNext(formData)}
          className="px-10 py-2 bg-[#4E73F8] text-white font-semibold rounded-md hover:bg-[#3B62E3] transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
}
