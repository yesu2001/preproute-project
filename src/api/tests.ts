import api from "./axios";
import { USE_MOCK } from "./axios";
import { mockTests } from "./mock";
import type { ApiResponse, Test } from "../types";
import {
  getStoredTests,
  saveTest,
  deleteTest,
  getTestById as getTestByIdFromStorage,
} from "../utils/storage";

let localTests = [...mockTests];

export const getAllTests = async () => {
  if (USE_MOCK) return { success: true, data: getStoredTests() };
  const res = await api.get<ApiResponse<Test[]>>("/tests");
  return res.data;
};

export const getTestById = async (id: string) => {
  if (USE_MOCK) {
    const test = getTestByIdFromStorage(id);
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
      status: "draft",
    } as Test;
    saveTest(newTest);
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
    const existing = getTestByIdFromStorage(id);
    if (!existing) throw new Error("Test not found");
    const updated = { ...existing, ...data };
    saveTest(updated);
    return { success: true, data: updated };
  }
  const res = await api.put<ApiResponse<Test>>(`/tests/${id}`, data);
  return res.data;
};

export const removeTest = async (id: string) => {
  if (USE_MOCK) {
    deleteTest(id);
    return { success: true };
  }
  const res = await api.delete(`/tests/${id}`);
  return res.data;
};
