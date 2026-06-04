import api from "./axios";
import { USE_MOCK } from "./axios";
import { mockSubjects, mockTopics, mockSubTopics } from "./mock";
import type { ApiResponse, Subject, SubTopic, Topic } from "../types";

export const getSubjects = async () => {
  if (USE_MOCK) return { success: true, data: mockSubjects };
  const res = await api.get<ApiResponse<Subject[]>>("/subjects");
  return res.data;
};

export const getTopicsBySubject = async (subjectId: string) => {
  if (USE_MOCK) return { success: true, data: mockTopics[subjectId] || [] };
  const res = await api.get<ApiResponse<Topic[]>>(
    `/topics/subject/${subjectId}`,
  );
  return res.data;
};

export const getSubTopicsByTopics = async (topicIds: string[]) => {
  if (USE_MOCK) {
    const all = topicIds.flatMap((id) => mockSubTopics[id] || []);
    return { success: true, data: all };
  }
  const res = await api.post<ApiResponse<SubTopic[]>>(
    "/sub-topics/multi-topics",
    { topicIds },
  );
  return res.data;
};
