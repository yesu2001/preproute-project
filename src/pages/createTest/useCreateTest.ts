import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTestStore } from "../../store/testStore";
import {
  getSubjects,
  getTopicsBySubject,
  getSubTopicsByTopics,
} from "../../api/subjects";
import { createTest, updateTest, getTestById } from "../../api/tests";
import type {
  Subject,
  Topic,
  SubTopic,
  TestStatus,
  TestType,
  TestDifficulty,
} from "../../types";

export interface CreateTestFormValues {
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
}

export const useCreateTest = () => {
  const navigate = useNavigate();
  const { id: testId } = useParams<{ id: string }>();
  const isEditMode = Boolean(testId);
  const { setCurrentTest } = useTestStore();
  const initializedRef = useRef(false);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingSubTopics, setLoadingSubTopics] = useState(false);
  const [loadingTest, setLoadingTest] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  const [editTestData, setEditTestData] = useState<{
    subject: string;
    topics: string[];
    sub_topics: string[];
  } | null>(null);

  const {
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateTestFormValues>({
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

  // Helper — match IDs or names from API response
  const getSelectedIds = <T extends { id: string; name: string }>(
    items: T[],
    values: string[] | undefined,
  ) => {
    if (!values?.length) return [];
    return items
      .filter((item) => values.includes(item.id) || values.includes(item.name))
      .map((item) => item.id);
  };

  // 1. Fetch subjects on mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getSubjects();
        setSubjects(res.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch subjects");
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetch();
  }, []);

  // 2. Load test data for edit mode — runs once subjects are ready
  useEffect(() => {
    if (!isEditMode || !testId || !subjects.length || initializedRef.current)
      return;

    const load = async () => {
      try {
        setLoadingTest(true);
        const res = await getTestById(testId);
        if (!res?.data) return;

        const test = res.data;
        const subjectMatch = subjects.find(
          (s) => s.id === test.subject || s.name === test.subject,
        );

        reset({
          name: test.name,
          type: test.type as TestType,
          subject: subjectMatch?.id || test.subject || "",
          topics: [],
          sub_topics: [],
          difficulty: test.difficulty as TestDifficulty,
          correct_marks: test.correct_marks,
          wrong_marks: test.wrong_marks,
          unattempt_marks: test.unattempt_marks,
          total_time: test.total_time,
          total_marks: test.total_marks,
          total_questions: test.total_questions,
        });

        setEditTestData({
          subject: test.subject,
          topics: test.topics || [],
          sub_topics: test.sub_topics || [],
        });
      } catch {
        setError("Failed to load test data for editing.");
      } finally {
        setLoadingTest(false);
      }
    };
    load();
  }, [isEditMode, testId, subjects, reset]);

  // 3. Fetch topics when subject changes
  useEffect(() => {
    if (!formData.subject) {
      setTopics([]);
      setSubTopics([]);
      setValue("topics", []);
      setValue("sub_topics", []);
      return;
    }
    const fetch = async () => {
      setLoadingTopics(true);
      try {
        const res = await getTopicsBySubject(formData.subject);
        setTopics(res.data || []);
        if (editTestData && !initializedRef.current) {
          setValue(
            "topics",
            getSelectedIds(res.data || [], editTestData.topics),
          );
        } else {
          setValue("topics", []);
          setValue("sub_topics", []);
        }
      } catch {
        console.error("Failed to fetch topics");
      } finally {
        setLoadingTopics(false);
      }
    };
    fetch();
  }, [formData.subject, editTestData, setValue]);

  // 4. Fetch sub-topics when topics change
  useEffect(() => {
    if (!formData.topics?.length) {
      setSubTopics([]);
      setValue("sub_topics", []);
      return;
    }
    const fetch = async () => {
      setLoadingSubTopics(true);
      try {
        const res = await getSubTopicsByTopics(formData.topics);
        setSubTopics(res.data || []);
        if (editTestData && !initializedRef.current) {
          setValue(
            "sub_topics",
            getSelectedIds(res.data || [], editTestData.sub_topics),
          );
          initializedRef.current = true;
        } else {
          setValue("sub_topics", []);
        }
      } catch {
        console.error("Failed to fetch sub-topics");
      } finally {
        setLoadingSubTopics(false);
      }
    };
    fetch();
  }, [JSON.stringify(formData.topics), editTestData, setValue]);

  // 5. Submit handler — create or update
  const handleSubmit = async (status: TestStatus) => {
    try {
      if (isEditMode && testId) {
        const res = await updateTest(testId, { ...formData, status });
        setCurrentTest(res.data);
        navigate(`/test/${testId}/questions`);
      } else {
        const res = await createTest({ ...formData, status });
        const newId = res?.data?.id;
        if (!newId) {
          setError("Failed to get test ID.");
          return;
        }
        setCurrentTest(res.data);
        navigate(`/test/${newId}/questions`);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save test.");
    }
  };

  return {
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
  };
};
