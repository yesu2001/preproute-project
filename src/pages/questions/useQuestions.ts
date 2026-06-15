import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bulkCreateQuestions } from "../../api/questions";
import { getStoredQuestions, saveQuestions } from "../../utils/storage";
import { useQuestionStore } from "../../store/questionStore";
import { useTestStore } from "../../store/testStore";
import type { Question } from "../../types";

export const useQuestions = () => {
  const { id: testId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { questions, setQuestions, addQuestion, removeQuestion } =
    useQuestionStore();
  const { currentTest } = useTestStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load questions for this test from localStorage on mount
  const loadQuestions = () => {
    if (!testId) return;
    const stored = getStoredQuestions(testId);
    setQuestions(stored);
  };

  const handleAddQuestion = (question: Question) => {
    if (editingIndex !== null) {
      const updated = questions.map((q, i) =>
        i === editingIndex ? question : q,
      );
      setQuestions(updated);
      setEditingIndex(null);
    } else {
      addQuestion(question);
    }
  };

  const handleEditQuestion = (index: number) => {
    setEditingIndex(index);
  };

  const handleDeleteQuestion = (index: number) => {
    removeQuestion(index);
    if (editingIndex === index) setEditingIndex(null);
  };

  const handleSaveAndContinue = async () => {
    if (!testId) return;
    if (questions.length === 0) {
      setError("Add at least 1 question before continuing.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const questionsWithTestId = questions.map((q) => ({
        ...q,
        test_id: testId,
        subject: q.subject || currentTest?.subject || "",
      }));
      await bulkCreateQuestions(questionsWithTestId);
      saveQuestions(testId, questionsWithTestId);
      navigate(`/test/${testId}/preview`);
    } catch {
      setError("Failed to save questions. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return {
    testId,
    questions,
    editingIndex,
    saving,
    error,
    loadQuestions,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveAndContinue,
    setError,
  };
};
