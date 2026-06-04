import api, { USE_MOCK } from "./axios";
import type { ApiResponse, AuthResponse } from "../types";
import { mockToken, mockUser } from "./mock";

export const loginApi = async (userId: string, password: string) => {
  if (USE_MOCK) {
    if (userId === "vedant-admin" && password === "vedant123") {
      return { success: true, data: { token: mockToken, user: mockUser } };
    }
    throw { response: { data: { message: "Invalid credentials" } } };
  }
  const response = await api.post<ApiResponse<AuthResponse["data"]>>(
    "/auth/login",
    { userId, password },
  );
  return response.data;
};
