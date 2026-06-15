import Header from "./Header";
import CreateTestForm from "./CreateTestForm";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  getSubjects,
  getTopicsBySubject,
  getSubTopicsByTopics,
} from "../../api/subjects";
import type {
  Subject,
  Topic,
  SubTopic,
  TestStatus,
  TestType,
  TestDifficulty,
} from "../../types";
import { createTest, getTestById, updateTest } from "../../api/tests";
import { useTestStore } from "../../store/testStore";
import { Loader2 } from "lucide-react";

export default function CreateTest() {
  const navigate = useNavigate();
  const { id: testId } = useParams<{ id: string }>();
  const isEditMode = Boolean(testId);
  const { setCurrentTest } = useTestStore();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingSubTopics, setLoadingSubTopics] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingTest, setLoadingTest] = useState(isEditMode);
  const [editTestData, setEditTestData] = useState<null | {
    subject: string;
    topics: string[];
    sub_topics: string[];
  }>(null);
  const initializedRef = useRef(false);

  const getSelectedIds = <T extends { id: string; name: string }>(
    items: T[],
    values: string[] | undefined,
  ) => {
    if (!values || values.length === 0) return [];
    return items
      .filter((item) => values.includes(item.id) || values.includes(item.name))
      .map((item) => item.id);
  };

  const {
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{
    name: string;
    type: TestType;
    subject: string;
    topics: string[];
    sub_topics: string[];
    difficulty: TestDifficulty;
    correct_marks: number;
    wrong_marks: number;
    unattempt_marks: number;
    total_time: number;
    total_marks: number;
    total_questions: number;
    status?: TestStatus | null;
  }>({
    defaultValues: {
      name: "",
      type: "chapterwise",
      subject: "",
      topics: [],
      sub_topics: [],
      difficulty: "medium",
      correct_marks: 1,
      wrong_marks: 0,
      unattempt_marks: 0,
      total_time: 60,
      total_marks: 0,
      total_questions: 0,
    },
  });

  const formData = watch();

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setError(null);
        const res = await getSubjects();
        setSubjects(res.data || []);
      } catch (err: any) {
        const errorMsg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch subjects";
        console.error("Failed to fetch subjects", err);
        setError(errorMsg);
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, []);

  // Load existing test data once subjects are available
  useEffect(() => {
    if (
      !isEditMode ||
      !testId ||
      subjects.length === 0 ||
      initializedRef.current
    )
      return;

    const loadTest = async () => {
      try {
        setLoadingTest(true);
        const test = await getTestById(testId);
        if (!test?.data) return;

        const stored = test.data;
        const subjectMatch = subjects.find(
          (subject) =>
            subject.id === stored.subject || subject.name === stored.subject,
        );
        const subjectId = subjectMatch?.id || stored.subject || "";

        reset({
          name: stored.name,
          type: stored.type as TestType,
          subject: subjectId,
          topics: [],
          sub_topics: [],
          difficulty: stored.difficulty as TestDifficulty,
          correct_marks: stored.correct_marks,
          wrong_marks: stored.wrong_marks,
          unattempt_marks: stored.unattempt_marks,
          total_time: stored.total_time,
          total_marks: stored.total_marks,
          total_questions: stored.total_questions,
        });

        setEditTestData({
          subject: stored.subject,
          topics: stored.topics || [],
          sub_topics: stored.sub_topics || [],
        });
      } catch (err) {
        console.error("Failed to load test for edit mode", err);
        setError("Failed to load test data for editing.");
      } finally {
        setLoadingTest(false);
      }
    };

    loadTest();
  }, [isEditMode, testId, subjects, reset]);

  // Fetch topics when subject changes
  useEffect(() => {
    if (!formData.subject) {
      setTopics([]);
      setSubTopics([]);
      setValue("topics", []);
      setValue("sub_topics", []);
      return;
    }

    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        const res = await getTopicsBySubject(formData.subject);
        setTopics(res.data || []);

        if (editTestData && !initializedRef.current) {
          const selectedTopicIds = getSelectedIds(
            res.data || [],
            editTestData.topics,
          );
          setValue("topics", selectedTopicIds);
        } else {
          setValue("topics", []);
          setValue("sub_topics", []);
        }
      } catch (error) {
        console.error("Failed to fetch topics", error);
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, [formData.subject, editTestData, setValue]);

  // Fetch sub-topics when topics change
  useEffect(() => {
    if (!formData.topics || formData.topics.length === 0) {
      setSubTopics([]);
      setValue("sub_topics", []);
      return;
    }

    const fetchSubTopics = async () => {
      setLoadingSubTopics(true);
      try {
        const res = await getSubTopicsByTopics(formData.topics);
        setSubTopics(res.data || []);

        if (editTestData && !initializedRef.current) {
          const selectedSubTopicIds = getSelectedIds(
            res.data || [],
            editTestData.sub_topics,
          );
          setValue("sub_topics", selectedSubTopicIds);
          initializedRef.current = true;
        } else {
          setValue("sub_topics", []);
        }
      } catch (error) {
        console.error("Failed to fetch sub-topics", error);
      } finally {
        setLoadingSubTopics(false);
      }
    };
    fetchSubTopics();
  }, [formData.topics, editTestData, setValue]);

  const handleCreateTest = async (status: TestStatus) => {
    try {
      if (isEditMode && testId) {
        // Edit mode — update existing test
        const res = await updateTest(testId, { ...formData, status });
        setCurrentTest(res.data);
        navigate(`/test/${testId}/questions`);
      } else {
        // Create mode — create new test
        const res = await createTest({ ...formData, status });
        const newTestId = res?.data?.id;
        if (!newTestId) {
          setError("Failed to get test ID. Please try again.");
          return;
        }
        setCurrentTest(res.data);
        navigate(`/test/${newTestId}/questions`);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to save test. Please try again.",
      );
    }
  };

  if (loadingSubjects || loadingTest) {
    return (
      <div className="flex flex-col min-h-screen p-2 md:p-6 space-y-8 animate-pulse">
        <Header />
        <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 bg-white rounded-2xl h-[450px] p-8 max-w-5xl mx-auto w-full shadow-sm text-center">
          <div className="p-4 bg-blue-50/50 rounded-full text-blue-600 mb-3 animate-spin">
            <Loader2 size={32} strokeWidth={2.5} />
          </div>
          <h3 className="text-sm font-bold text-slate-700 tracking-tight">
            Assembling Assessment Parameters...
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Retrieving saved question data metrics, target topic frameworks, and
            scoring vectors.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col min-h-screen space-y-8 p-2 md:p-6">
      <Header />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Error loading data</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <CreateTestForm
        register={register}
        setValue={setValue}
        errors={errors}
        formData={formData}
        isEditMode={isEditMode}
        handleNext={handleCreateTest}
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
