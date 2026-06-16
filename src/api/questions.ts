import api from "./axios";
import type { ApiResponse, Question } from "../types";

export const bulkCreateQuestions = async (questions: Question[]) => {
  const sanitized = questions.map(({ topic, sub_topic, ...rest }) => rest);

  const res = await api.post<ApiResponse<Question[]>>("/questions/bulk", {
    questions: sanitized,
  });

  return res.data;
};

export const fetchBulkQuestions = async (question_ids: string[]) => {
  const res = await api.post<ApiResponse<Question[]>>("/questions/fetchBulk", {
    question_ids,
  });
  return res.data;
};
