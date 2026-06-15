import api from "./axios";
import { USE_MOCK } from "./axios";
import { getStoredQuestions, saveQuestions } from "../utils/storage";
import type { ApiResponse, Question } from "../types";

export const bulkCreateQuestions = async (questions: Question[]) => {
  if (USE_MOCK) {
    if (questions.length === 0) return { success: true, data: [] };
    const testId = questions[0].test_id;
    const existing = getStoredQuestions(testId);
    const created = questions.map((q, i) => ({
      ...q,
      id: `q-${Date.now()}-${i}`,
    }));
    saveQuestions(testId, [...existing, ...created]);
    return {
      success: true,
      data: created,
      message: `Successfully created ${created.length} questions`,
    };
  }

  const sanitized = questions.map(({ topic, sub_topic, ...rest }) => rest);

  const res = await api.post<ApiResponse<Question[]>>("/questions/bulk", {
    questions: sanitized,
  });

  // const res = await api.post<ApiResponse<Question[]>>("/questions/bulk", {
  //   questions,
  // });
  return res.data;
};

export const fetchBulkQuestions = async (question_ids: string[]) => {
  if (USE_MOCK) {
    // Search across all stored questions
    const allKeys = Object.keys(localStorage).filter((k) =>
      k.startsWith("preproute_questions_"),
    );
    const allQuestions: Question[] = allKeys.flatMap((key) => {
      try {
        return JSON.parse(localStorage.getItem(key) || "[]");
      } catch {
        return [];
      }
    });
    return {
      success: true,
      data: allQuestions.filter((q) => question_ids.includes(q.id!)),
    };
  }
  const res = await api.post<ApiResponse<Question[]>>("/questions/fetchBulk", {
    question_ids,
  });
  return res.data;
};
