import api from "./axios";
import { USE_MOCK } from "./axios";
import { mockTests } from "./mock";
import type { ApiResponse, Test } from "../types";

let localTests = [...mockTests];

export const getAllTests = async () => {
  if (USE_MOCK) return { success: true, data: localTests };
  const res = await api.get<ApiResponse<Test[]>>("/tests");
  return res.data;
};

export const getTestById = async (id: string) => {
  if (USE_MOCK) {
    const test = localTests.find((t) => t.id === id);
    if (!test) throw new Error("Test not found");
    return { success: true, data: test };
  }
  const res = await api.get<ApiResponse<Test>>(`/tests/${id}`);
  return res.data;
};

export const createTest = async (data: Partial<Test>) => {
  if (USE_MOCK) {
    const newTest: Test = {
      ...data,
      id: `test-${Date.now()}`,
      created_at: new Date().toISOString(),
      questions: [],
    } as Test;
    localTests.push(newTest);
    return {
      success: true,
      data: newTest,
      message: "Test created successfully",
    };
  }
  const res = await api.post<ApiResponse<Test>>("/tests", data);
  return res.data;
};

export const updateTest = async (id: string, data: Partial<Test>) => {
  if (USE_MOCK) {
    localTests = localTests.map((t) => (t.id === id ? { ...t, ...data } : t));
    const updated = localTests.find((t) => t.id === id)!;
    return { success: true, data: updated };
  }
  const res = await api.put<ApiResponse<Test>>(`/tests/${id}`, data);
  return res.data;
};
