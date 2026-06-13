import { Bold, Image, Italic, Link2, Underline } from "lucide-react";
import React, { useEffect } from "react";
import TextArea from "../../components/ui/TextArea";
import SelectInput from "../../components/ui/SelectInput";
import TextInput from "../../components/ui/TextInput";
import { useForm } from "react-hook-form";
import type { Question } from "../../types";
import OptionInput from "../../components/ui/OptionInput";

interface QuestionFormValues {
  question: string;
  correct_option: "option1" | "option2" | "option3" | "option4";
  explanation: string;
  difficulty: string;
  topic: string;
  sub_topic: string;
  media_url: string;
}

interface QuestionFormProps {
  testId: string;
  editingQuestion: Question | null;
  editingIndex: number | null;
  questionNumber: number;
  onSubmit: (question: Question) => void;
  onCancelEdit: () => void;
}

const OPTION_KEYS = ["option1", "option2", "option3", "option4"] as const;

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "difficult", label: "Difficult" },
];

export default function QuestionsForm({
  testId,
  editingQuestion,
  editingIndex,
  questionNumber,
  onSubmit,
  onCancelEdit,
}: QuestionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<
    QuestionFormValues & {
      option1: string;
      option2: string;
      option3: string;
      option4: string;
    }
  >({
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct_option: undefined,
      explanation: "",
      difficulty: "medium",
      topic: "",
      sub_topic: "",
      media_url: "",
    },
  });

  const correctOption = watch("correct_option");
  const optionValues = OPTION_KEYS.map((key) => watch(key));

  // Populate form when editing
  useEffect(() => {
    if (editingQuestion) {
      reset({
        question: editingQuestion.question,
        option1: editingQuestion.option1,
        option2: editingQuestion.option2,
        option3: editingQuestion.option3,
        option4: editingQuestion.option4,
        correct_option: editingQuestion.correct_option,
        explanation: editingQuestion.explanation ?? "",
        difficulty: editingQuestion.difficulty ?? "medium",
        topic: editingQuestion.topic ?? "",
        sub_topic: editingQuestion.sub_topic ?? "",
        media_url: editingQuestion.media_url ?? "",
      });
    } else {
      reset();
    }
  }, [editingQuestion, reset]);

  const processSubmit = (data: any) => {
    const question: Question = {
      type: "mcq",
      question: data.question,
      option1: data.option1,
      option2: data.option2,
      option3: data.option3,
      option4: data.option4,
      correct_option: data.correct_option,
      explanation: data.explanation,
      difficulty: data.difficulty,
      topic: data.topic,
      sub_topic: data.sub_topic,
      media_url: data.media_url,
      test_id: testId,
    };
    onSubmit(question);
    reset();
  };

  return (
    <div className="space-y-6 relative p-4">
      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
        <h3 className="text-base font-semibold text-slate-800">
          Question 4<span className="text-slate-400">/50</span>
        </h3>
        <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-md font-semibold">
          MCQ Format
        </span>
      </div>

      {/* FIELD 1: QUESTION TEXT */}
      <TextArea
        label="Question Text"
        registration={register("question", { required: true })}
        error={errors.question}
        placeholder="Enter question here"
      />

      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">Options</label>
        <div className="space-y-3 mt-3">
          {OPTION_KEYS.map((key, idx) => (
            <OptionInput
              key={key}
              index={idx}
              value={optionValues[idx] || ""}
              isCorrect={correctOption === key}
              onSelect={() => setValue("correct_option", key)}
              onChange={(val) => setValue(key, val)}
              error={
                !optionValues[idx] && errors[key]
                  ? `Option ${idx + 1} is required`
                  : undefined
              }
            />
          ))}
        </div>
        {errors.correct_option && (
          <p className="text-xs text-rose-500">
            Please select the correct option
          </p>
        )}
        {/* Hidden field to validate correct_option */}
        <input
          type="hidden"
          {...register("correct_option", {
            required: "Please select the correct option",
          })}
        />
      </div>
      {/* FIELD 2: 4 OPTIONS GRID CONTEXT */}
      {/* <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700 block">
          Type the options below<span className="text-rose-500">*</span>
        </label>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-1 px-3 rounded-lg border border-slate-100 focus-within:border-blue-300 focus-within:bg-white transition-all"
            >
              <button
                type="button"
                onClick={() =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    correctOption: idx,
                  })
                }
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  currentQuestion.correctOption === idx
                    ? "border-blue-500 bg-blue-500"
                    : "border-slate-300 bg-white"
                }`}
              >
                {currentQuestion.correctOption === idx && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </button>

              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="w-full bg-transparent p-2 text-sm text-slate-700 outline-none"
              />
            </div>
          ))}
        </div>
      </div> */}

      <TextInput
        label="Correct Option"
        registration={register("correct_option", { required: true })}
        error={errors.correct_option}
        placeholder="Enter correct option here"
      />

      <TextArea
        label="Explanation"
        registration={register("explanation", { required: true })}
        error={errors.explanation}
        placeholder="Enter explanation here"
      />

      {/* OPTIONAL FIELDS GRID PANEL CONTAINER */}
      <div className="border-t border-slate-50 pt-6 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Question Settings
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {/* Topic Select Input */}
          <SelectInput
            label="Level of difficuty"
            registration={register("difficulty")}
            options={[
              { value: "Easy", label: "Easy" },
              { value: "Medium", label: "Medium" },
              { value: "Hard", label: "Hard" },
            ]}
            error={errors.difficulty}
            placeholder="select from drop-down"
          />
          <SelectInput
            label="Topic"
            options={[
              { value: "Algebra", label: "Algebra" },
              { value: "Geometry", label: "Geometry" },
            ]}
            registration={register("topic")}
            error={errors.topic}
            placeholder="select from drop-down"
          />
          <SelectInput
            label="Sub-Topic"
            options={[
              { value: "Application", label: "Application" },
              { value: "Syntax structure", label: "Syntax structure" },
            ]}
            registration={register("sub_topic")}
            error={errors.sub_topic}
            placeholder="select from drop-down"
          />

          <TextInput
            label="Media URL"
            registration={register("media_url")}
            error={errors.media_url}
            placeholder="Enter media URL here"
          />
        </div>
      </div>
    </div>
  );
}
