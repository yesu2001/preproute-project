import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTestStore } from "../../store/testStore";
import { useQuestionStore } from "../../store/questionStore";
import { getTestById, getStoredQuestions } from "../../utils/storage";
import { updateTest } from "../../api/tests";

export const usePreview = () => {
  const { id: testId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentTest, setCurrentTest } = useTestStore();
  const { questions, setQuestions } = useQuestionStore();
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!testId) return;

    // Load test from store or localStorage
    if (!currentTest || currentTest.id !== testId) {
      const test = getTestById(testId);
      if (!test) {
        navigate("/dashboard");
        return;
      }
      setCurrentTest(test);
    }

    // Load questions for this test
    const stored = getStoredQuestions(testId);
    setQuestions(stored);
  }, [testId]);

  const handlePublish = async (scheduleData?: {
    publishType: "now" | "scheduled";
    endDate?: string;
    endTime?: string;
    liveUntil?: string;
  }) => {
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

  return {
    testId,
    currentTest,
    questions,
    publishing,
    published,
    error,
    setPublished,
    handlePublish,
  };
};
