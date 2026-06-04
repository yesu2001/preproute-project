import api from "./axios";
import { USE_MOCK } from "./axios";
import { mockQuestions } from "./mock";
import type { ApiResponse, Question } from "../types";

let localQuestions = [...mockQuestions];

export const bulkCreateQuestions = async (questions: Question[]) => {
  if (USE_MOCK) {
    const created = questions.map((q, i) => ({
      ...q,
      id: `q-${Date.now()}-${i}`,
    }));
    localQuestions.push(...created);
    return {
      success: true,
      data: created,
      message: `Successfully created ${created.length} questions`,
    };
  }
  const res = await api.post<ApiResponse<Question[]>>("/questions/bulk", {
    questions,
  });
  return res.data;
};

export const fetchBulkQuestions = async (question_ids: string[]) => {
  if (USE_MOCK) {
    const found = localQuestions.filter((q) => question_ids.includes(q.id!));
    return { success: true, data: found };
  }
  const res = await api.post<ApiResponse<Question[]>>("/questions/fetchBulk", {
    question_ids,
  });
  return res.data;
};
