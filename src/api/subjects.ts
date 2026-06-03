import api from "./axios";
import type { ApiResponse, Subject, SubTopic, Topic } from "../types";

export const getSubjects = async () => {
  const res = await api.get<ApiResponse<Subject[]>>("/subjects");
  return res.data;
};

export const getTopicsBySubject = async (subjectId: string) => {
  const res = await api.get<ApiResponse<Topic[]>>(
    `/topics/subject/${subjectId}`,
  );
  return res.data;
};

export const getSubTopicsByTopics = async (topicIds: string[]) => {
  const res = await api.post<ApiResponse<SubTopic[]>>(
    "/sub-topics/multi-topics",
    { topicIds },
  );
  return res.data;
};
