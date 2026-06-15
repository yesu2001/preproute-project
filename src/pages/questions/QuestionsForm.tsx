import { useEffect, useState } from "react";
import TextArea from "../../components/ui/TextArea";
import SelectInput from "../../components/ui/SelectInput";
import TextInput from "../../components/ui/TextInput";
import MediaUpload from "../../components/ui/MediaUpload";
import { useForm } from "react-hook-form";
import type {
  Question,
  Test,
  Topic as TopicType,
  SubTopic as SubTopicType,
  Subject,
} from "../../types";
import {
  getSubjects,
  getTopicsBySubject,
  getSubTopicsByTopics,
} from "../../api/subjects";
import OptionInput from "../../components/ui/OptionInput";

interface QuestionFormValues {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: "option1" | "option2" | "option3" | "option4";
  explanation: string;
  difficulty: string;
  topic: string;
  sub_topic: string;
  media_url: string;
}

interface QuestionFormProps {
  test: Test;
  editingQuestion: Question | null;
  questionNumber: number;
  onSubmit: (question: Question) => void;
  saving: boolean;
  error: string | null;
  onBack: () => void;
}

const OPTION_KEYS = ["option1", "option2", "option3", "option4"] as const;

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export default function QuestionsForm({
  test,
  editingQuestion,
  questionNumber,
  onSubmit,
  saving,
  error,
  onBack,
}: QuestionFormProps) {
  const [topicOptions, setTopicOptions] = useState<
    { value: string; label: string }[]
  >(test.topics?.map((t) => ({ value: t, label: t })) ?? []);
  const [subTopicOptions, setSubTopicOptions] = useState<
    { value: string; label: string }[]
  >(test.sub_topics?.map((t) => ({ value: t, label: t })) ?? []);

  const resolveTopicOptions = async () => {
    try {
      // Resolve subject id if subject is a name
      const subjectsRes = await getSubjects();
      const subjects: Subject[] = subjectsRes.data || [];
      const subj = subjects.find(
        (s) => s.id === test.subject || s.name === test.subject,
      );
      const subjId = subj?.id || test.subject;

      const topicsRes = await getTopicsBySubject(subjId as string);
      const topics: TopicType[] = topicsRes.data || [];

      // Build options: prefer names for labels
      const options = topics.map((t) => ({ value: t.id, label: t.name }));
      setTopicOptions(options);

      // If test.sub_topics exist and test.topics are ids or names, attempt to resolve subtopics
      const topicIds = (test.topics || []).map(
        (t) => topics.find((x) => x.id === t || x.name === t)?.id || t,
      );
      if (topicIds.length > 0) {
        const subRes = await getSubTopicsByTopics(topicIds as string[]);
        const subList: SubTopicType[] = subRes.data || [];
        setSubTopicOptions(
          subList.map((s) => ({ value: s.id, label: s.name })),
        );
      }
    } catch (err) {
      // fallback to existing names
      setTopicOptions(test.topics?.map((t) => ({ value: t, label: t })) ?? []);
      setSubTopicOptions(
        test.sub_topics?.map((t) => ({ value: t, label: t })) ?? [],
      );
    }
  };

  useEffect(() => {
    resolveTopicOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuestionFormValues>({
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

  const processSubmit = (data: QuestionFormValues) => {
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
      subject: test.subject,
      test_id: test.id ?? "",
    };
    onSubmit(question);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-6 p-4">
      <div className="space-y-6 relative p-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-4">
          <h3 className="text-base font-semibold text-slate-800">
            Question {questionNumber}
            <span className="text-slate-400">
              /{test?.total_questions || 0}
            </span>
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
          <label className="text-sm font-semibold text-slate-700">
            Options
          </label>
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

        <TextInput
          label="Correct Option"
          registration={register("correct_option", { required: true })}
          error={errors.correct_option}
          placeholder="option3"
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
              label="Level of difficulty"
              registration={register("difficulty")}
              options={difficultyOptions}
              error={errors.difficulty}
              placeholder="select from drop-down"
            />
            <SelectInput
              label="Topic"
              options={topicOptions}
              registration={register("topic")}
              error={errors.topic}
              placeholder="select from drop-down"
            />
            <SelectInput
              label="Sub-Topic"
              options={subTopicOptions}
              registration={register("sub_topic")}
              error={errors.sub_topic}
              placeholder="select from drop-down"
            />

            <MediaUpload
              label="Media"
              value={watch("media_url")}
              onChange={(url) => setValue("media_url", url ?? "")}
            />
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 p-4 space-y-3">
        {error && (
          <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-lg transition-all cursor-pointer"
          >
            {saving ? "Adding..." : "Add Question"}
          </button>
        </div>
      </div>
    </form>
  );
}
