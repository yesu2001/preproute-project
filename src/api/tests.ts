import api from "./axios";
import type { ApiResponse, Test } from "../types";

export const getAllTests = async () => {
  const res = await api.get<ApiResponse<Test[]>>("/tests");
  return res.data;
};

export const getTestById = async (id: string) => {
  const res = await api.get<ApiResponse<Test>>(`/tests/${id}`);
  return res.data;
};

export const createTest = async (data: Partial<Test>) => {
  const res = await api.post<ApiResponse<Test>>("/tests", data);
  return res.data;
};

export const updateTest = async (id: string, data: Partial<Test>) => {
  const res = await api.put<ApiResponse<Test>>(`/tests/${id}`, data);
  return res.data;
};

export const removeTest = async (id: string) => {
  const res = await api.delete(`/tests/${id}`);
  return res.data;
};
