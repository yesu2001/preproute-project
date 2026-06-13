import Header from "./Header";
import CreateTestForm from "./CreateTestForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { createTest } from "../../api/tests";

export default function CreateTest() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingSubTopics, setLoadingSubTopics] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    watch,
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
        setSubTopics([]);
        setValue("topics", []);
        setValue("sub_topics", []);
      } catch (error) {
        console.error("Failed to fetch topics", error);
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, [formData.subject, setValue]);

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
        setValue("sub_topics", []);
      } catch (error) {
        console.error("Failed to fetch sub-topics", error);
      } finally {
        setLoadingSubTopics(false);
      }
    };
    fetchSubTopics();
  }, [formData.topics, setValue]);

  const handleCreateTest = (status: TestStatus) => {
    console.log("Create test payload:", formData);
    const tempId = Date.now();
    createTest({ ...formData, status });
    navigate(`/test/${tempId}/questions`);
  };

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
        errors={errors}
        formData={formData}
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
