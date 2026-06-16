import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTestStore } from "../../store/testStore";
import { useQuestionStore } from "../../store/questionStore";
import { getTestById, getStoredQuestions } from "../../utils/storage";
import { updateTest } from "../../api/tests";
import { fetchBulkQuestions } from "../../api/questions";

export const usePreview = () => {
  const { id: testId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentTest, setCurrentTest } = useTestStore();
  const { questions, setQuestions } = useQuestionStore();
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  useEffect(() => {
    if (!testId) return;
    loadData();
  }, [testId]);

  const loadData = async () => {
    setLoadingQuestions(true);
    try {
      const test = getTestById(testId!);
      const questionIds = test?.questions ?? [];
      if (questionIds.length > 0) {
        const res = await fetchBulkQuestions(questionIds);
        setQuestions(res.data);
      } else {
        // Fall back to localStorage (questions saved during this session)
        const stored = getStoredQuestions(testId!);
        setQuestions(stored);
      }
    } catch {
      const stored = getStoredQuestions(testId!);
      setQuestions(stored);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handlePublish = async () => {
    if (!testId) return;
    setPublishing(true);
    setError(null);
    try {
      await updateTest(testId, { status: "live" });
      setCurrentTest({ ...currentTest!, status: "live" });
      setPublished(true);
    } catch {
      setError("Failed to publish test. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const handleRedirectToDashboard = () => {
    setPublished(false);
    navigate("/dashboard");
  };

  return {
    testId,
    currentTest,
    questions,
    publishing,
    published,
    loadingQuestions,
    error,
    setPublished,
    handlePublish,
    handleRedirectToDashboard,
  };
};
